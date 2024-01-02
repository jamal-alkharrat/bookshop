<script>
import { useOrderStore } from '@/stores/orderStore'
export default {
    data() {
        return {
            orders: [],
            apiUrl: 'http://localhost/api/',
            bestellung: {
                BestellungID: 0,
                UserID: 0,
                GesamtPreis: 0.00,
                Bestelldatum: '',
            },
            bestellposition: {
                BestellpositionID: 0,
                BestellungID: 0,
                ProduktID: 0,
                Anzahl: 0,
                PreisNetto: 0.00,
                Mwstsatz: 0.00,
                PreisBrutto: 0.00,
            },
        }
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await fetch(`${this.apiUrl}fetch_orders.php`);
                const data = await response.json();
                console.log("Data from fetch: ", data);
                const orderStore = useOrderStore();
                orderStore.setOrders(data);
                console.log("Orders from store: ", orderStore.getOrders);
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        },
        async fetchOrderPositions() {
            try {
                const response = await fetch(`${this.apiUrl}fetch_order_positions.php`);
                const data = await response.json();
                console.log("Data from fetch: ", data);
                const orderStore = useOrderStore();
                orderStore.setOrderPositions(data);
                console.log("Order positions from store: ", orderStore.getOrderPositions);
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        },
    },
    mounted() {
        this.fetchOrders();
        this.fetchOrderPositions();
    },
    computed: {
        orderStore() {
            return useOrderStore();
        }
    },
}
</script>

<template>
    <div class="orders">
        <!-- Orders table -->
        <table class="table table-hover table-responsive-md">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">BestellungID</th>
                    <th scope="col">UserID</th>
                    <th scope="col">GesamtPreis</th>
                    <th scope="col">Bestelldatum</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orderStore.getOrders" :key="order.BestellungID">
                    <td>{{ order.BestellungID }}</td>
                    <td>{{ order.UserID }}</td>
                    <td>{{ order.GesamtPreis }}</td>
                    <td>{{ order.Bestelldatum }}</td>

                    <!-- New table for order positions -->
                    <td colspan="4">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">BestellpositionID</th>
                                    <th scope="col">BestellungID</th>
                                    <th scope="col">ProduktID</th>
                                    <th scope="col">Anzahl</th>
                                    <th scope="col">PreisNetto</th>
                                    <th scope="col">Mwstsatz</th>
                                    <th scope="col">PreisBrutto</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="position in orderStore.getOrderPositions" :key="position.BestellpositionID">
                                    <template v-if="position.BestellungID === order.BestellungID">
                                        <td>{{ position.BestellpositionID }}</td>
                                        <td>{{ position.BestellungID }}</td>
                                        <td>{{ position.ProduktID }}</td>
                                        <td>{{ position.Anzahl }}</td>
                                        <td>{{ position.PreisNetto }}</td>
                                        <td>{{ position.Mwstsatz }}</td>
                                        <td>{{ position.PreisBrutto }}</td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>