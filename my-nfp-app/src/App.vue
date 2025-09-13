<template>
  <div>
    <!--  Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">NFP WebApp</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <!--  Always visible links -->
            <li class="nav-item">
              <router-link class="nav-link" to="/home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/feedback">Feedback</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link" to="/admin">Admin</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isAdmin = ref(false);

//  Check current user role when app loads
onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && currentUser.role === "admin") {
    isAdmin.value = true; 
  }
});
</script>
