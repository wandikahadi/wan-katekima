<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Navbar />

      <!-- Konten akan berubah sesuai halaman -->
      <div class="flex-1 p-4">
        <RouterView />
      </div>

      <Footer />
    </div>
  </div>
</template>

<style scoped>
@import "tailwindcss";
</style>
