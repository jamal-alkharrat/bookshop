import { defineStore } from 'pinia'
export const useProductStore = defineStore({
  id: 'productStore',
  state: () => ({
    products: [],
    product: {
      ProduktID: null,
      Produktcode: '',
      Produkttitel: '',
      Autorname: '',
      Verlagsname: '',
      PreisNetto: 0.0,
      Mwstsatz: 0.0,
      PreisBrutto: 0.0,
      Lagerbestand: 0,
      Kurzinhalt: '',
      Gewicht: 0.0,
      LinkGrafikdatei: ''
    }
  }),
  actions: {
    setProduct(
      ProduktID,
      Produktcode,
      Produkttitel,
      Autorname,
      Verlagsname,
      PreisNetto,
      Mwstsatz,
      PreisBrutto,
      Lagerbestand,
      Kurzinhalt,
      Gewicht,
      LinkGrafikdatei
    ) {
      this.product = {
        ProduktID,
        Produktcode,
        Produkttitel,
        Autorname,
        Verlagsname,
        PreisNetto,
        Mwstsatz,
        PreisBrutto,
        Lagerbestand,
        Kurzinhalt,
        Gewicht,
        LinkGrafikdatei
      }
    },
    setProducts(newProducts) {
      this.products = newProducts
    },
    addProduct(product) {
      this.products.push(product)
    },
    resetProduct() {
      this.product = {
        ProduktID: null,
        Produktcode: '',
        Produkttitel: '',
        Autorname: '',
        Verlagsname: '',
        PreisNetto: 0.0,
        Mwstsatz: 0.0,
        PreisBrutto: 0.0,
        Lagerbestand: 0,
        Kurzinhalt: '',
        Gewicht: 0.0,
        LinkGrafikdatei: ''
      }
    },
    resetProducts() {
      this.products = []
    }
  },
  getters: {
    getProduct() {
      return this.product
    },
    getProducts() {
      return this.products
    }
  }
})
