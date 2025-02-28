<template>
  <div>
    <h1 class="text-2xl font-bold">Product List</h1>
        <input
      v-model="store.searchQuery"
      type="text"
      placeholder="Search products..."
      class="border p-2 w-full mt-2 mb-4"
    />
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <table class="table-auto w-full border-collapse border border-gray-300 mt-4">
      <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">No</th>
          <th class="border p-2 cursor-pointer" @click="toggleSort">
            Title
            <span v-if="store.sortDirection === 'asc'">🔼</span>
            <span v-else>🔽</span>
          </th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in paginatedProducts" :key="product.id">
          <td class="border p-2"> {{ (store.currentPage - 1) * perPage + index + 1 }}</td>
          <td class="border p-2">
             <router-link :to="`/products/${product.id}`" class="text-blue-500 mr-2">
            {{ product.title }}
            </router-link>
          </td>
          <td class="border p-2">
            <router-link :to="`/products/edit/${product.id}`" class="text-yellow-500 mr-2">Edit</router-link>
            <button @click="deleteProduct(product.id)" class="text-red-500">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
      <div class="mt-4 flex justify-center space-x-2">
        <button @click="prevPage" :disabled="store.currentPage === 1" class="px-4 py-2 border bg-gray-200 cursor-pointer">&lt;</button>
        <span class="px-4 py-2">Page {{ store.currentPage }} of {{ store.totalPages }}</span>
        <button @click="nextPage" :disabled="store.currentPage === store.totalPages" class="px-4 py-2 border bg-gray-200 cursor-pointer">&gt;</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/productStore';

const store = useProductStore();
const { loading, error, fetchProducts, deleteProduct, totalPages, setPage, currentPage, perPage, nextPage, prevPage } = store;

const paginatedProducts = computed(() => store.paginatedProducts);

const toggleSort = () => {
  store.toggleSortDirection();
};

onMounted(fetchProducts);
</script>