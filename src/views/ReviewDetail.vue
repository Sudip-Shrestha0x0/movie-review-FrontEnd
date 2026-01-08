<template>
  <div class="review-detail">
    <div class="container">
      <button @click="goBack" class="back-button">
        ← Back to Reviews
      </button>

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>Loading review...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchReview" class="retry-button">Try Again</button>
      </div>

      <article v-else-if="review" class="review-article">
        <div class="review-hero">
          <div class="review-image-container">
            <img 
              :src="review.attributes.imageUrl" 
              :alt="review.attributes.title"
              class="review-image"
            />
            <div class="image-overlay"></div>
          </div>
          <div class="review-header">
            <h1 class="review-title">{{ review.attributes.title }}</h1>
            <div class="review-meta">
              <span class="meta-item">{{ review.attributes.releaseYear }}</span>
              <span class="meta-separator">•</span>
              <span class="meta-item">{{ review.attributes.director }}</span>
              <span class="meta-separator">•</span>
              <span class="meta-item">{{ review.attributes.genre }}</span>
            </div>
            <div class="rating-display">
              <div class="stars">
                <span 
                  v-for="star in 5" 
                  :key="star"
                  class="star"
                  :class="{ filled: star <= Math.round(review.attributes.rating / 2) }"
                >
                  ★
                </span>
              </div>
              <span class="rating-number">{{ review.attributes.rating }}/10</span>
            </div>
          </div>
        </div>

        <div class="review-content">
          <div class="review-description">
            <h2 class="section-title">Synopsis</h2>
            <p class="description-text">{{ review.attributes.description }}</p>
          </div>

          <div class="review-body">
            <h2 class="section-title">Full Review</h2>
            <div class="review-text">{{ extractFullReviewText(review.attributes.fullReview) }}</div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const review = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchReview = async () => {
  loading.value = true
  error.value = null

  try {
    const documentId = route.params.id
    const response = await axios.get(`https://movie-review-backend-4aus.onrender.com/api/reviewpostgres/${documentId}`)
    review.value = response.data.data
  } catch (err) {
    error.value = 'Failed to load review. Please make sure the backend is running.'
    console.error('Error fetching review:', err)
  } finally {
    loading.value = false
  }
}

const extractFullReviewText = (fullReview) => {
  if (!fullReview || !Array.isArray(fullReview)) {
    return ''
  }
  
  let text = ''
  fullReview.forEach(paragraph => {
    if (paragraph.children && Array.isArray(paragraph.children)) {
      paragraph.children.forEach(child => {
        if (child.type === 'text' && child.text) {
          text += child.text + '\n\n'
        }
      })
    }
  })
  
  return text.trim()
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  fetchReview()
})
</script>

<style scoped>
.review-detail {
  min-height: 60vh;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  margin-bottom: 2rem;
  background: var(--color-card);
  color: var(--color-text);
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.back-button:hover {
  background: var(--color-accent);
  color: var(--color-darker);
  border-color: var(--color-accent);
  transform: translateX(-4px);
}

.loading,
.error {
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

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: var(--color-accent);
  color: var(--color-darker);
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: var(--color-text);
  transform: translateY(-2px);
}

.review-article {
  animation: fadeIn 0.6s ease;
}

.review-hero {
  margin-bottom: 3rem;
}

.review-image-container {
  position: relative;
  width: 100%;
  height: 500px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
}

.review-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to top, var(--color-darker), transparent);
}

.review-header {
  padding: 0 1rem;
}

.review-title {
  font-size: 3.5rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.review-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
}

.meta-item {
  font-weight: 600;
}

.meta-separator {
  color: var(--color-accent);
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  font-size: 2rem;
  color: var(--color-border);
  transition: color 0.3s ease;
}

.star.filled {
  color: var(--color-accent);
}

.rating-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  font-family: var(--font-display);
}

.review-content {
  padding: 0 1rem;
}

.review-description {
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--color-border);
}

.section-title {
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}

.description-text {
  font-size: 1.3rem;
  line-height: 1.8;
  color: var(--color-text-muted);
  font-style: italic;
}

.review-body {
  margin-bottom: 3rem;
}

.review-text {
  font-size: 1.15rem;
  line-height: 1.9;
  color: var(--color-text);
  max-width: 800px;
  white-space: pre-line;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
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

@media (max-width: 1024px) {
  .review-image-container {
    height: 400px;
  }

  .review-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .review-image-container {
    height: 300px;
  }

  .review-title {
    font-size: 2rem;
  }

  .review-meta {
    flex-wrap: wrap;
    font-size: 1rem;
  }

  .stars {
    gap: 0.15rem;
  }

  .star {
    font-size: 1.5rem;
  }

  .rating-number {
    font-size: 1.25rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .description-text {
    font-size: 1.1rem;
  }

  .review-text {
    font-size: 1.05rem;
  }
}
</style>