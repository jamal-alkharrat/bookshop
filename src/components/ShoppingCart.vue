<template>
    <div class="cart-summary">
        <p>Bestellpositionen: {{ orderPositions }}</p>
        <p>Gesamtzahl Bücher: {{ totalBooks }}</p>
        <p>Gesamtpreis: €{{ totalPrice }}</p>
    </div>
</template>
  
<script>
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
};
</script>