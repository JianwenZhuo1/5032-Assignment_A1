<template>
  <div class="container mt-5 text-center">
    <!-- Welcome Heading -->
    <h1 class="mb-3">Welcome to the Support Page</h1>

    <!-- Subtext -->
    <p class="lead">
      We are here to support your mental health and wellbeing.
      You can find resources, crisis helplines, and local services here.
    </p>

    <!-- Placeholder for future features -->
    <div class="mt-5">
      <h4>🔹 Coming Soon:</h4>
      <ul class="list-unstyled">
        <li>📞 Crisis Helpline</li>
        <li>🗺️ Service Finder Map</li>
        <li>🤖 FAQ Chatbot</li>
      </ul>
    </div>

    <!-- Back to Home -->
    <router-link to="/home" class="btn btn-primary mt-4">
      Back to Home
    </router-link>
  </div>
</template>

<script setup>
// No script needed yet (static welcome page)
</script>

<style>
.container {
  max-width: 800px;
}
</style>
