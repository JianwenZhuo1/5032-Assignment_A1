<template>
  <div class="container mt-4">
    <h2>User Feedback</h2>

    <!-- Feedback Form -->
    <form @submit.prevent="handleSubmit" class="mb-4">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="form.name" type="text"
               class="form-control"
               :class="{ 'is-invalid': errors.name }"/>
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="form.email" type="email"
               class="form-control"
               :class="{ 'is-invalid': errors.email }"/>
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Feedback</label>
        <textarea v-model="form.feedback" class="form-control" rows="3"></textarea>
      </div>

      <button class="btn btn-primary" type="submit">Submit</button>
    </form>

    <!-- Feedback List -->
    <h3>Feedback List</h3>
    <ul class="list-group">
      <li v-for="(item, index) in feedbackList" :key="index" class="list-group-item">
        <strong>{{ item.name }}</strong> ({{ item.email }}): {{ item.feedback }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";

// Form data
const form = reactive({ name: "", email: "", feedback: "" });
const errors = reactive({ name: "", email: "" });

// Feedback list
const feedbackList = ref([]);

// Load from Local Storage
onMounted(() => {
  const saved = JSON.parse(localStorage.getItem("feedbackList"));
  if (saved) feedbackList.value = saved;
});

// Submit
const handleSubmit = () => {
  // Validations
  errors.name = form.name ? "" : "Name is required";
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ""
    : "Invalid email format";

  if (errors.name || errors.email) return;

  // Save data
  feedbackList.value.push({ ...form });
  localStorage.setItem("feedbackList", JSON.stringify(feedbackList.value));

  // Clear form
  form.name = "";
  form.email = "";
  form.feedback = "";
};
</script>
