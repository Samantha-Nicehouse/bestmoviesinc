<template>
  <div class="app">
    <client-only>
      <Navbar design="default" />
      <Nuxt />
    </client-only>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    Navbar,
  },
}
</script>
