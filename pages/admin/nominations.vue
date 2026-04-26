<script setup lang="ts">
import { authClient } from "~/shared/auth-client";
import type { NomineesWithUser } from "~/shared/types";
import { getImageLink } from "~/utils";

// --- Admin gate (page-level; middleware doesn't cover this path) ----------
const { data: session } = await authClient.useSession(useFetch);
if (!session.value?.user?.email) {
    await navigateTo({ path: "/", query: { login: "true" } });
} else {
    const { ok } = await useCheckAdmin(session.value.user.email);
    if (!ok) await navigateTo("/");
}
// --- Canonical status vocabulary ------------------------------------------
// The schema default is PENDING; APPROVED/DENIED are the admin decisions.
// LEGACY-STATUS: the server's `Status` constant in `server/utils/prismaclient.ts`
// still exposes CREATED/CONFIRMED/VERIFIED/SENT. Consolidation is out of scope
// for this refactor - those values are intentionally dropped from this page's UI.
const STATUSES = ["PENDING", "APPROVED", "DENIED"] as const;
type Status = (typeof STATUSES)[number];
type StatusFilter = "ALL" | Status;

// --- Data -----------------------------------------------------------------
// LEGACY-STATUS: `/api/nominee` currently hard-filters to APPROVED, so this
// page only sees approved nominees until an admin listing endpoint is added.
// `allNominees` is the full list from the admin API, or search results written
// into the same ref. `useFetch` (not raw `$fetch`) forwards cookies on SSR for
// same-origin `/api/*` calls, so the session is visible to the handler.
const { data: allNominees, refresh: refreshNomineeList } = await useFetch<
    NomineesWithUser[]
