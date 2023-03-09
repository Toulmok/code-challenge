<template>
    <span v-if="authenticated"> -- Welcome -- </span>
    <button @click="signInOut">
        <span>{{ label }}</span>
    </button>
</template>

<script setup lang="ts">

import { onMounted, computed } from 'vue';
import { checkCurrentStatus, initialize } from '../helpers/auth'
import { authStores } from '../stores/authStores'

const useAuthStores = authStores()

// Lifecycle
onMounted( async () => {
    initialize()
    const cred = (await checkCurrentStatus())['cred']
    if(cred) { useAuthStores.credential = cred }
})

// Computed properties
const authenticated = computed(() => Boolean(useAuthStores.credential))
const label = computed(() => Boolean(useAuthStores.credential) ? 'Sign Out' : 'Sign In')

// Public Methods
async function signInOut() {
    if (!authenticated) {
        useAuthStores.credential = await useAuthStores.signIn(authenticated)
    } else {
        await useAuthStores.signOut(authenticated.value)
        useAuthStores.credential = undefined
    }
}
</script>