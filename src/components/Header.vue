<template>
    <span>{{ appTitle }}</span>
    <Auth />
</template>

<script setup lang="ts">
import Auth from './Auth.vue'
defineProps<{
  appTitle: string
}>()
</script>