>("/api/admin/nominee", {
    default: () => [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
});

// --- Search (debounced, hits `/api/nominee/search`) -----------------------
const searchQuery = ref("");
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

function debouncedSearch() {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(runSearch, 500);
}

async function runSearch() {
    const term = searchQuery.value.trim();
    if (!term) {
        await refreshNomineeList();
        return;
    }
    try {
        const res = await $fetch(
            `/api/nominee/search?searchTerm=${encodeURIComponent(term)}`,
        );
        allNominees.value = Array.isArray(res)
            ? (res as NomineesWithUser[])
            : [];
    } catch (err) {
        console.error("Error searching nominees:", err);
    }
}

// --- Status filter (client-side over the fetched list) --------------------
const statusFilter = ref<StatusFilter>("ALL");
const filterDropdownOpen = ref(false);

function toggleFilterDropdown() {
    filterDropdownOpen.value = !filterDropdownOpen.value;
}

function selectFilter(status: StatusFilter) {
    statusFilter.value = status;
    filterDropdownOpen.value = false;
}

const list = computed(() => allNominees.value ?? []);

const filteredNominees = computed(() =>
    statusFilter.value === "ALL"
        ? list.value
        : list.value.filter((n) => n.status === statusFilter.value),
);

// --- Per-row status dropdown (keyed by nominee id to avoid mutating data) -
const rowStatusDropdown = ref<Record<string, boolean>>({});

function toggleRowDropdown(id: string) {
    rowStatusDropdown.value[id] = !rowStatusDropdown.value[id];
}

// --- Status update + email notification -----------------------------------
async function updateStatus(nominee: NomineesWithUser, status: Status) {
    try {
        await useFetch("/api/admin/nominee", {
            method: "PUT",
            body: { nomineeId: nominee.id, status },
        });
        nominee.status = status;
        rowStatusDropdown.value[nominee.id] = false;

        if (status === "APPROVED" || status === "DENIED") {
            const confirmed = confirm(
                `Confirm status change to ${status}? This will notify the nominee via email.`,
            );
            if (!confirmed) return;

            await useFetch("/api/admin/email", {
                method: "POST",
                body: {
                    name: getFullName(nominee.user),
                    email: nominee.user?.email ?? "",
                    type: status === "APPROVED" ? "ACCEPTED" : "REJECTED",
                },
            });
        }
    } catch (err) {
        console.error("Error updating status:", err);
        throw createError({
            statusCode: 500,
            statusMessage: "Error updating status",
        });
    }
}

// --- Modal ----------------------------------------------------------------
const isModalOpen = ref(false);
const selectedNominee = ref<NomineesWithUser | null>(null);

function openModal(nominee: NomineesWithUser) {
    selectedNominee.value = nominee;
    isModalOpen.value = true;
}

function closeModal() {
    isModalOpen.value = false;
    selectedNominee.value = null;
}

// --- Logout ---------------------------------------------------------------
async function logout() {
    await authClient.signOut();
    navigateTo("/");
}
</script>

<template>
    <div class="text-[#d4af37] min-h-screen bg-black">
        <!-- Header -->
        <div>
            <h2 class="text-center text-3xl font-bold">View Nominees</h2>
            <br />
        </div>

        <!-- Logout Button -->
        <div class="text-right px-4">
            <button
                @click="logout"
                class="bg-red-500 px-4 py-2 rounded text-white"
            >
                Logout
            </button>
        </div>

        <nuxt-link to="/nominator/form">
            <button
                class="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold"
            >
                Go To Nomination Page
            </button>
        </nuxt-link>

        <nuxt-link to="/nominator/edit">
            <button
                class="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold"
            >
                Edit Previous Submission
            </button>
        </nuxt-link>

        <div>
            <input
                v-model="searchQuery"
                @input="debouncedSearch"
                type="text"
                class="bg-gray-700 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search entries..."
            />
        </div>

        <div
            v-if="filteredNominees.length === 0"
            class="text-center text-gray-500 py-4"
        >
            No nominees match the current filter.
        </div>

        <!-- Filter Dropdown: ALL + canonical statuses only -->
        <div class="relative inline-block text-left w-1/4 py-5">
            <div>
                <button
                    type="button"
                    class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300"
                    id="menu-button"
                    :aria-expanded="filterDropdownOpen ? 'true' : 'false'"
                    aria-haspopup="true"
                    @click="toggleFilterDropdown"
                >
                    Filter: {{ statusFilter }}
                </button>
            </div>

            <div
                class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                v-show="filterDropdownOpen"
            >
                <div class="py-1 space-y-2" role="none">
                    <button
                        class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                        role="menuitem"
                        @click="selectFilter('ALL')"
                    >
                        ALL
                    </button>
                    <button
                        v-for="s in STATUSES"
                        :key="s"
                        class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                        role="menuitem"
                        @click="selectFilter(s)"
                    >
                        {{ s }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Display Table of Nominees -->
        <div class="mt-4 mx-0">
            <div class="relative overflow-x-auto rounded-lg">
                <table class="w-full text-sm text-center">
                    <thead class="text-sm uppercase bg-gray-700">
                        <tr class="h-9">
                            <th scope="col" class="px-6 py-3">Expanded View</th>
                            <!-- NEW: Photo column -->
                            <th scope="col" class="px-6 py-3">Photo</th>
                            <th scope="col" class="px-6 py-3">First Name</th>
                            <th scope="col" class="px-6 py-3">Last Name</th>
                            <th scope="col" class="px-6 py-3">Phone Number</th>
                            <th scope="col" class="px-6 py-3">Address</th>
                            <th scope="col" class="px-6 py-3">Place of Work</th>
                            <th scope="col" class="px-6 py-3">Occupation</th>
                            <th scope="col" class="px-6 py-3">Email</th>
                            <th scope="col" class="px-6 py-3">Description</th>
                            <th scope="col" class="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            class="h-9"
                            v-for="u in filteredNominees"
                            :key="u.id"
                        >
                            <td>
                                <button
                                    @click="openModal(u)"
                                    class="hover:text-gray-400 underline"
                                >
                                    View Nominee
                                </button>
                            </td>

                            <td>
                                <div class="flex justify-center">
                                    <img
                                        v-if="u.photoURL"
                                        :src="getImageLink(u.photoURL, u.id)"
                                        alt="Nominee photo"
                                        class="h-12 w-12 rounded-full object-cover border border-gray-500"
                                    />
                                    <span v-else class="text-xs text-gray-500">
                                        No photo
                                    </span>
                                </div>
                            </td>

                            <td>{{ u.user?.firstName ?? "" }}</td>
                            <td>{{ u.user?.lastName ?? "" }}</td>
                            <td>{{ u.phoneNumber }}</td>
                            <td>{{ u.address }}</td>
                            <td>{{ u.placeOfWork }}</td>
                            <td>{{ u.occupation }}</td>
                            <td>{{ u.user?.email ?? "" }}</td>
                            <td
                                class="max-w-xs truncate"
                                :title="u.description"
                            >
                                {{ u.description }}
                            </td>
                            <td>
                                <!-- Per-row status dropdown: canonical statuses only -->
                                <div class="relative inline-block">
                                    <button
                                        type="button"
                                        class="inline-flex justify-center w-32 bg-gray-700 px-3 py-2 text-sm font-semibold text-[#d4af37] shadow-sm ring-1 ring-inset ring-gray-300"
                                        @click="toggleRowDropdown(u.id)"
                                    >
                                        {{ u.status }}
                                    </button>

                                    <div
                                        class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        v-show="rowStatusDropdown[u.id]"
                                    >
                                        <div class="py-1 space-y-2">
                                            <button
                                                v-for="s in STATUSES"
                                                :key="s"
                                                class="block w-full text-center px-4 py-2 text-sm hover:bg-gray-700"
                                                @click="updateStatus(u, s)"
                                            >
                                                {{ s }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div
            v-if="isModalOpen && selectedNominee"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div
                class="bg-gray-800 rounded-lg w-full max-w-md px-6 py-5 shadow-xl"
            >
                <h3 class="text-2xl font-bold mb-4 text-center">
                    Nominee Details
                </h3>

                <!-- NEW: Big photo in modal -->
                <div
                    v-if="selectedNominee.photoURL"
                    class="flex justify-center mb-4"
                >
                    <img
                        :src="getImageLink(selectedNominee.photoURL, selectedNominee.id)"
                        alt="Nominee photo"
                        class="h-32 w-32 rounded-full object-cover border-2 border-[#d4af37]"
                    />
                </div>

                <div class="space-y-1 text-sm">
                    <p>
                        <strong>Name:</strong>
                        {{ getFullName(selectedNominee.user) || "—" }}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        {{ selectedNominee.user?.email ?? "—" }}
                    </p>
                    <p>
                        <strong>Phone Number:</strong>
                        {{ selectedNominee.phoneNumber }}
                    </p>
                    <p>
                        <strong>Address:</strong> {{ selectedNominee.address }}
                    </p>
                    <p>
                        <strong>Place of Work:</strong>
                        {{ selectedNominee.placeOfWork }}
                    </p>
                    <p>
                        <strong>Occupation:</strong>
                        {{ selectedNominee.occupation }}
                    </p>
                    <p class="break-words">
                        <strong>Description:</strong>
                        {{ selectedNominee.description }}
                    </p>
                    <p><strong>Status:</strong> {{ selectedNominee.status }}</p>
                </div>

                <div class="mt-5 flex justify-end">
                    <button
                        @click="closeModal"
                        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
