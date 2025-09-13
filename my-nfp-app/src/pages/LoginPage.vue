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

  // Validate email
  if (!form.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email format";
  }

  // Validate password
  if (!form.password) {
    errors.password = "Password is required";
  }

  if (!errors.email && !errors.password) {
    // Load all registered users from Local Storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Try to find matching user
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // Save logged-in user to Local Storage as current session
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert(`Login successful! Role: ${user.role}`);

    // After login, always redirect to home (not directly to admin)
    router.push("/home");
  }
};
</script>

