<template>
  <div class="home">
    <div class="container">
      <div class="hero">
        <h1 class="hero-title">Discover Cinema</h1>
        <p class="hero-subtitle">Explore our curated collection of film reviews</p>
      </div>

      <SearchBar @search="handleSearch" />

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>Loading reviews...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchReviews" class="retry-button">Try Again</button>
      </div>

      <div v-else-if="filteredReviews.length === 0 && searchQuery" class="no-results">
        <p>No reviews found for "{{ searchQuery }}"</p>
        <button @click="clearSearch" class="clear-button">Show All Reviews</button>
      </div>

      <ReviewList v-else :reviews="filteredReviews" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import SearchBar from '../components/SearchBar.vue'
import ReviewList from '../components/ReviewList.vue'

const reviews = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

const filteredReviews = computed(() => {
  if (!searchQuery.value) {
    return reviews.value
  }

  const query = searchQuery.value.toLowerCase()
  return reviews.value.filter(review => {
    const title = review.attributes.title?.toLowerCase() || ''
    const description = review.attributes.description?.toLowerCase() || ''
    const director = review.attributes.director?.toLowerCase() || ''
    const genre = review.attributes.genre?.toLowerCase() || ''
    
    return (
      title.includes(query) ||
      description.includes(query) ||
      director.includes(query) ||
      genre.includes(query)
    )
  })
})

const fetchReviews = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get('https://movie-review-backend-4aus.onrender.com/api/reviewpostgres')
    reviews.value = response.data.data
  } catch (err) {
    error.value = 'Failed to load reviews. Please make sure the backend is running.'
    console.error('Error fetching reviews:', err)
  } finally {
    loading.value = false
  }
}

const handleSearch = (query) => {
  searchQuery.value = query
}

const clearSearch = () => {
  searchQuery.value = ''
}

onMounted(() => {
  fetchReviews()
})
</script>

<style scoped>
.home {
  min-height: 60vh;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.hero-title {
  font-size: 4rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--color-text), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.8s ease;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: var(--color-text-muted);
  font-style: italic;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.loading,
.error,
.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  animation: spin 1s linear infinite;
}

.error {
  color: #ff6b6b;
}

.retry-button,
.clear-button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: var(--color-accent);
  color: var(--color-darker);
  font-weight: 600;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.retry-button:hover,
.clear-button:hover {
  background: var(--color-text);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .hero {
    margin-bottom: 2rem;
    padding: 1rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}
</style>