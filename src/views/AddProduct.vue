<template>
  <div>
    <h1 class="text-2xl font-bold">Add Product</h1>
    <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
      <div>
        <label class="block font-semibold">Title</label>
        <input v-model="form.title" type="text" class="border p-2 w-full" required />
      </div>
      <div>
        <label class="block font-semibold">Price</label>
        <input v-model.number="form.price" type="number" class="border p-2 w-full" required />
      </div>
      <div>
        <label class="block font-semibold">Description</label>
        <textarea v-model="form.description" class="border p-2 w-full" required></textarea>
      </div>
      <div>
        <label class="block font-semibold">Category</label>
        <input v-model="form.category" type="text" class="border p-2 w-full" required />
      </div>
      <div>
        <label class="block font-semibold">Image URL</label>
        <input v-model="form.image" type="text" class="border p-2 w-full" required />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Add Product</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useRouter } from 'vue-router';

const store = useProductStore();
const router = useRouter();

const form = ref({
  title: '',
  price: 0,
  description: '',
  category: '',
  image: ''
});

const handleSubmit = async () => {
  await store.addProduct(form.value);
  router.push('/');
};
</script>