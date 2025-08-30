<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h2 class="text-center mb-4">User Login</h2>

    <!-- Login Form -->
    <form @submit.prevent="handleLogin">
      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
          required
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
          required
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>

    <!-- Debug Info (optional, for testing) -->
    <div class="mt-4">
      <p><strong>Entered Email:</strong> {{ form.email }}</p>
      <p><strong>Entered Password:</strong> {{ form.password }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// Form data
const form = reactive({
  email: "",
  password: "",
});

// Error messages
const errors = reactive({
  email: "",
  password: "",
});

// Handle login validation
const handleLogin = () => {
  // Reset errors
  errors.email = "";
  errors.password = "";

  // Email validation
  if (!form.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email format";
  }

  // Password validation
  if (!form.password) {
    errors.password = "Password is required";
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(form.password)) {
    errors.password = "Password must contain letters and numbers";
  }

  // If no errors, simulate login success
  if (!errors.email && !errors.password) {
    alert("Login successful!");
  }
};
</script>

<style>
.container {
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
</style>
