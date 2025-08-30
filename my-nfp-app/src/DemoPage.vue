<template>
  <div class="container mt-4">
    <!-- Title -->
    <h2 class="mb-3">Feedback Form & Resource List</h2>

    <!-- Form Validation Example -->
    <form @submit.prevent="handleSubmit" class="mb-4">
      <!-- Name -->
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          required
        />
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>

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

      <!-- Feedback -->
      <div class="mb-3">
        <label for="feedback" class="form-label">Feedback</label>
        <textarea
          id="feedback"
          v-model="form.feedback"
          class="form-control"
          rows="3"
          required
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <!-- Dynamic Data: Feedback List -->
    <h3>User Feedback (Loaded from Local Storage)</h3>
    <ul class="list-group">
      <li
        v-for="(item, index) in feedbackList"
        :key="index"
        class="list-group-item"
      >
        <strong>{{ item.name }}</strong> ({{ item.email }}): {{ item.feedback }}
      </li>
    </ul>

    <!-- Dynamic Data: Resources -->
    <h3 class="mt-4">Recommended Resources (Dynamic Rendering)</h3>
    <div class="row">
      <div
        v-for="res in resources"
        :key="res.id"
        class="col-md-4 col-sm-6 mb-3"
      >
        <div class="card p-2">
          <h5>{{ res.title }}</h5>
          <p>Type: {{ res.type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";

// Form data
const form = reactive({
  name: "",
  email: "",
  feedback: "",
});

// Error messages
const errors = reactive({
  name: "",
  email: "",
});

// Feedback list (dynamic data from Local Storage)
const feedbackList = ref([]);

// Recommended resources (mock JSON data)
const resources = [
  { id: 1, title: "How to Manage Anxiety", type: "Article" },
  { id: 2, title: "Stress Relief Techniques", type: "Video" },
  { id: 3, title: "Youth Mental Health Guide", type: "Guide" },
];

// Load Local Storage data on page mount
onMounted(() => {
  const saved = JSON.parse(localStorage.getItem("feedbackList"));
  if (saved) feedbackList.value = saved;
});

// Handle form submission
const handleSubmit = () => {
  // Simple validation
  errors.name = form.name ? "" : "Name cannot be empty";
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ""
    : "Please enter a valid email";

  if (errors.name || errors.email) return;

  // Save data to list and Local Storage
  feedbackList.value.push({ ...form });
  localStorage.setItem("feedbackList", JSON.stringify(feedbackList.value));

  // Clear form fields
  form.name = "";
  form.email = "";
  form.feedback = "";
};
</script>

<style>
.container {
  max-width: 800px;
}
</style>
