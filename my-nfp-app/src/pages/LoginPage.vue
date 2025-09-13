<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h2 class="text-center mb-4">User Login</h2>

    <!-- Login Form -->
    <form @submit.prevent="handleLogin">
      <!-- Email -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          v-model="form.email"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
          required
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          type="password"
          v-model="form.password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
          required
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <!-- Login Button -->
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>

    <!-- Switch to Register -->
    <p class="mt-3 text-center">
      Don't have an account?
      <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<script setup>
import { sanitizeInput } from "../utils/sanitize.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const handleLogin = () => {
  errors.email = "";
  errors.password = "";

  //  Sanitize input before use
  const email = sanitizeInput(form.email);
  const password = sanitizeInput(form.password);

  //  Validate email
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format";
  }

  //  Validate password
  if (!password) {
    errors.password = "Password is required";
  }

  if (!errors.email && !errors.password) {
    //  Load registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    //  Match with sanitized input
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    //  Save current user session
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert(`Login successful! Role: ${user.role}`);

    // Notify navbar to refresh admin visibility immediately
    window.dispatchEvent(new Event("user-logged-in"));

    //  Redirect to home (not directly to admin)
    router.push("/home");
  }
};
</script>


