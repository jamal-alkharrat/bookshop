<template>
    <div class="cart-summary">
        <p>Bestellpositionen: {{ orderPositions }}</p>
        <p>Gesamtzahl Bücher: {{ totalBooks }}</p>
        <p>Gesamtpreis: €{{ totalPrice }}</p>
    </div>
    <!-- Bestellen -->
    <div class="cart-actions">
        <button class="btn btn-primary" @click="orderBooks">Bestellen</button>
    </div>
</template>
  
<script>
import { useUserStore } from '@/stores/userStore';
import { toRaw } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
export default {
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
            console.log("Order: ", order);
            let data = JSON.stringify(order);

            // Send order to PHP
            fetch("http://localhost/payment/stripe_redirect.php?live=0", {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(async data => {
                    console.log("Data from fetch: ", data);
                    let stripe = await loadStripe('pk_test_51OPj2FDtljfWi561qNCDC0U2oYxqi2U3Ux1rfRoo1AoXENV9qZp3cu8PuQ21aFVGV2PRjT5TQQCKIjfY1r4RVVqe00P1EQ9PRG');
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