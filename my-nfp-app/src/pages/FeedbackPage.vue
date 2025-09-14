<template>
  <div class="container mt-5" style="max-width: 600px;">
    <h2 class="text-center mb-4">Feedback</h2>

    <!-- Feedback Form -->
    <form @submit.prevent="handleSubmit">
      <!-- Name -->
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
          type="text"
          v-model="form.name"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          required
        />
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>

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

      <!-- Feedback -->
      <div class="mb-3">
        <label class="form-label">Feedback</label>
        <textarea
          v-model="form.feedback"
          class="form-control"
          rows="3"
          :class="{ 'is-invalid': errors.feedback }"
          required
        ></textarea>
        <div class="invalid-feedback">{{ errors.feedback }}</div>
      </div>

      <!-- Rating -->
      <div class="rating-container text-center mb-3">
        <h5>Rate Our Website</h5>
        <div class="stars">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ active: star <= selected }"
            @click="setRating(star)"
          >
            ★
          </span>
        </div>
        <p class="mt-2">
          Average Rating: <strong>{{ average.toFixed(1) }}</strong> ★
          ({{ ratings.length }} ratings)
        </p>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-primary w-100">Submit Feedback</button>
    </form>

    <!-- Feedback List -->
    <div class="mt-5">
      <h4>Previous Feedback</h4>
      <ul class="list-group">
        <li v-for="(item, index) in feedbackList" :key="index" class="list-group-item">
          <strong>{{ item.name }}</strong> ({{ item.email }})<br />
          {{ item.feedback }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { sanitizeInput } from "../utils/sanitize.js"; 

const form = reactive({
  name: "",
  email: "",
  feedback: "",
});

const errors = reactive({
  name: "",
  email: "",
  feedback: "",
});

const feedbackList = ref([]);
const ratings = ref([]);
const selected = ref(0);

const feedbackKey = "feedbacks";
const ratingKey = "ratings_feedback";

// Load and normalize data when page loads
onMounted(() => {
  feedbackList.value = JSON.parse(localStorage.getItem(feedbackKey)) || [];

  let storedRatings = JSON.parse(localStorage.getItem(ratingKey)) || [];

  // Normalize old ratings (if they were stored as numbers)
  storedRatings = storedRatings.map((r) => {
    if (typeof r === "number") {
      return { email: "unknown", score: r };
    }
    return r;
  });

  ratings.value = storedRatings;
  localStorage.setItem(ratingKey, JSON.stringify(ratings.value));
});

// Handle feedback form submission
const handleSubmit = () => {
  errors.name = "";
  errors.email = "";
  errors.feedback = "";

  const safeName = sanitizeInput(form.name);
  const safeEmail = sanitizeInput(form.email);
  const safeFeedback = sanitizeInput(form.feedback);

  // Validation
  if (!safeName) errors.name = "Name is required";
  if (!safeEmail) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    errors.email = "Invalid email format";
  }
  if (!safeFeedback) errors.feedback = "Feedback is required";

  if (!errors.name && !errors.email && !errors.feedback) {
    feedbackList.value.push({
      name: safeName,
      email: safeEmail,
      feedback: safeFeedback,
    });
    localStorage.setItem(feedbackKey, JSON.stringify(feedbackList.value));

    alert("Thank you for your feedback!");

    // Reset form
    form.name = "";
    form.email = "";
    form.feedback = "";
  }
};

// Add rating (only once per user)
const setRating = (value) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("You must be logged in to rate.");
    return;
  }

  // Check if this user already rated
  if (ratings.value.some((r) => r.email === currentUser.email)) {
    alert("You have already rated!");
    return;
  }

  ratings.value.push({
    email: sanitizeInput(currentUser.email),
    score: Number(value),
  });
  localStorage.setItem(ratingKey, JSON.stringify(ratings.value));

  selected.value = value;
  alert(`Thanks for rating ${value} ★`);
};

// Compute average rating (safe for old + new format)
const average = computed(() => {
  if (ratings.value.length === 0) return 0;
  const sum = ratings.value.reduce((a, b) => {
    if (typeof b === "number") return a + b; // old format
    if (b && typeof b.score === "number") return a + b.score;
    return a;
  }, 0);
  return sum / ratings.value.length;
});
</script>

<style scoped>
.stars {
  cursor: pointer;
  font-size: 1.5rem;
}
.star {
  color: #ccc;
  margin: 0 5px;
}
.star.active {
  color: gold;
}
</style>
