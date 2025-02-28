<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
    <div class="flex justify-center items-center p-3 mt-2">
      <h1 class="text-xl">Wan Katekima</h1>
    </div>
    <nav class="mt-10">
      <router-link 
        to="/products"
        class="block py-3 px-4 rounded-lg transition"
        :class="{ 'bg-blue-500 text-white': route.path === '/products', 'hover:bg-gray-700': route.path !== '/products' }"
      >
        Product
      </router-link>
      <router-link 
        to="/berry"
        class="block py-3 px-4 rounded-lg transition"
        :class="{ 'bg-blue-500 text-white': route.path === '/berry', 'hover:bg-gray-700': route.path !== '/berry' }"
      >
        Berry
      </router-link>

      <router-link 
        to="/profile"
        class="block py-3 px-4 rounded-lg transition"
        :class="{ 'bg-blue-500 text-white': route.path === '/profile', 'hover:bg-gray-700': route.path !== '/profile' }"
      >
        Profile
      </router-link>
    </nav>
  </div>
</template>
