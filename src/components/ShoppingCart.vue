<template>
    <!-- Products added to cart -->
    <div class="cart-items">
        <div v-for="product in products" :key="product.ProduktID" class="cart-item">
            <div class="list-group">
                <div class="list-group-item" v-if="orderQuantity[product.ProduktID] > 0">
                    <p>{{ product.Produkttitel }}</p>
                    <p>Price: €{{ product.PreisBrutto }}</p>
                    <p>Quantity: {{ orderQuantity[product.ProduktID] || 0 }}</p>
                    <div class="input-group">
                        <button class="btn btn-outline-primary"
                            @click="orderStore.increaseOrderQuantity(product)">+</button>
                        <button class="btn btn-outline-danger"
                            v-on:click=orderStore.decreaseOrderQuantity(product)>-</button>
                        <button class="btn btn-outline-danger" v-on:click=orderStore.resetOrderQuantity(product)>
                            <i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="cart-summary">
        <!-- <p>Bestellpositionen: {{ orderPositions }}</p> -->
        <p>Total books: {{ totalBooks }}</p>
        <p>Total price: €{{ totalPrice }}</p>
    </div>
    <!-- Bestellen -->
    <div class="cart-actions">
        <button class="btn btn-primary" @click="orderBooks" :disabled="canOrder">Proceed to payment</button>
    </div>
</template>
  
<script>
import { useUserStore } from '@/stores/userStore';
import { toRaw } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { useOrderStore } from '@/stores/orderStore';
import { useProductStore } from '@/stores/productStore';
export default {
    setup() {
        const orderStore = useOrderStore();
        const productStore = useProductStore();
        return {
            orderStore,
            productStore,
        };
    },
    props: ['orderQuantity', 'products'],
    computed: {
        orderPositions() {
            return Object.keys(this.orderQuantity).length;
        },
        totalBooks() {
            return Object.values(this.orderQuantity).reduce((a, b) => a + b, 0);
        },
        totalPrice() {
            let total = 0;
            for (let product of this.products) {
                total += (this.orderQuantity[product.ProduktID] || 0) * parseFloat(product.PreisBrutto);
            }
            return total.toFixed(2);
        },
        canOrder() {
            // Check total books > 0
            if (this.totalBooks <= 0) {
                return false;
            }
            return true;
        },
    },
    methods: {
        orderBooks() {
            let order = {};
            const userStore = useUserStore()
            order = {
                orderQuantity: toRaw(this.orderQuantity),
                totalPrice: toRaw(this.totalPrice),
                userID: userStore.getUserID,
            };
            let data = JSON.stringify(order);

            // Send order to PHP
            fetch("https://ivm108.informatik.htw-dresden.de/ewa/g20/api/payment/stripe_redirect.php?live=0", {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(async data => {
                    let stripe = await loadStripe("pk_test_51OPj2FDtljfWi561qNCDC0U2oYxqi2U3Ux1rfRoo1AoXENV9qZp3cu8PuQ21aFVGV2PRjT5TQQCKIjfY1r4RVVqe00P1EQ9PRG");
                    stripe.redirectToCheckout({
                        sessionId: data.sessionId
                    }).then(function (result) {
                        if (result.error) {
                            console.error("Error during checkout: ", result.error.message);
                        }
                    });
                })
                .catch(error => {
                    console.error("Error during fetch: ", error);
                });
        },
    },

};
</script>