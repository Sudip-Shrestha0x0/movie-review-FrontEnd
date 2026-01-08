<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <span class="logo-icon">◆</span>
          <span class="logo-text">Cinema Vault</span>
        </router-link>
        <nav class="nav">
          <router-link to="/" class="nav-link">Reviews</router-link>
        </nav>
      </div>
    </div>
    <div class="header-border"></div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background: var(--color-dark);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.logo:hover {
  color: var(--color-accent);
}

.logo-icon {
  font-size: 1.2rem;
  color: var(--color-accent);
}

.logo-text {
  position: relative;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: var(--color-accent);
}

.nav-link.router-link-active::after {
  width: 100%;
}

.header-border {
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

@media (max-width: 768px) {
  .header-content {
    padding: 1.25rem 0;
  }

  .logo {
    font-size: 1.25rem;
  }

  .nav {
    gap: 1.5rem;
  }

  .nav-link {
    font-size: 0.95rem;
  }
}
</style>