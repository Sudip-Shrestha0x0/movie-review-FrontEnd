<template>
  <footer class="footer">
    <div class="footer-border"></div>
    <div class="container">
      <div class="footer-content">
        <p class="footer-text">
          <span class="footer-icon">◆</span>
          Cinema Vault {{ currentYear }}
        </p>
        <p class="footer-tagline">Curated reviews for discerning viewers</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: var(--color-dark);
  margin-top: auto;
}

.footer-border {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-accent) 20%,
    var(--color-accent) 80%,
    transparent
  );
  opacity: 0.5;
}

.footer-content {
  padding: 2.5rem 0;
  text-align: center;
}

.footer-text {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.footer-icon {
  color: var(--color-accent);
  font-size: 0.9rem;
}

.footer-tagline {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  font-style: italic;
}

@media (max-width: 768px) {
  .footer-content {
    padding: 2rem 0;
  }

  .footer-text {
    font-size: 1rem;
  }

  .footer-tagline {
    font-size: 0.9rem;
  }
}
</style>