<script setup lang="ts">
import { ref } from "vue";
import UserData from "~/components/UserData.vue";
import type { SearchQueryInput } from "~/shared/types";

// Initial list of approved nominees (SSR-safe via useAsyncData).
const { data: initialNominees } = await useAsyncData("roster-nominees", () =>
    $fetch("/api/nominee"),
);

// `nominees` is the list currently rendered in UserData. Starts as the initial
// set; replaced by search results on `performSearch`, restored on `clearSearch`.
const nominees = ref(
    (initialNominees.value ?? []).map((n) => ({
        ...n,
        name: getFullName(n.user),
    })),
);

const searchQuery = ref("");
const searchLoading = ref(false);
const searchError = ref("");
const hasSearched = ref(false);

async function performSearch() {
    const term = searchQuery.value.trim();
    if (!term) {
        clearSearch();
        return;
      }
    searchLoading.value = true;
    searchError.value = "";
    hasSearched.value = true;
    try {
        const query: SearchQueryInput = { searchTerm: term };
        const response = await $fetch(
            `/api/nominee/search?searchTerm=${encodeURIComponent(query.searchTerm ?? "")}`,
        );
        // The search endpoint returns either a nominee array or `{ results: [] }`
        // when the term is empty; normalize before filtering.
        const items = Array.isArray(response) ? response : [];
        nominees.value = items
            .filter((n) => n.status === "APPROVED")
            .map((n) => ({ ...n, name: getFullName(n.user) }));
      } catch (e) {
        this.searchError = 'Failed to search nominees. Please try again.';
        console.error(e);
      } finally {
        this.searchLoading = false;
      }
}

function clearSearch() {
    searchQuery.value = "";
    hasSearched.value = false;
    searchError.value = "";
    nominees.value = (initialNominees.value ?? []).map((n) => ({
        ...n,
        name: getFullName(n.user),
    }));
}
</script>

<template>
      <div class="page-background">
        <div>
            <h1 class="metallic-title">Noble Award Recipients</h1>
        </div>
              <!-- Search Section -->
              <div class="search-section" @click.stop>
                <div class="search-input-container">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search by name, occupation, or workplace"
                    @keyup.enter="performSearch"
                    class="search-input"
                  />
                  <button @click.stop.prevent="performSearch" :disabled="searchLoading" class="search-button">
                    <span v-if="searchLoading">Searching...</span>
                    <span v-else>Search</span>
                  </button>
                  <button v-if="hasSearched" @click.stop.prevent="clearSearch" class="clear-button">Clear</button>
                </div>
                <div v-if="searchError" class="search-error">{{ searchError }}</div>
              </div>

        <UserData :nominees="nominees" />
      </div>
</template>



<style scoped>
/* General Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.no-results {
  text-align: center;
  padding: 40px 20px;
  color: white;
}
.no-results p:first-child {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: white;
}
.suggestion {
  font-size: 1.2rem;
  color: white
}

.blurred {
  filter: blur(8px);
  pointer-events: none; 
  user-select: none;
  transform: translateZ(0); 
  }

.three-js-container {
  width: 100%;
  max-width: 12000px;    
  height: calc(100vh - 150px);
  margin: 0 auto;         
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}



.metallic-title {
  font-size: 70px;
  position: relative;
  overflow: hidden;
}


.metallic-message {
font-size: 30px;
text-align: center;
color: #a77c43;
background: linear-gradient(
  120deg,
  #a77c43 0%,
  #a77c43 20%,
  #a77c43 40%,
  #a77c43 60%,
  #a77c43 80%,
  #a77c43 100%
);
background-clip: text;
-webkit-background-clip: text;
color: transparent;
position: relative;
text-shadow:
  0 0 5px rgba(212, 175, 55, 0.5),
  0 0 10px rgba(212, 175, 55, 0.4),
  0 0 20px rgba(255, 215, 0, 0.3);
animation: metallicShine 3s infinite linear;
}

.metallic-text {
  font-size: 30px;
  text-align: center;
  color: #d4af37;
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
  position: relative;
  text-shadow:
    0 0 5px rgba(212, 175, 55, 0.5),
    0 0 10px rgba(212, 175, 55, 0.4),
    0 0 20px rgba(255, 215, 0, 0.3);
  animation: metallicShine 3s infinite linear;
}

/* Form and Text Styling */
h1 {
    font-size: 50px;
    color: #a77c43;
    text-align: center;
    margin-bottom: 50px;
}

p {
    font-size: 30px;
    color: #a77c43;
    text-align: center;
    margin-bottom: 50px;
}

h2 {
    font-size: 30px;
    color: #a77c43;
    text-align: center;
    margin-bottom: 70px;
  }

  /* Search Section Styles */
  .search-section {
    max-width: 700px;
    margin: 0 auto 20px;
    padding: 0 20px;
  }

  .search-input-container {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .search-input {
    flex: 1;
    min-width: 200px;
    max-width: 400px;
    padding: 12px 20px;
    border: 2px solid #d4af37;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
  }

  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .search-input:focus {
    border-color: #fff5d6;
    background: rgba(255, 255, 255, 0.15);
  }

  .search-button {
    padding: 12px 25px;
    background: #d4af37;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .search-button:hover:not(:disabled) {
    background: #fff5d6;
    color: #d4af37;
  }

  .search-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .clear-button {
    padding: 12px 20px;
    background: transparent;
    color: #d4af37;
    border: 2px solid #d4af37;
    border-radius: 50px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .clear-button:hover {
    background: #d4af37;
    color: white;
  }

  .search-error {
    color: #ff6b6b;
    text-align: center;
    margin-top: 10px;
}

/* Mobile friendly */

@media (max-width: 600px) {
  .metallic-title {
    font-size: clamp(1.8rem, 7vw, 2.6rem);
    margin-top: 0px;
    margin-bottom: 10px;
  }

  .metallic-title::before {
    font-size: clamp(1.8rem, 7vw, 2.6rem);
    top: 95%;
    opacity: 0.12;
  }
}

@media (max-width: 400px) {
  .metallic-title {
    font-size: clamp(1.6rem, 8vw, 2.2rem);
  }

  .metallic-title::before {
    font-size: clamp(1.6rem, 8vw, 2.2rem);
  }
}

</style>
