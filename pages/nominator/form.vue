<script setup lang="ts">
import LoginModal from "@/components/MyLogin.vue";
import Navbar from "~/components/Navbar.vue";
import type { NomineeCreateInput } from "~/shared/types";
const showLogin = ref(false);

// Form fields
const form = ref<NomineeCreateInput>({
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
    photoURL: "",
});

// File upload state
const selectedFile = ref<File | null>(null);
const selectedFileName = ref("");


const handlePhotoUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target?.files || target.files.length === 0) return;

    const file = target.files[0];
    selectedFile.value = file;
    selectedFileName.value = file.name; // <-- filename shows up now

    console.log("Selected file:", file.name);
};

// Reset form after submit
function resetForm() {
    form.value = {
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
        photoURL: "",
    };
}

// Submit form
async function submitForm() {
    try {
        // TODO: Handle Photo Upload
        
        await $fetch("/api/nominee", {
            method: "POST",
            body: form.value,
        });
        alert("Nomination submitted!");
        resetForm();
    } catch (err) {
        console.error("Error submitting nomination", err);
        alert("Something went wrong submitting the nomination.");
    }
}
</script>

<template>
    <div class="min-h-screen bg-black text-amber-300">
        <Navbar @open-login="showLogin = true" />

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

                <!-- Submit -->
                <button type="submit" class="mt-8 w-full nomination-submit-btn">
                    Submit
                </button>
            </form>
        </main>
    </div>
    <Teleport to="body">
        <LoginModal v-if="showLogin" @close="showLogin = false" />
    </Teleport>
</template>

<style scoped>
/* your original styles – unchanged */
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
    font-size: 32px;
}

.nomination-submit-btn {
    background-color: #d4af37;
    color: #0d0d0d;
    font-weight: 700;
    padding: 14px 18px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    cursor: pointer;
    font-family: "Roboto", sans-serif;
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
