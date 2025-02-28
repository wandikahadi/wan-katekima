<script setup lang="ts">
import { onMounted } from 'vue';
import { useBerryStore, computed } from '../stores/berryStore';
import { useRouter } from 'vue-router';

const berryStore = useBerryStore();
const router = useRouter();


const { loading, error, fetchBerries, totalPages, setPage, currentPage, perPage, nextPage, prevPage } = berryStore;

// const paginatedBerries = computed(() => berryStore.paginatedBerries);

const toggleSort = () => {
  berryStore.toggleSortDirection();
};

onMounted(() => {
  fetchBerries();
});

const goToDetail = (name: string) => {
  router.push(`/berry/${name}`);
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Berry List</h1>
    <p v-if="berryStore.loading" class="text-gray-600">Loading...</p>
    <p v-if="berryStore.error" class="text-red-500">{{ berryStore.error }}</p>
    <table v-if="!berryStore.loading && !berryStore.error" class="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">No</th>
          <th class="border p-2 cursor-pointer" @click="toggleSort">
            Name
            <span v-if="berryStore.sortDirection === 'asc'">🔼</span>
            <span v-else>🔽</span>
          </th>
          <th class="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(berry, index) in berryStore.berries" :key="berry.name" class="hover:bg-gray-50">
          <td class="border p-2">{{ index }}</td>
          <td class="border p-2">{{ berry.name }}</td>
          <td class="border p-2">
            <button @click="goToDetail(berry.name)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="mt-4 flex justify-center space-x-2">
        <button @click="prevPage" :disabled="store.currentPage === 1" class="px-4 py-2 border bg-gray-200 cursor-pointer">&lt;</button>
        <span class="px-4 py-2">Page {{ store.currentPage }} of {{ store.totalPages }}</span>
        <button @click="nextPage" :disabled="store.currentPage === store.totalPages" class="px-4 py-2 border bg-gray-200 cursor-pointer">&gt;</button>
    </div> -->
  </div>
</template>