<template>
  <div class="page-container">
      <Header :app-title="title" />
      <section class="app-container">
        <ItemTable />
      </section>
  </div>
</template>

<script setup lang="ts">
import { title } from './config'
import Header from './components/Header.vue'
import ItemTable from './components/ItemTable.vue'
</script>