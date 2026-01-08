<template>
  <div class="review-list">
    <div class="reviews-grid">
      <ReviewCard
        v-for="(review, index) in reviews"
        :key="review.id"
        :review="review"
        :style="{ animationDelay: `${index * 0.1}s` }"
      />
    </div>
  </div>
</template>

<script setup>
import ReviewCard from './ReviewCard.vue'

defineProps({
  reviews: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.review-list {
  margin-top: 2rem;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .reviews-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>