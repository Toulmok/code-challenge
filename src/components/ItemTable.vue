<template>
<template v-if="authenticated">
    <div>
        Item Container
    </div>
    <div class="search-container"></div>
    <button @click="loadItemsButton">
        <span>Load 20 Items</span>
    </button>
    <table>
        <thead>
            <th>item</th><th>created</th><th>tags</th><th>...</th>
        </thead>
        <tbody>
            <tr v-if="loading"><td>Loading items...</td></tr>
            <tr v-if="error"><td>{{ error.message }}</td></tr>
            <tr v-if="items" v-for="item in items" :key="item.id">
                <td>{{ item.title }}</td><td>{{ item.created }}</td><td>{{ item.tags }}</td> 
                <td><button @click= "editTagsButton(item.id)" v-bind:id="item.id">Edit Tags</button></td>
            </tr>
        </tbody>
    </table>
</template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { authStores } from '../stores/authStores'
import { itemStores } from '../stores/itemStores'
import { checkCurrentStatus } from '../helpers/auth'

const useAuthStores = authStores()
const { items, loading, error } = storeToRefs(itemStores())
const { fetchItems, updateTags } = itemStores()

// Computed properties
const authenticated = computed(() => Boolean(useAuthStores.credential))

// Public Methods
const loadItemsButton = async () => {
    const portal = (await checkCurrentStatus())['portal']
    return await fetchItems(portal)
}


async function editTagsButton(buttonItemId: string) {
    console.log(`Button pushed - ${buttonItemId}`)
    const portal = (await checkCurrentStatus())['portal']
    return await updateTags(portal, buttonItemId)
}
</script>