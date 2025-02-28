<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const id = route.params.id as string;
const product = ref<any>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    product.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch berry details';
  } finally {
    loading.value = false;
  }
});
</script>
<template>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
  <div v-if="product" class="p-4 border rounded shadow-md max-w-lg mx-auto">
    <button @click="$router.push('/products')" class="mb-4 p-2 bg-gray-200">⬅ Back</button>
    <img :src="product.image" alt="Product Image" class="w-full h-64 object-cover mb-4">
    <h1 class="text-2xl font-bold">{{ product.title }}</h1>
    <p class="text-gray-700 mt-2">Category: {{ product.category }}</p>
    <p class="text-lg text-green-600 font-semibold mt-2">${{ product.price }}</p>
    <p class="mt-4">{{ product.description }}</p>
    <div class="mt-4">
      <span class="font-semibold">Rating:</span> {{ product.rating.rate }} ({{ product.rating.count }} reviews)
    </div>
  </div>
</template>
