<template>
  <div class="search-bar">
    <div class="search-container">
      <input
        type="text"
        v-model="searchInput"
        @input="handleInput"
        placeholder="Search by title, director, or genre..."
        class="search-input"
      />
      <button 
        v-if="searchInput" 
        @click="clearSearch" 
        class="clear-button"
        aria-label="Clear search"
      >
        ✕
      </button>
      <div class="search-icon">⌕</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const searchInput = ref('')

const handleInput = () => {
  emit('search', searchInput.value)
}

const clearSearch = () => {
  searchInput.value = ''
  emit('search', '')
}
</script>

<style scoped>
.search-bar {
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.search-container {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1.2rem 3.5rem 1.2rem 4rem;
  font-size: 1.1rem;
  font-family: var(--font-body);
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text);
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: var(--color-text-muted);
  font-style: italic;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-accent);
  background: var(--color-dark);
  box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
}

.search-icon {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: var(--color-accent);
  pointer-events: none;
}

.clear-button {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border);
  color: var(--color-text);
  border-radius: 50%;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background: var(--color-accent);
  color: var(--color-darker);
  transform: translateY(-50%) rotate(90deg);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .search-input {
    padding: 1rem 3rem 1rem 3.5rem;
    font-size: 1rem;
  }

  .search-icon {
    left: 1.25rem;
    font-size: 1.3rem;
  }
}
</style>