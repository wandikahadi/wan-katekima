import { defineStore } from 'pinia';
import axios from 'axios';

interface Berry {
  name: string;
  url: string;
}

interface BerryState {
  berries: Berry[];
  loading: boolean;
  error: string | null;
}

export const useBerryStore = defineStore('berry', {
  state: (): BerryState => ({
    berries: [],
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 5,
    sortDirection: 'asc'
  }),
  getters: {
    sortedBerries(state) {
      return [...state.berries].sort((a, b) => {
        return state.sortDirection === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      });
    },
    paginatedBerries(state) {
      const start = (state.currentPage - 1) * state.perPage;
      return state.sortedBerries.slice(start, start + state.perPage);
    },
    totalPages(state) {
      return Math.ceil(state.berries.length / state.perPage);
    }
  },
  actions: {
    async fetchBerries() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/berry/');
        this.berries = response.data.results;
      } catch (error) {
        this.error = 'Failed to fetch berries';
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
  },
});