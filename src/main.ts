import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')

/*
  export default {
    name: 'ComponentName',
    components: {},
    data() {},
    methods: {},
    mounted() {},
    setup() {},
  }
*/