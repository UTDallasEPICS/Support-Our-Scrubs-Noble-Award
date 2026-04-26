<script setup lang="ts">
import type { NomineeCreateInput } from "~/shared/types";
import { authClient } from "~/shared/auth-client";
import { useLoginModal } from "~/composables/useLoginModal";

const { data: session } = await authClient.useSession(useFetch);
const { open: openLoginModal } = useLoginModal();
if (!session.value?.user) openLoginModal();

const emptyForm = (): NomineeCreateInput => ({
    firstName: "",
    lastName: "",
    nominatorFirstName: "",
    nominatorLastName: "",
    phoneNumber: "",
    address: "",
    placeOfWork: "",
    occupation: "",
    email: "",
    description: "",
});
const form = ref<NomineeCreateInput>(emptyForm());
// File upload state. Photo-upload wiring is user-owned; this just tracks the
// selected file so the filename can be rendered next to the input.
const selectedFile = ref<File | null>(null);
const selectedFileName = ref("");

function handlePhotoUpload(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (!target?.files || target.files.length === 0) return;
    const file = target.files[0];
    if (!file?.type.startsWith('image/')) {
        throw createError({ statusCode: 400, statusMessage: "File is not an image" });
    }
    selectedFile.value = file as File;
    selectedFileName.value = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
};


// Submission state + inline feedback (replaces the previous `alert()` calls).
const submitting = ref(false);
const submitMessage = ref<{ type: "success" | "error"; text: string } | null>(null);

function resetForm() {
    form.value = emptyForm();
    selectedFile.value = null;
    selectedFileName.value = "";
}

async function submitForm() {
    if (submitting.value) return;
    submitting.value = true;
    submitMessage.value = null;
    try {
        const { data } = await useFetch("/api/nominee", {
            method: "POST",
            body: form.value,
        });
        const { id: nomineeId } = data.value as { id: string };
        if (selectedFile.value) {
            const imagePayload = new FormData();
            imagePayload.append("file", selectedFile.value);
            await useFetch(`/api/nominee/${nomineeId}/upload`, {
                method: "POST",
                body: imagePayload,
            });
        }

        submitMessage.value = { type: "success", text: "Nomination submitted. Thank you!" };
        resetForm();
    } catch (err) {
        console.error("Error submitting nomination", err);
        submitMessage.value = {
            type: "error",
            text: "Something went wrong submitting the nomination. Please try again.",
        };
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen bg-black text-amber-300">
        <main class="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
            <!-- Titles -->
            <p ref="nobleTitle" class="metallic-title metallic-title--main">
                NOBLE AWARD
            </p>

            <p
                ref="nominationFormTitle"
                class="metallic-title metallic-title--sub"
            >
                NOMINATION FORM
            </p>

            <!-- Form Card -->
            <form
                @submit.prevent="submitForm"
                class="mt-8 rounded-2xl border border-zinc-800/70 bg-[#1a1a1a] backdrop-blur p-5 sm:p-6 md:p-8 shadow-xl"
            >
                <!-- Nominator fields -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="col-span-1">
                        <label
                            for="nominatorName"
                            class="block text-sm font-medium mb-1"
                            >Your First Name</label
                        >
                        <input
                            id="nominatorFirstName"
                            v-model="form.nominatorFirstName"
                            type="text"
                            autocomplete="name"
                            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
                            placeholder="Jane Doe"
                        />
                    </div>

                    <div class="col-span-1">
                        <label
                            for="nominatorEmail"
                            class="block text-sm font-medium mb-1"
                            >Your Last Name</label
                            >
                        <input
                            id="nominatorLastName"
                            v-model="form.nominatorLastName"
                            type="text"
                            autocomplete="name"
                            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <!-- Nominee section -->
                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            for="firstName"
                            class="block text-sm font-medium mb-1"
                            >Nominee First Name</label
                        >
                        <input
                            id="firstName"
                            v-model="form.firstName"
                            type="text"
                            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
                            placeholder="Nominee first name"
                        />
                    </div>
                    <div>
                        <label
                            for="lastName"
                            class="block text-sm font-medium mb-1"
                            >Nominee Last Name</label
                        >
                        <input
                            id="lastName"
                            v-model="form.lastName"
                            type="text"
                            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
                            placeholder="Nominee last name"
                        />
                    </div>
                </div>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            for="phoneNumber"
                            class="block text-sm font-medium mb-1"
                            >Phone Number</label
                        >
                        <input
                            id="phoneNumber"
                            v-model="form.phoneNumber"
                            type="tel"
                            autocomplete="tel"
                            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
                            placeholder="(555) 555-5555"
                        />
                    </div>
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium mb-1"
                            >Nominee Email</label
                        >
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
                            placeholder="nominee@example.com"
                        />
                    </div>
                </div>

                <div class="mt-4">
                    <label for="address" class="block text-sm font-medium mb-1"
                        >Address</label
                    >
                    <input
                        id="address"
                        v-model="form.address"
                        type="text"
                        class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
                        placeholder="Street, City, State"
                    />
                </div>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            for="placeOfWork"
                            class="block text-sm font-medium mb-1"
                            >Place of Work</label
                        >
                        <input
                            id="placeOfWork"
                            v-model="form.placeOfWork"
                            type="text"
                            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
                            placeholder="Company / Organization"
                        />
                    </div>
                    <div>
                        <label
                            for="occupation"
                            class="block text-sm font-medium mb-1"
                            >Occupation</label
                        >
                        <input
                            id="occupation"
                            v-model="form.occupation"
                            type="text"
                            class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3"
                            placeholder="Role / Title"
                        />
                    </div>
                </div>

                <div class="mt-4">
                    <label
                        for="description"
                        class="block text-sm font-medium mb-1"
                        >Description</label
                    >
                    <textarea
                        id="description"
                        v-model="form.description"
                        rows="5"
                        class="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 p-3 resize-y"
                        placeholder="Why are you nominating this person?"
                    ></textarea>
                </div>

                <!-- File Upload -->
                <div class="mt-6">
                    <span class="block text-sm font-medium">Upload Photo</span>

                    <div
                        class="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                    >
                        <input
                            id="photo"
                            ref="fileInput"
                            type="file"
                            accept="image/**"
                            class="sr-only"
                            @change="handlePhotoUpload"
                        />
                        <label
                            for="photo"
                            ref="uploadButton"
                            class="inline-flex items-center justify-center rounded-xl border border-amber-400 px-4 py-2 bg-zinc-800/70 text-amber-300 font-serif cursor-pointer transition hover:bg-amber-300 hover:text-zinc-900 hover:border-zinc-900"
                        >
                            Choose File
                        </label>

                        <span class="text-sm text-amber-200/80 break-all">
                            {{ selectedFileName || "No file chosen" }}
                        </span>
                    </div>
                </div>

                <!-- Submit status message -->
                <p
                    v-if="submitMessage"
                    :class="[
                        'mt-6 text-sm text-center',
                        submitMessage.type === 'success'
                            ? 'text-amber-300'
                            : 'text-red-400',
                    ]"
                >
                    {{ submitMessage.text }}
                </p>

                <!-- Submit -->
                <button
                    type="submit"
                    :disabled="submitting"
                    class="mt-6 w-full nomination-submit-btn"
                >
                    {{ submitting ? "Submitting..." : "Submit" }}
                </button>
            </form>
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
    font-size: 32px;
}
</style>
