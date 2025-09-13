<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Admin Dashboard</h2>

    <!-- Feedback Section -->
    <div class="mb-5">
      <h4>User Feedback</h4>
      <ul class="list-group">
        <li v-for="(item, index) in feedbackList" :key="index" class="list-group-item">
          <strong>{{ item.name }}</strong> ({{ item.email }})<br />
          {{ item.feedback }}
        </li>
      </ul>
      <p v-if="feedbackList.length === 0" class="text-muted">No feedback submitted yet.</p>
    </div>

    <!-- Ratings Section -->
    <div>
      <h4>User Ratings</h4>
      <ul class="list-group">
        <li v-for="(item, index) in ratings" :key="index" class="list-group-item">
          <strong>{{ item.email }}</strong> → {{ item.score }} ★
        </li>
      </ul>
      <p v-if="ratings.length === 0" class="text-muted">No ratings submitted yet.</p>

      <p class="mt-3">
        <strong>Average Rating:</strong> {{ average.toFixed(1) }} ★ ({{ ratings.length }} ratings)
      </p>
    </div>

  </div>
</template> 

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const feedbackList = ref([]);
const ratings = ref([]);

const feedbackKey = "feedbacks";
const ratingKey = "ratings_feedback";

// Load data from Local Storage
onMounted(() => {
  feedbackList.value = JSON.parse(localStorage.getItem(feedbackKey)) || [];
  ratings.value = JSON.parse(localStorage.getItem(ratingKey)) || [];
});

// Compute average rating
const average = computed(() => {
  if (ratings.value.length === 0) return 0;
  const sum = ratings.value.reduce((a, b) => {
    if (typeof b === "number") return a + b;
    if (b && typeof b.score === "number") return a + b.score;
    return a;
  }, 0);
  return sum / ratings.value.length;
});

</script>
