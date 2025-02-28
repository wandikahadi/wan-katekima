<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useRouter, useRoute } from "vue-router";

const productStore = useProductStore();
const router = useRouter();
const route = useRoute();

const productId = Number(route.params.id);
const product = ref({ title: "", price: "", description: "" });

onMounted(() => {
  const existingProduct = productStore.products.find((p) => p.id === productId);
  if (existingProduct) {
    product.value = { ...existingProduct };
  }
});

const handleUpdate = async () => {
  await productStore.updateProduct(productId, product.value);
  router.push("/dashboard");
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold">Edit Produk</h2>
    
    <form @submit.prevent="handleUpdate">
      <label class="block">Nama Produk</label>
      <input v-model="product.title" class="border p-2 w-full mb-2" required />

      <label class="block">Harga</label>
      <input v-model="product.price" type="number" class="border p-2 w-full mb-2" required />

      <label class="block">Deskripsi</label>
      <textarea v-model="product.description" class="border p-2 w-full mb-2"></textarea>

      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>
