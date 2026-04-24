<script setup lang="ts">
import type {
    NomineeUpdateInput,
    NomineesWithUser,
} from "~/shared/types";
import { authClient } from "~/shared/auth-client";

// Session check. The global auth middleware already gates this route, but read
// the session defensively so we don't render the edit form with no user.
const { data: session } = await authClient.useSession(useFetch);
if (!session.value?.user) {
    await navigateTo({ path: "/", query: { login: "true" } });
}

// Form state. IMPORTANT: `ref` (not `reactive`) so `form.value = {...}` works
// when a nominee is selected and `body: form.value` serializes correctly on PUT.
const emptyForm = (): NomineeUpdateInput => ({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    placeOfWork: "",
    occupation: "",
    email: "",
    description: "",
    photoURL: "",
});
const form = ref<NomineeUpdateInput>(emptyForm());

// Photo-upload file state. The upload pipeline itself is user-owned; this just
// tracks the selected file for display next to the input.
const selectedFile = ref<File | null>(null);
const selectedFileName = ref("");

// Search state. `/api/nominee/search` matches name / occupation / place-of-work
// (not email, despite what the original input was labeled). Multiple results
// are possible; the user picks one to populate the form.
const searchTerm = ref("");
const searchResults = ref<NomineesWithUser[]>([]);
const searchLoading = ref(false);
const searchError = ref("");
const selectedNomineeId = ref<string | null>(null);

async function runSearch() {
    const term = searchTerm.value.trim();
    if (!term) {
        searchResults.value = [];
        searchError.value = "";
        return;
    }
    searchLoading.value = true;
    searchError.value = "";
    try {
        const res = await $fetch(
            `/api/nominee/search?searchTerm=${encodeURIComponent(term)}`,
        );
        const items = Array.isArray(res) ? (res as NomineesWithUser[]) : [];
        searchResults.value = items;
        if (items.length === 0) {
            searchError.value = "No nominees matched that search.";
        } else if (items.length === 1) {
            selectNominee(items[0]);
        }
    } catch (e) {
        console.error("Error searching nominees:", e);
        searchError.value = "Search failed. Please try again.";
    } finally {
        searchLoading.value = false;
    }
}

function selectNominee(nominee: NomineesWithUser) {
    selectedNomineeId.value = nominee.id;
    form.value = {
        id: nominee.id,
        firstName: nominee.user?.firstName ?? "",
        lastName: nominee.user?.lastName ?? "",
        phoneNumber: nominee.phoneNumber ?? "",
        address: nominee.address ?? "",
        placeOfWork: nominee.placeOfWork ?? "",
        occupation: nominee.occupation ?? "",
        email: nominee.user?.email ?? "",
        description: nominee.description ?? "",
        photoURL: nominee.photoURL ?? "",
    };
}

// Save state. Replaces the two `alert()` calls with inline feedback.
const saving = ref(false);
const saveMessage = ref<{ type: "success" | "error"; text: string } | null>(null);

