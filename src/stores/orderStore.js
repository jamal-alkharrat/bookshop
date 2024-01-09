import { defineStore } from 'pinia'

export const useOrderStore = defineStore({
  id: 'orderStore',
  state: () => ({
    orders: [],
    orderPositions: [],
    orderQuantity: {}
  }),
  actions: {
    setOrders(orders) {
      this.orders = orders
    },
    setOrderPositions(orderPositions) {
      this.orderPositions = orderPositions
    },
    setOrderQuantity(orderQuantity) {
      this.orderQuantity = orderQuantity
    },
    increaseOrderQuantity(product) {
      if (!this.orderQuantity[product.ProduktID]) {
        this.orderQuantity[product.ProduktID] = 0;
      }
      if (this.orderQuantity[product.ProduktID] < product.Lagerbestand)
      {
        this.orderQuantity[product.ProduktID]++;
      }
      if (this.orderQuantity[product.ProduktID] > product.Lagerbestand)
      {
        this.orderQuantity[product.ProduktID] = product.Lagerbestand;
      }
    },
    decreaseOrderQuantity(product) {
      if (this.orderQuantity[product.ProduktID] > 0) {
        this.orderQuantity[product.ProduktID]--;
      }
    },
    resetOrderQuantity(product) {
      this.orderQuantity[product.ProduktID] = 0;
    },
  },
  getters: {
    getOrders() {
      return this.orders
    },
    getOrderPositions() {
      return this.orderPositions
    }
  },
})