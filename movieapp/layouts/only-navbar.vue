<template>
  <div>
    <client-only>
      <Navbar design="default" />
      <nuxt />
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

<style></style>
