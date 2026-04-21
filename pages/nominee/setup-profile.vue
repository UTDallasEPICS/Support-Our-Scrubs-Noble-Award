<!-- /pages/profile/edit-about.vue -->
<script setup lang="ts">
import type { AboutMeInput } from "~/shared/types";

const router = useRouter();
const { data: session } = await useFetch("/api/auth/session");
// TODO: revert this to use the login modal
// If no user, send them to page with login modal
if (!session.value?.user) {
    router.push({
        path: "/",
        query: { login: "true" },
    });
}

// Load current about-me text
const { data: aboutMe, error } = await useFetch(
    "/api/editAboutMe",
);

// Local editable copy
const aboutMeLocal = ref("");

watch(
    aboutMe,
    (val) => {
        if (val) {
            aboutMeLocal.value = val.aboutMe;
        }
    },
    { immediate: true },
);

const saving = ref(false);
const saveMessage = ref("");

const saveAboutMe = async () => {
    if (saving.value) return;
    saving.value = true;
    saveMessage.value = "";

    try {
        await $fetch("/api/editAboutMe", {
            method: "PUT",
            body: {
                aboutMe: aboutMeLocal.value,
            } satisfies AboutMeInput,
        });
        saveMessage.value = "Your About Me has been updated.";
    } catch (err) {
        console.error(err);
        saveMessage.value = "There was a problem saving. Please try again.";
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

                    <p v-if="saveMessage" class="save-message">
                        {{ saveMessage }}
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
