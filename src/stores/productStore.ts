import { defineStore } from 'pinia';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    perPage: 10,
    sortDirection: 'asc',
    searchQuery: ''
  }),
  getters: {
    filteredProducts(state) {
      return state.products.filter(product =>
        product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    sortedProducts(state) {
      return [...state.filteredProducts].sort((a, b) => {
        return state.sortDirection === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      });
    },
    paginatedProducts(state) {
      const start = (state.currentPage - 1) * state.perPage;
      return state.sortedProducts.slice(start, start + state.perPage);
    },
    totalPages(state) {
      return Math.ceil(state.filteredProducts.length / state.perPage);
    }
  },
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        this.products = response.data;
      } catch (error) {
        this.error = 'Failed to fetch products';
      } finally {
        this.loading = false;
      }
    },
    setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    toggleSortDirection() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.currentPage = 1; // Reset ke halaman pertama saat pencarian
    },
    async fetchProduct(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
        return response.data;
      } catch (error) {
        this.error = 'Failed to fetch product';
      } finally {
        this.loading = false;
      }
    },
    async addProduct(product: Omit<Product, 'id'>) {
      try {
        const response = await axios.post<Product>('https://fakestoreapi.com/products', product);
        this.products.push(response.data);
      } catch (error) {
        this.error = 'Failed to add product';
      }
    },
    async updateProduct(id: number, updatedProduct: Omit<Product, 'id'>) {
      try {
        const response = await axios.put<Product>(`https://fakestoreapi.com/products/${id}`, updatedProduct);
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }
      } catch (error) {
        this.error = 'Failed to update product';
      }
    },
    async deleteProduct(id: number) {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${id}`);
        this.products = this.products.filter(product => product.id !== id);
      } catch (error) {
        this.error = 'Failed to delete product';
      }
    }
  }
});