<script setup lang="ts">
import { authClient } from "~/shared/auth-client";
import { Prisma } from "@prisma/client";
import { useLoginModal } from "~/composables/useLoginModal";

type NomineesWithUser = Prisma.NomineeGetPayload<{include: {user: {select: {firstName: true, lastName: true, email: true}}}}>;

const { data: session } = await authClient.useSession(useFetch);
const { open: openLoginModal } = useLoginModal();
if (!session.value?.user) openLoginModal();
const router = useRouter();



const { data: nominees, error } = await useFetch<NomineesWithUser[]>("/api/nominator/nominations");



const goToProfile = (slug: string) => {
    if (!slug) return;
    router.push(`/profile/${slug}`);
};
</script>

<template>
    <div class="page-background">
        <div class="content-wrapper">
            <h1 class="metallic-title">My Nominees</h1>
            <p class="metallic-heading subtitle">
                Here are all the people you have nominated (accepted, pending or
                decline).
            </p>

            <div v-if="error" class="error">
                There was an error loading your nominees.
            </div>
            <div v-else-if="!nominees" class="empty-state">
                You haven't submitted any nominations yet.
            </div>
            <div v-else class="cards-container">
                <div
                    v-for="nominee in nominees"
                    :key="nominee.id"
                    class="card"
                    @click="goToProfile(nominee.slug)"
                >
                    <!-- TOP ROW: Circle + Name -->
                    <div class="card-top">
                        <div class="avatar">
                            <img
                                v-if="nominee.photoURL"
                                :src="nominee.photoURL"
                                alt="photo"
                            />
                            <div v-else class="no-photo">No Photo</div>
                        </div>
                        <div class="card-content">
                            <h1 class="name">
                                {{ nominee.user?.firstName + " " + nominee.user?.lastName }}
                            </h1>
                            <h2 class="name">{{ nominee.occupation }}</h2>
                            <h2 class="name">{{ nominee.placeOfWork }}</h2>
                        </div>
                    </div>

                    <!-- OPTIONAL: show status if you have one -->
                    <div class="status-row" v-if="nominee.status">
                        <span
                            class="status-pill"
                            :class="{
                                accepted: nominee.status === 'APPROVED',
                                pending: nominee.status === 'PENDING',
                                declined: nominee.status === 'DENIED',
                            }"
                        >
                            {{
                                nominee.status === "APPROVED"
                                    ? "Accepted"
                                    : nominee.status === "DENIED"
                                      ? "Denied"
                                      : nominee.status === "PENDING"
                                        ? "Pending"
                                        : ""
                            }}
                        </span>
                    </div>

                    <!-- DESCRIPTION NEAR BOTTOM -->
                    <p class="description">
                        {{ nominee.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
}

.subtitle {
    margin-bottom: 2rem;
}

/* Reuse / match your existing card styles */
.cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.card {
    cursor: pointer;
    padding: 1.5rem;
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-top {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.avatar {
    width: 64px;
    height: 64px;
    border-radius: 999px;
    overflow: hidden;
    border: 2px solid rgba(255, 215, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.no-photo {
    font-size: 0.75rem;
    text-align: center;
}

.card-content .name {
    margin: 0;
    line-height: 1.2;
}

.description {
    margin-top: 1rem;
    font-size: 0.9rem;
}

/* Optional status pill */
.status-row {
    margin-top: 0.75rem;
}

.status-pill {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.status-pill.accepted {
    border: 1px solid rgba(0, 156, 0, 0.5);
}

.status-pill.pending {
    border: 1px solid rgba(255, 215, 0, 0.7);
}

.status-pill.declined {
    border: 1px solid #ff4d4d;
}

.loading,
.error,
.empty-state {
    margin-top: 2rem;
}
</style>
