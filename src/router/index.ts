import { createRouter, createWebHistory } from 'vue-router';
import Profile from '@/views/Profile.vue';
import Product from '@/views/Product.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import AddProduct from '@/views/AddProduct.vue';
import BerryList from '../views/BerryList.vue';
import BerryDetail from '../views/BerryDetail.vue';

const routes = [
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/products', component: Product },
  { path: '/products/:id', component: ProductDetail, props: true },
  { path: '/products/add', component: AddProduct },
  { path: '/berry', component: BerryList },
  { path: '/berry/:name', component: BerryDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
