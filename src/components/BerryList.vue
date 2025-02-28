<script setup lang="ts">
import { onMounted } from 'vue';
import { useBerryStore } from '../stores/berryStore';

const berryStore = useBerryStore();

onMounted(() => {
  berryStore.fetchBerries();
});
</script>

<template>
  <div>
    <p v-if="berryStore.loading">Loading...</p>
    <p v-if="berryStore.error">{{ berryStore.error }}</p>
    <table v-if="!berryStore.loading && !berryStore.error">
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="berry in berryStore.berries" :key="berry.name">
          <td>{{ berry.name }}</td>
          <td>
            <button @click="berryStore.selectBerry(berry)">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="berryStore.selectedBerry">
      <h3>Berry Details</h3>
      <p>Name: {{ berryStore.selectedBerry.name }}</p>
      <p>URL: <a :href="berryStore.selectedBerry.url" target="_blank">{{ berryStore.selectedBerry.url }}</a></p>
    </div>
  </div>
</template>