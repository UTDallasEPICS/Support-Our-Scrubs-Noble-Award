<script>
export default {
    data() {
        return {
            emailSearch: "",
            formData: {
                id: "", // will be filled from API
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                placeOfWork: "",
                occupation: "",
                email: "",
                description: "",
                photoURL: "",
                // status, slug, nominatorId, etc. will also come from API and be preserved
            },
            selectedFile: null,
            selectedFileName: "",
        };
    },
    methods: {
        async fetchNominee() {
            try {
                // NOTE: currently this searches by nominee.email
                // If you change your backend to search via Nominator.Nominee[], you can hit a different endpoint
                const res = await fetch(
                    `/api/nominee?email=${encodeURIComponent(this.emailSearch)}`,
                );

                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    console.error("Error details:", err);
                    throw new Error(
                        err.statusMessage || "Error fetching nominee",
                    );
                }

                const data = await res.json();
                if (data && data.length > 0) {
                    this.formData = { ...data[0] };
                    this.selectedFile = null;
                    this.selectedFileName = "";
                } else {
                    alert("No nominee found for that email.");
                }
            } catch (error) {
                console.error("Error fetching nominee:", error);
                alert("Error fetching nominee.");
            }
        },

        handlePhotoUpload(event) {
            const input = event.target;
            const file = input.files && input.files[0] ? input.files[0] : null;
            this.selectedFile = file;
            this.selectedFileName = file ? file.name : "";
        },

        async submitForm() {
            try {
                const payload = new FormData();

                // Append all nominee fields from formData
                Object.entries(this.formData).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        payload.append(key, value);
                    }
                });

                // If a new file was selected, append it as "photo"
                if (this.selectedFile) {
                    payload.append("photo", this.selectedFile);
                }

                const res = await fetch("/api/nominee", {
                    method: "PUT",
                    // do NOT set Content-Type here; browser will set multipart boundary
                    body: payload,
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    console.error("Error details:", err);
                    throw new Error(
                        err.statusMessage || "Error updating nominee",
                    );
                }

                alert("Nominee updated successfully!");
            } catch (error) {
                console.error("Error updating nominee:", error);
                alert("Error updating profile.");
            }
        },
    },
};
</script>

<template>
    <div class="min-h-screen bg-black text-amber-300">
        <Navbar @open-login="showLogin = true" />

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
                        for="emailSearch"
                        class="block text-sm font-medium mb-2"
                        >Nominee Email</label
                    >

                    <div class="flex gap-3">
                        <input
                            id="emailSearch"
                            v-model="emailSearch"
                            type="text"
                            class="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/70 text-amber-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 p-3"
                            placeholder="nominee@example.com"
                        />

                        <button
                            type="button"
                            class="px-5 py-2 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300"
                            @click="fetchNominee"
                        >
                            Search
                        </button>
                    </div>
                </div>

                <!-- Editable Form -->
                <form @submit.prevent="submitForm" class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="firstName" class="block text-sm mb-1"
                                >First Name</label
                            >
                            <input
                                id="firstName"
                                v-model="formData.firstName"
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
                                v-model="formData.lastName"
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
                                v-model="formData.phoneNumber"
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
                                v-model="formData.email"
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
                            v-model="formData.address"
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
                                v-model="formData.placeOfWork"
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
                                v-model="formData.occupation"
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
                            v-model="formData.description"
                            rows="5"
                            class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-3 text-amber-100 resize-y"
                        ></textarea>
                    </div>

                    <!-- Current Photo + Upload New -->
                    <div class="space-y-3">
                        <span class="block text-sm font-medium">Photo</span>

                        <!-- Current photo preview -->
                        <div
                            v-if="formData.photoURL"
                            class="flex items-center gap-4"
                        >
                            <img
                                :src="formData.photoURL"
                                alt="Current nominee photo"
                                class="h-16 w-16 rounded-full object-cover border border-amber-400"
                            />
                            <span class="text-xs text-amber-200/80 break-all">
                                Current: {{ formData.photoURL }}
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
                                v-model="formData.photoURL"
                                type="url"
                                placeholder="/uploads/..."
                                class="w-full rounded-lg bg-zinc-800/70 border border-zinc-700 p-2 text-amber-100 text-xs"
                            />
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        class="w-full nomination-submit-btn mt-6"
                    >
                        Save Changes
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
/* Metallic styles reused from nomination page */
.metallic-title {
    font-family: "Cinzel", serif;
    text-align: center;
    background: linear-gradient(
        120deg,
        #fff4b0 0%,
        #f0c75e 20%,
        #d4af37 40%,
        #f8e27d 60%,
        #d4af37 80%,
        #fff4b0 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-shadow:
        0 0 5px rgba(212, 175, 55, 0.5),
        0 0 10px rgba(212, 175, 55, 0.4),
        0 0 20px rgba(255, 215, 0, 0.3);
    animation: metallicShine 3s infinite linear;
}

.metallic-title--main {
    margin-top: 2rem;
    font-size: 60px;
}

.metallic-title--sub {
    margin-top: 0.5rem;
    font-size: 28px;
}

@keyframes metallicShine {
    0% {
        background-position: 200% center;
    }
    100% {
        background-position: -200% center;
    }
}

/* Submit button (from nomination page) */
.nomination-submit-btn {
    background-color: #d4af37;
    color: #0d0d0d;
    font-weight: 700;
    padding: 14px 18px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    cursor: pointer;
    font-size: 1rem;
    transition:
        transform 0.08s ease,
        background-color 0.2s ease,
        box-shadow 0.2s ease;
    box-shadow: 0 6px 22px rgba(245, 197, 66, 0.2);
}

.nomination-submit-btn:hover {
    background-color: #ffe08a;
    box-shadow: 0 10px 28px rgba(255, 224, 138, 0.25);
}

.nomination-submit-btn:active {
    transform: translateY(1px);
}
</style>
