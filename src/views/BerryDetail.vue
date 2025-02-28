<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const berryName = route.params.name as string;
const berryDetail = ref<any>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/berry/${berryName}`);
    berryDetail.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch berry details';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto p-4">
    <p v-if="loading" class="text-gray-600">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <div v-if="berryDetail" class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-2 capitalize">{{ berryDetail.name }} Berry</h2>
      <p class="text-gray-700"><strong>Firmness:</strong> {{ berryDetail.firmness.name }}</p>
      <p class="text-gray-700"><strong>Growth Time:</strong> {{ berryDetail.growth_time }} days</p>
      <p class="text-gray-700"><strong>Max Harvest:</strong> {{ berryDetail.max_harvest }}</p>
      <p class="text-gray-700"><strong>Size:</strong> {{ berryDetail.size }} mm</p>
      <p class="text-gray-700"><strong>Natural Gift Power:</strong> {{ berryDetail.natural_gift_power }}</p>
      <p class="text-gray-700"><strong>Natural Gift Type:</strong> {{ berryDetail.natural_gift_type.name }}</p>
      <p class="text-gray-700"><strong>Soil Dryness:</strong> {{ berryDetail.soil_dryness }}</p>
      <p class="text-gray-700"><strong>Smoothness:</strong> {{ berryDetail.smoothness }}</p>
      <h3 class="text-xl font-semibold mt-4">Flavors:</h3>
      <ul class="list-disc pl-5">
        <li v-for="flavor in berryDetail.flavors" :key="flavor.flavor.name" class="text-gray-600">
          {{ flavor.flavor.name }} (Potency: {{ flavor.potency }})
        </li>
      </ul>
      <a :href="berryDetail.item.url" target="_blank" class="block mt-4 text-blue-500 hover:underline">
        View Item: {{ berryDetail.item.name }}
      </a>
    </div>
  </div>
</template>

