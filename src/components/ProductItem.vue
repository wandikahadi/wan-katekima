<script setup lang="ts">
import { defineProps } from "vue";
import type { Product } from "@/stores/productStore";

// Menerima props dari parent
defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="border p-4 rounded-lg shadow-md bg-white">
    <h3 class="font-semibold text-lg">{{ product.title }}</h3>
    <p class="text-gray-700">Rp{{ product.price }}</p>
  </div>
</template>
