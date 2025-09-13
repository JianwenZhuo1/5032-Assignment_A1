<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">NFP WebApp</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <!-- Always visible links -->
            <li class="nav-item">
              <router-link class="nav-link" to="/home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/feedback">Feedback</router-link>
            </li>

            <!-- Show Login when not logged in -->
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>

            <!-- Show Logout when logged in -->
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" href="#" @click="handleLogout">Logout</a>
            </li>

            <!-- Admin link (visible only if user is admin) -->
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link" to="/admin">Admin</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Render current route -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isAdmin = ref(false);
const isLoggedIn = ref(false);

/** Helper: update login + admin flags */
const updateFlags = () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    isLoggedIn.value = !!currentUser;
    isAdmin.value = !!(currentUser && currentUser.role === "admin");
  } catch {
    isLoggedIn.value = false;
    isAdmin.value = false;
  }
};

/** Logout function */
const handleLogout = () => {
  localStorage.removeItem("currentUser");
  updateFlags();
  // Notify other components
  window.dispatchEvent(new Event("user-logged-out"));
  // Redirect to login page
  router.push("/login");
};

/** Event listeners */
const onUserLoggedIn = () => updateFlags();
const onUserLoggedOut = () => updateFlags();
const onStorage = (e) => {
  if (e.key === "currentUser") updateFlags();
};

onMounted(() => {
  updateFlags();
  window.addEventListener("user-logged-in", onUserLoggedIn);
  window.addEventListener("user-logged-out", onUserLoggedOut);
  window.addEventListener("storage", onStorage);
});

onBeforeUnmount(() => {
  window.removeEventListener("user-logged-in", onUserLoggedIn);
  window.removeEventListener("user-logged-out", onUserLoggedOut);
  window.removeEventListener("storage", onStorage);
});
</script>
