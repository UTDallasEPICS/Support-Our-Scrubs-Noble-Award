<!-- pages/dashboard.vue -->
<script setup lang="ts">
import { Prisma } from "@prisma/client"
import type { EmailTemplateType } from "#shared/types"
import type { EmailTemplateUpdateInput, EmailField } from "~/shared/types";

type AdminWithUser = Prisma.AdminGetPayload<{include: {user: {select: {firstName: true, lastName: true, email: true}}}}>;

// Tab management
const activeTab = ref<"admins" | "email-settings">("admins");

// Admin management
const newAdminEmail = ref<EmailField>("");
const existingAdmins = ref<Array<AdminWithUser>>([]);

// Email templates
const emailTemplates = ref<Array<{type: EmailTemplateType, label: string}>>([
    { type: "SIGNUP", label: "Signup Email" },
    { type: "NOMINATION", label: "Nomination Email" },
    { type: "ACCEPTED", label: "Acceptance Email" },
    { type: "REJECTED", label: "Rejection Email" },
]);
const selectedTemplate = ref<EmailTemplateType | null>(null);
const templateForm = ref<EmailTemplateUpdateInput>({
    subject: "",
    html: "",
});

// Load initial data
onMounted(async () => {
    await loadAdmins();
});

async function loadAdmins() {
    const data = await $fetch("/api/admin/list");
    existingAdmins.value = data;
}

async function loadTemplate(type: EmailTemplateType) {
    const data = await $fetch(
        `/api/admin/email-templates/${type.toLowerCase()}`,
    );
    selectedTemplate.value = type;
    templateForm.value = {
        subject: data?.subject ?? "",
        html: data?.html ?? "",
    };
}

// Form submissions
async function createAdmin() {
    await $fetch("/api/admin/create", {
        method: "POST",
        body: { email: newAdminEmail.value },
    });
    newAdminEmail.value = "";
    await loadAdmins();
}

async function saveTemplate() {
    await $fetch<EmailTemplateUpdateInput>(
        `/api/admin/email-templates/${selectedTemplate.value?.toLowerCase()}`,
        {
            method: "PUT",
            body: templateForm.value,
        },
    );
}
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex gap-8">
                <!-- Sidebar Navigation -->
                <div class="w-64 space-y-2">
                    <button
                        @click="activeTab = 'admins'"
                        :class="[
                            'w-full px-4 py-2 text-left rounded-lg',
                            activeTab === 'admins'
                                ? 'bg-blue-100 text-blue-700'
                                : 'hover:bg-gray-100',
                        ]"
                    >
                        Admin Users
                    </button>
                    <button
                        @click="activeTab = 'email-settings'"
                        :class="[
                            'w-full px-4 py-2 text-left rounded-lg',
                            activeTab === 'email-settings'
                                ? 'bg-blue-100 text-blue-700'
                                : 'hover:bg-gray-100',
                        ]"
                    >
                        Email Settings
                    </button>
                </div>

                <!-- Main Content -->
                <div class="flex-1 bg-white rounded-lg shadow p-6">
                    <!-- Admin Management Tab -->
                    <div v-if="activeTab === 'admins'">
                        <h2 class="text-xl font-bold mb-6">Admin Management</h2>

                        <form @submit.prevent="createAdmin" class="mb-8">
                            <div class="flex gap-4">
                                <input
                                    v-model="newAdminEmail"
                                    type="email"
                                    placeholder="Enter admin email"
                                    class="flex-1 p-2 border rounded"
                                    required
                                />
                                <button
                                    type="submit"
                                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Invite Admin
                                </button>
                            </div>
                        </form>

                        <div>
                            <h3 class="font-medium mb-4">Existing Admins</h3>
                            <div class="space-y-2">
                                <div
                                    v-for="admin in existingAdmins"
                                    :key="admin.id"
                                    class="flex items-center justify-between p-3 bg-gray-50 rounded"
                                >
                                    <div>
                                        <span class="font-medium">{{
                                            admin.user.email
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Email Settings Tab -->
                    <div v-if="activeTab === 'email-settings'">
                        <h2 class="text-xl font-bold mb-6">Email Templates</h2>

                        <div class="flex gap-4 mb-6">
                            <button
                                v-for="template in emailTemplates"
                                @click="loadTemplate(template.type)"
                                :class="[
                                    'px-4 py-2 rounded',
                                    selectedTemplate === template.type
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200',
                                ]"
                            >
                                {{ template.label }}
                            </button>
                        </div>

                        <form
                            v-if="selectedTemplate"
                            @submit.prevent="saveTemplate"
                        >
                            <input
                                v-model="templateForm.subject"
                                placeholder="Email subject"
                                class="w-full p-2 mb-4 border rounded"
                                required
                            />
                            <textarea
                                v-model="templateForm.html"
                                placeholder="Email HTML content"
                                class="w-full p-2 h-64 border rounded mb-4 font-mono text-sm"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Save Template
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
