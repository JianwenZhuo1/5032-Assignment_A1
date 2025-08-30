<template>
  <div class="container-fluid p-0">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">NFP Mental Health</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li v-for="link in navLinks" :key="link" class="nav-item">
              <a class="nav-link" href="#">{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Banner -->
    <div class="hero-banner text-center text-white d-flex flex-column justify-content-center align-items-center">
      <h1>Youth Mental Health & Wellbeing</h1>
      <p class="lead">Accessible, Safe, and Reliable Support for Everyone</p>
      
      <!-- Jump to Support Page -->
      <router-link to="/support" class="btn btn-light">
        Get Help Now
      </router-link>
    </div>


    <!-- Fixed Row of Resources -->
    <div class="resource-row">
      <div class="resource-card mx-2">
        <h5>Managing Anxiety</h5>
        <p>Type: Article</p>
        <router-link to="/resources/anxiety" class="btn btn-primary mt-2">Learn More</router-link>
      </div>

      <div class="resource-card mx-2">
        <h5>Stress Relief Techniques</h5>
        <p>Type: Video</p>
        <router-link to="/resources/stress" class="btn btn-primary mt-2">Learn More</router-link>
      </div>

      <div class="resource-card mx-2">
        <h5>Youth Wellbeing Guide</h5>
        <p>Type: Guide</p>
        <router-link to="/resources/wellbeing" class="btn btn-primary mt-2">Learn More</router-link>
      </div>
    </div>


    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-5">
      <p>&copy; 2025 Youth Mental Health NFP | Contact us: ...@...</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Navigation links
const navLinks = [
  "About Us",
  "Resources",
  "Support",
  "Get Involved",
  "Contact",
];

// Fixed resource cards
const resources = ref([
  { id: 1, title: "Managing Anxiety", type: "Article" },
  { id: 2, title: "Stress Relief Techniques", type: "Video" },
  { id: 3, title: "Youth Wellbeing Guide", type: "Guide" },
]);
</script>

<style>
/* Hero Banner */
.hero-banner {
  height: 50vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") 
    center/cover no-repeat;
}

/* Fixed Row Layout */
.resource-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap; /* Prevent wrapping */
}

.resource-card {
  flex: 0 0 32%; /* Fixed 3 columns */
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-sizing: border-box;
}
</style>
