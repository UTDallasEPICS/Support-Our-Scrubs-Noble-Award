<!-- /pages/nominee/setup-profile.vue -->
<script setup lang="ts">
import { authClient } from "~/shared/auth-client";
import type { AboutMeInput } from "~/shared/types";

// Auth: delegate the "open login modal" UX to the default layout by hopping
// back to `/` with `?login=true` - the layout's mount hook opens the modal.
const { data: session } = await authClient.useSession(useFetch);
if (!session.value?.user) {
    await navigateTo({ path: "/", query: { login: "true" } });
}

// Load the current About Me text (SSR-safe; runs once on the server).
const { data: aboutMe, error } = await useFetch("/api/editAboutMe");

// Local editable copy, kept in sync with the fetched value.
const aboutMeLocal = ref("");
watch(
    aboutMe,
    (val) => {
        if (val) aboutMeLocal.value = val.aboutMe;
    },
    { immediate: true },
);

// Save state. `saveMessage` carries both text and kind so the template can
// style success vs error distinctly.
const saving = ref(false);
const saveMessage = ref<{ type: "success" | "error"; text: string } | null>(null);

const saveAboutMe = async () => {
    if (saving.value) return;
    saving.value = true;
    saveMessage.value = null;
    try {
        await $fetch("/api/editAboutMe", {
            method: "PUT",
            body: { aboutMe: aboutMeLocal.value } satisfies AboutMeInput,
        });
        saveMessage.value = {
            type: "success",
            text: "Your About Me has been updated.",
        };
    } catch (err) {
        console.error(err);
        saveMessage.value = {
            type: "error",
            text: "There was a problem saving. Please try again.",
        };
    } finally {
        saving.value = false;
    }
};
</script>

<template>
    <div class="page-background">

        <div class="content-wrapper">
            <h1 class="metallic-title">Edit About Me</h1>
            <p class="metallic-heading subtitle">
                Update the story you want to share with others.
            </p>


            <div v-if="error" class="error">
                There was an error loading your profile.
            </div>

            <div v-else class="form-card">
                <label class="input-label" for="about-me"> About Me </label>

                <textarea
                    id="about-me"
                    v-model="aboutMeLocal"
                    class="about-textarea"
                    rows="8"
                    placeholder="Tell us more about yourself, your work, and why you do what you do."
                ></textarea>

                <div class="actions">
                    <button
                        class="primary-btn"
                        :disabled="saving"
                        @click="saveAboutMe"
                    >
                        {{ saving ? "Saving..." : "Save Changes" }}
                    </button>

                    <p
                        v-if="saveMessage"
                        class="save-message"
                        :class="saveMessage.type"
                    >
                        {{ saveMessage.text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-background {
    padding-bottom: 4rem;
}

.content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
}

.subtitle {
    margin-bottom: 1.5rem;
}

/* Card for the form */
.form-card {
    margin-top: 1.5rem;
    padding: 1.75rem;
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.35);
}

/* Label + textarea styling */
.input-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #f5f5f5;
    letter-spacing: 0.03em;
}

.about-textarea {
    width: 100%;
    padding: 0.9rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(0, 0, 0, 0.6);
    color: #f5f5f5;
    resize: vertical;
    font-size: 0.95rem;
    line-height: 1.5;
}

.about-textarea:focus {
    outline: none;
    border-color: #f5c542;
    box-shadow: 0 0 0 1px rgba(245, 197, 66, 0.5);
}

/* Actions */
.actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
}

.primary-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #f5c542, #ffd700);
    color: #1a1a1a;
}

.primary-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.save-message {
    font-size: 0.9rem;
    color: #f5f5f5;
}

.save-message.success {
    color: #f5c542;
}

.save-message.error {
    color: #ff6b6b;
}

/* Status messages */
.loading,
.error {
    margin-top: 1.5rem;
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    font-size: 0.95rem;
}

.loading {
    background: rgba(255, 255, 255, 0.08);
}

.error {
    background: rgba(255, 0, 0, 0.08);
    border: 1px solid rgba(255, 0, 0, 0.5);
}
</style>
