<script>
import Cart from '../components/ShoppingCart.vue';
import { useProductStore } from '@/stores/productStore';
import { useOrderStore } from '@/stores/orderStore';
export default {
  setup() {
    const orderStore = useOrderStore();
    return {
      orderStore,
    }
  },
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
    filteredProducts() {
      if (this.searchTerm === '') {
        return this.products;
      } else {
        return this.products.filter(products =>
          products.Produkttitel.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          products.Autorname.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    },
  },
  methods: {
    fetchData() {
      const productStore = useProductStore();
      fetch("https://ivm108.informatik.htw-dresden.de/ewa/g20/api/books/fetch_books.php")
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
          productStore.setProducts(data);
        });
      this.initializeOrderQuantity();
    },
    isMatch(product) {
      // This function is not used anymore, it can be used to highlight the search term in the results
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
      this.orderStore.setOrderQuantity(this.orderQuantity);
    },
    getImageSource(product) {
      return product.LinkGrafikdatei;
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    orderQuantity: {
      handler(newValue) {
        for (let key in newValue) {
          if (newValue[key] < 0) {
            this.orderQuantity[key] = 0;
          }
          if (newValue[key] > this.product.Lagerbestand) {
            this.orderQuantity[key] = this.product.Lagerbestand;
          }
        }
      },
      deep: true
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="mb-3">
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Search..." v-model="searchTerm">
    </div>
    <ul class="list-group list-group-horizontal-sm">
      <li class="list-group-item" v-for="(product) in filteredProducts" :key="product.ProduktID">
        <img v-bind:src="getImageSource(product)" class="img-fluid" alt="Product image">
        <div class="row p-1">
          <p>Title: "<strong>{{ product.Produkttitel }}</strong>"</p>
          <p>Info: "{{ product.Kurzinhalt }}"</p>
          <p>Author: "{{ product.Autorname }}"</p>
          <p>Avaliable quantity: {{ product.Lagerbestand }}</p>
        </div>

        <div class="row">
          <p>Price: {{ product.PreisBrutto }} €</p>
        </div>

        <label for="orderQuantity" class="form-label">Quantity:</label>
        <div class="input-group">
          <input type="number" class="form-control" id="orderQuantity" v-model="orderQuantity[product.Produkttitel]">
          <button class="btn btn-outline-primary" @click="orderStore.increaseOrderQuantity(product)">+</button>
          <button class="btn btn-outline-danger" v-on:click=orderStore.decreaseOrderQuantity(product)>-</button>
          <button class="btn btn-outline-danger" v-on:click=orderStore.resetOrderQuantity(product)>
            <i class="bi bi-trash"></i></button>
        </div>
      </li>
    </ul>

    <div class="shopping-cart-btn"><button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bi bi-cart"></i>Shopping Cart</button>
    </div>


    <div class="offcanvas offcanvas-end" tabindex="-1" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Shopping Cart</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <Cart :order-quantity="orderQuantity" :products="products" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.shopping-cart-btn {
  position: fixed;
  bottom: 2vh;
  right: 5px;
  margin: 1rem;
  z-index: 1000;
}

@media (min-width: 576px) {
  .img-fluid {
    width: 300px;
    height: 200px;
    object-fit: cover;
  }
}
</style>
```