async function submitForm() {
    if (saving.value || !form.value.id) return;
    saving.value = true;
    saveMessage.value = null;
    try {
        await $fetch("/api/nominee", {
            method: "PUT",
            body: form.value,
        });
        saveMessage.value = {
            type: "success",
            text: "Nominee updated successfully.",
        };
    } catch (err) {
        console.error("Error updating nominee:", err);
        saveMessage.value = {
            type: "error",
            text: "Failed to update nominee. Please try again.",
        };
    } finally {
        saving.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen bg-black text-amber-300">
        <main class="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
            <!-- Title -->
            <p class="metallic-title metallic-title--main">NOBLE AWARD</p>
            <p class="metallic-title metallic-title--sub">
                UPDATE NOMINEE PROFILE
            </p>

            <!-- Card Container -->
            <div
                class="mt-8 rounded-2xl border border-zinc-800/70 bg-[#1a1a1a] backdrop-blur p-6 sm:p-8 md:p-10 shadow-xl"
            >
                <!-- Search Section -->
                <div class="mb-8">
                    <label
                        for="searchTerm"
                        class="block text-sm font-medium mb-2"
                        >Search nominees</label
                    >

                    <div class="flex gap-3">
                        <input
                            id="searchTerm"
                            v-model="searchTerm"
                            type="text"
                            @keyup.enter="runSearch"
                            class="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 p-3"
                            placeholder="Name, occupation, or workplace"
                        />

                        <button
                            type="button"
                            :disabled="searchLoading"
                            class="px-5 py-2 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            @click="runSearch"
                        >
                            {{ searchLoading ? "Searching..." : "Search" }}
                        </button>
                    </div>

                    <p v-if="searchError" class="mt-3 text-sm text-red-400">
                        {{ searchError }}
                    </p>

                    <!-- Results list: only shown when multiple matches. Single match auto-selects. -->
                    <ul
                        v-if="searchResults.length > 1"
                        class="mt-4 space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/60 p-2 max-h-64 overflow-y-auto"
                    >
                        <li
                            v-for="n in searchResults"
                            :key="n.id"
                            class="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-zinc-800"
                            :class="{ 'bg-zinc-800': selectedNomineeId === n.id }"
                            @click="selectNominee(n)"
                        >
                            <span class="text-amber-300 font-semibold">
                                {{ getFullName(n.user) || "(unnamed)" }}
                            </span>
                            <span class="text-amber-200/70">
                                &middot; {{ n.occupation || "—" }} &middot;
                                {{ n.placeOfWork || "—" }}
                            </span>
                        </li>
                    </ul>
                </div>

                <!-- Editable Form (hidden until a nominee is selected) -->
                <form
                    v-if="form.id"
                    @submit.prevent="submitForm"
                    class="space-y-5"
                >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="firstName" class="block text-sm mb-1"
                                >First Name</label
                            >
                            <input
                                id="firstName"
                                v-model="form.firstName"
                                type="text"
                                class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-3 text-amber-100"
                            />
                        </div>

                        <div>
                            <label for="lastName" class="block text-sm mb-1"
                                >Last Name</label
                            >
                            <input
                                id="lastName"
                                v-model="form.lastName"
                                type="text"
                                class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-3 text-amber-100"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="phoneNumber" class="block text-sm mb-1"
                                >Phone Number</label
                            >
                            <input
                                id="phoneNumber"
                                v-model="form.phoneNumber"
                                type="tel"
                                class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-3 text-amber-100"
                            />
                        </div>

                        <div>
                            <label for="email" class="block text-sm mb-1"
                                >Email</label
                            >
                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-3 text-amber-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="address" class="block text-sm mb-1"
                            >Address</label
                        >
                        <input
                            id="address"
                            v-model="form.address"
                            type="text"
                            class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-3 text-amber-100"
                        />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="placeOfWork" class="block text-sm mb-1"
                                >Place of Work</label
                            >
                            <input
                                id="placeOfWork"
                                v-model="form.placeOfWork"
                                type="text"
                                class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-3 text-amber-100"
                            />
                        </div>

                        <div>
                            <label for="occupation" class="block text-sm mb-1"
                                >Occupation</label
                            >
                            <input
                                id="occupation"
                                v-model="form.occupation"
                                type="text"
                                class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-3 text-amber-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="description" class="block text-sm mb-1"
                            >Description</label
                        >
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="5"
                            class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-3 text-amber-100 resize-y"
                        ></textarea>
                    </div>

                    <!-- Current Photo + Upload New -->
                    <div class="space-y-3">
                        <span class="block text-sm font-medium">Photo</span>

                        <div v-if="form.photoURL" class="flex items-center gap-4">
                            <img
                                :src="form.photoURL"
                                alt="Current nominee photo"
                                class="h-16 w-16 rounded-full object-cover border border-amber-400"
                            />
                            <span class="text-xs text-amber-200/80 break-all">
                                Current: {{ form.photoURL }}
                            </span>
                        </div>
                        <div v-else class="text-xs text-amber-200/70">
                            No photo on file yet.
                        </div>

                        <!-- File upload to replace photo -->
                        <div
                            class="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                        >
                            <input
                                id="photo"
                                ref="fileInput"
                                type="file"
                                accept="image/*"
                                class="sr-only"
                                @change="handlePhotoUpload"
                            />
                            <label
                                for="photo"
                                class="inline-flex items-center justify-center rounded-xl border border-amber-400 px-4 py-2 bg-zinc-800/70 text-amber-300 font-serif cursor-pointer transition hover:bg-amber-300 hover:text-zinc-900 hover:border-zinc-900"
                            >
                                Choose New Photo
                            </label>

                            <span class="text-sm text-amber-200/80 break-all">
                                {{ selectedFileName || "No new file chosen" }}
                            </span>
                        </div>

                        <!-- Optional: manual URL edit if you still want it -->
                        <div>
                            <label
                                for="photoURL"
                                class="block text-xs mb-1 text-amber-200/70"
                            >
                                Photo URL (optional override)
                            </label>
                            <input
                                id="photoURL"
                                v-model="form.photoURL"
                                type="url"
                                placeholder="/uploads/..."
                                class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-2 text-amber-100 text-xs"
                            />
                        </div>
                    </div>

                    <!-- Inline save feedback -->
                    <p
                        v-if="saveMessage"
                        class="mt-4 text-sm text-center"
                        :class="
                            saveMessage.type === 'success'
                                ? 'text-amber-300'
                                : 'text-red-400'
                        "
                    >
                        {{ saveMessage.text }}
                    </p>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        :disabled="saving"
                        class="w-full nomination-submit-btn mt-6"
                    >
                        {{ saving ? "Saving..." : "Save Changes" }}
                    </button>
                </form>

                <!-- Back button -->
                <nuxt-link to="/nominator/form">
                    <button
                        class="mt-6 w-full px-4 py-2 bg-zinc-800 text-amber-300 rounded-lg border border-zinc-700 hover:bg-zinc-700"
                    >
                        Back to Nomination Page
                    </button>
                </nuxt-link>
            </div>
        </main>
    </div>
</template>

<style scoped>
.metallic-title--main {
    margin-top: 2rem;
    font-size: 60px;
}

.metallic-title--sub {
    margin-top: 0.5rem;
    font-size: 28px;
}
</style>
