<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h2 class="text-center mb-4">User Registration</h2>

    <!-- Register Form -->
    <form @submit.prevent="handleRegister">
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

      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="form-label">Confirm Password</label>
        <input
          type="password"
          v-model="form.confirmPassword"
          class="form-control"
          :class="{ 'is-invalid': errors.confirmPassword }"
          required
        />
        <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
      </div>

      <!-- Register Button -->
      <button type="submit" class="btn btn-success w-100">Register</button>
    </form>

    <!-- Switch to Login -->
    <p class="mt-3 text-center">
      Already have an account?
      <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";  // import router

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

// Handle register validation
const handleRegister = () => {
  errors.email = "";
  errors.password = "";
  errors.confirmPassword = "";

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

  // Confirm password validation
  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  // If all validations pass
  if (!errors.email && !errors.password && !errors.confirmPassword) {
    alert("Registration successful! Redirecting to login...");
    router.push("/login");  // ✅ redirect to LoginPage
  }
};
</script>
