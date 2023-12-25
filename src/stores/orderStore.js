import { defineStore } from 'pinia'

export const useOrderStore = defineStore({
  id: 'orderStore',
  state: () => ({
    orders: [],
    orderPositions: []
  }),
  actions: {
    setOrders(orders) {
      this.orders = orders
    },
    setOrderPositions(orderPositions) {
      this.orderPositions = orderPositions
    }
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