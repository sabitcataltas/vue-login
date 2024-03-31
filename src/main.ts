import { createApp } from 'vue'
import App from './App.vue'
import LoginView from './components/LoginView/LoginView.vue'
import HomeView from './components/Home/HomeView.vue'
import { store, key } from './store/store'

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: HomeView }, // Home route
    { path: '/login', name: 'LoginView', component: LoginView, props: true }, // Login view route
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router);
app.use(store, key)

app.mount('#app')
