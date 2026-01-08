<template>
  <router-link :to="`/review/${review.id}`" class="review-card">
    <div class="card-image-container">
      <img
        :src="review.attributes.imageUrl"
        :alt="review.attributes.title"
        class="card-image"
      />
      <div class="card-overlay"></div>
      <div class="rating-badge">
        <span class="rating-star">★</span>
        <span class="rating-value">{{ review.attributes.rating }}</span>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ review.attributes.title }}</h3>
      <div class="card-meta">
        <span class="meta-year">{{ review.attributes.releaseYear }}</span>
        <span class="meta-separator">•</span>
        <span class="meta-genre">{{ review.attributes.genre }}</span>
      </div>
      <p class="card-description">{{ truncateDescription(review.attributes.description) }}</p>
      <div class="card-footer">
        <span class="director-label">Directed by</span>
        <span class="director-name">{{ review.attributes.director }}</span>
      </div>
    </div>
  </router-link>
</template>
<script setup>
defineProps({
  review: {
    type: Object,
    required: true
  }
})
const truncateDescription = (text) => {
  return text.length > 120 ? text.substring(0, 120) + '...' : text
}
</script>
<style scoped>
.review-card {
  display: block;
  background: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: all 0.4s ease;
  animation: cardSlideIn 0.6s ease both;
}
.review-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-accent);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
}
.card-image-container {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.review-card:hover .card-image {
  transform: scale(1.08);
}
.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    var(--color-card) 0%,
    transparent 50%
  );
  opacity: 0.8;
}
.rating-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.85rem;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid var(--color-accent);
}
.rating-star {
  color: var(--color-accent);
  font-size: 1rem;
}
.rating-value {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-text);
  font-family: var(--font-display);
}
.card-content {
  padding: 1.5rem;
}
.card-title {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 0.75rem;
  line-height: 1.3;
  transition: color 0.3s ease;
}
.review-card:hover .card-title {
  color: var(--color-accent);
}
.card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}
.meta-year,
.meta-genre {
  font-weight: 600;
}
.meta-separator {
  color: var(--color-accent);
}
.card-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
}
.card-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.director-label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}
.director-name {
  font-size: 1.05rem;
  color: var(--color-accent);
  font-weight: 600;
}
@keyframes cardSlideIn {
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
  .card-image-container {
    height: 240px;
  }
  .card-title {
    font-size: 1.35rem;
  }
  .card-description {
    font-size: 0.95rem;
  }
}
</style>