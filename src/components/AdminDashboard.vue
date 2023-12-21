<script>
export default {
    data() {
        return {
            orders: [],
            apiUrl: 'http://localhost/api/',
            order: {
                BestellungID: 0,
                Bestelldatum: '',
                orderPositions: [],
            },
            orderPosition: {
                BestellpositionID: 0,
                Anzahl: 0,
                Titel: '',
            },
        }
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await fetch(`${this.apiUrl}fetch_orders.php`);
                const data = await response.json();
                console.log("Data from fetch: ", data);
                this.orders = data;
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        },
    },
    mounted() {
        this.fetchOrders();
    },
}
</script>

<template>
    <div class="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div class="orders">
            <h2>Bestellungen</h2>
            <div v-for="order in orders" :key="order.BestellungID">
                <p>Bestellung {{ order.BestellungID }} vom {{ order.Bestelldatum }}</p>
                <div v-for="orderPosition in order.orderPositions" :key="orderPosition.BestellpositionID">
                    <p>{{ orderPosition.Anzahl }}x {{ orderPosition.Titel }}</p>
                </div>
            </div>
        </div>
    </div>
</template>