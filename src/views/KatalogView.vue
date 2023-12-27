<script>
import Cart from '../components/ShoppingCart.vue';
import { useProductStore } from '@/stores/productStore';
export default {
  data() {
    return {
      products: [],
      searchTerm: '',
      orderQuantity: {},
    }
  },
  components: {
    Cart,
  },
  computed: {
    filteredBooks() {
      if (this.searchTerm === '') {
        return this.books;
      } else {
        return this.books.filter(book =>
          book.Produkttitel.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          book.Autorname.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    }
  },
  methods: {
    fetchData() {
      const productStore = useProductStore();
      console.log("Start fetch ...");
      fetch("http://localhost/api/fetch_books.php")
        .then((response) => response.json())
        .then((data) => {
          console.log("Data from fetch: ", data);
          this.products = data;
          productStore.setProducts(data);
        });
      this.initializeOrderQuantity();
    },
    isMatch(product) {
      if (this.searchTerm === '') {
        return false;
      } else {
        return product.Produkttitel.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.Autorname.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
    },
    initializeOrderQuantity() {
      for (let product of this.products) {
        this.orderQuantity[product.ProduktID] = 0;
      }
    },
    increaseOrderQuantity(product) {
      if (!this.orderQuantity[product.ProduktID]) {
        this.orderQuantity[product.ProduktID] = 0;
      }
      this.orderQuantity[product.ProduktID]++;
    },
    decreaseOrderQuantity(product) {
      if (this.orderQuantity[product.ProduktID] > 0) {
        this.orderQuantity[product.ProduktID]--;
      }
    },
    resetOrderQuantity(product) {
      this.orderQuantity[product.ProduktID] = 0;
    },
  }, // methods lists end
  // live cycle hooks
  mounted() {
    console.log("mounted!");
    this.fetchData();
  },
}
</script>

<template>
  <div class="inventory">
    <h1>This is an inventory page</h1>
    <input v-model="searchTerm" type="text" placeholder="Search...">
    <li class="list-group-item" v-for="(product) in products" :key="product.ProduktID"
      :class="{ 'highlight': isMatch(product) }">
      Produkt: "{{ product.Produkttitel }}" ,
      Author: "{{ product.Autorname }}" ,
      Anzahl:
      <span class="badge badge-primary badge-pill">{{ orderQuantity[product.ProduktID] || 0 }}</span>
      <button @click="increaseOrderQuantity(product)">+</button>
      <button class="btn btn-outline-danger" v-on:click=decreaseOrderQuantity(product)>-</button>
      <button class="btn btn-outline-danger" v-on:click=resetOrderQuantity(product)>Auf 0 setzen</button>
      <!-- <span style="color:red" v-if="product.quantity == 0">Ausverkauft!</span> -->
      
    </li>
  </div>
  <Cart :order-quantity="orderQuantity" :products="products" />
</template>

<style scoped>
.highlight {
  background-color: rgb(89, 89, 89);
}
</style>