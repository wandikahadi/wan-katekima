<template>
  <div class="bg-blue-500 text-white p-4 flex justify-between">
    <div>
    </div>
    <select v-model="language" @change="changeLanguage">
      <option value="id">Indonesian</option>
      <option value="en">English</option>
    </select>
  </div>
</template>