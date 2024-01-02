<script>
import { useProductStore } from "@/stores/productStore";
import { ref } from "vue";
export default {
    name: "InventoryTable",
    setup() {
        const productStore = useProductStore();
        const updateMessage = ref('');
        const updateSuccessful = ref(false);
        return {
            apiUrl: "http://localhost/api/",
            productStore,
            originalStock: {},
            updateSuccessful,
            updateMessage,
        };
    },
    methods: {
        fetchData() {

            console.log("Start fetch ...");
            fetch("http://localhost/api/fetch_books.php")
                .then((response) => response.json())
                .then((data) => {
                    const productStore = useProductStore();
                    console.log("Data from fetch: ", data);
                    productStore.setProducts(data);
                    console.log("Products from store: ", productStore.getProducts);
                    productStore.getProducts.forEach(product => {
                        this.originalStock[product.ProduktID] = product.Lagerbestand;
                    });
                })
                .catch((error) => {
                    console.error("Error during fetch: ", error);
                });
        },
        decrementStock(product) {
            product.Lagerbestand--;
        },
        incrementStock(product) {
            product.Lagerbestand++;
        },
        updateStock(product) {
            fetch(`${this.apiUrl}update_book_inventory.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ProduktID: product.ProduktID,
                    Lagerbestand: product.Lagerbestand,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Data from fetch: ", data);
                    this.updateMessage = data.message;
                    console.log("Update message: ", this.updateMessage);
                    console.log("Update successful: ", this.updateSuccessful);
                    if (data.rowsAffected > 0) {
                        this.updateSuccessful = true;
                        console.log("Update successful: ", this.updateSuccessful);
                        setTimeout(() => {
                            this.updateSuccessful = false;
                        }, 5000); // 5000 milliseconds = 5 seconds
                    }
                })
                .catch(error => {
                    console.error("Error during fetch: ", error);
                });
        },
        resetStock(product) {
            product.Lagerbestand = this.originalStock[product.ProduktID];
        },
    },
    mounted() {
        this.fetchData();
    },

};
</script>

<template>
    <div class="inventory">
        <!-- Inventory table -->
        <table class="table table-striped table-responsive-md">
            <thead class="thead-light">
                <tr>
                    <th scope="col">ProduktID</th>
                    <th scope="col">Produkttitel</th>
                    <th scope="col">Autorname</th>
                    <th scope="col">PreisNetto</th>
                    <th scope="col">Mwstsatz</th>
                    <th scope="col">PreisBrutto</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in productStore.getProducts" :key="product.ProduktID">
                    <td>{{ product.ProduktID }}</td>
                    <td>{{ product.Produkttitel }}</td>
                    <td>{{ product.Autorname }}</td>
                    <td>{{ product.PreisNetto }}</td>
                    <td>{{ product.Mwstsatz }}</td>
                    <td>{{ product.PreisBrutto }}</td>
                    <td>
                        <div class="row">
                            <div class="col-12 col-md-6 mb-2">
                                <div class="btn-group" role="group">
                                    <button class="btn btn-primary btn-sm btn-block"
                                        @click="incrementStock(product)">+</button>
                                    <button class="btn btn-danger btn-sm btn-block"
                                        @click="decrementStock(product)">-</button>
                                    <button class="btn btn-warning btn-sm btn-block"
                                        @click="resetStock(product)">Reset</button>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 mb-2">
                                <input type="number" class="form-control form-control-sm" v-model="product.Lagerbestand" />
                            </div>
                            <div class="col-12 col-md-6 mb-2">
                                <button class="btn btn-primary btn-sm btn-block"
                                    @click="updateStock(product)">Update</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="updateSuccessful" class="alert alert-success">
        <p>Update successful</p>
    </div>
</template>

<style scoped>
.alert {
    color: green;
    /* Add more styles to make it look like an alert */
}
</style>