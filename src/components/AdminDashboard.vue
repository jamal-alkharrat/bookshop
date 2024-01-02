<script>
import InventoryTable  from '@/components/InventoryTable.vue'
import OrdersTable from '@/components/OrdersTable.vue'
export default {
    components: {
        InventoryTable,
        OrdersTable,
    },
}
</script>

<template>
    <div class="admin-dashboard">
        <div class="orders">
            <OrdersTable />
        </div>
        <div class="inventory">
            <InventoryTable />
        </div>
    </div>
</template>