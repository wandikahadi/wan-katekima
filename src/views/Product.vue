
<template>
  <div>
    <h2 class="text-2xl font-bold">Product</h2>
        <button @click="$router.push('/products/add')"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
    >
      Tambah Data
    </button>
        <Suspense>
      <!-- Komponen utama -->
      <template #default>
        
        <ProductList />
      </template>

      <!-- Placeholder loading -->
      <template #fallback>
        <p>Memuat produk...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const goToAddProduct = () => {
  router.push("/products/add");
};

// Lazy load komponen
const ProductList = defineAsyncComponent(() => import("@/components/ProductList.vue"));
</script>