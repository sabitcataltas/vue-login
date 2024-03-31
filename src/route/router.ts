import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import LoginView from '@/components/LoginView/LoginView.vue';
import HomeView from '@/components/Home/HomeView.vue';
import { useAuthStore } from '@/store/store';

const routes: Array<RouteRecordRaw> = [
    { path: '/', name:"home", component: HomeView, meta : {requiresAuth:true} }, // Home route
    { path: '/login', name: 'login', component: LoginView, props: true , meta : {requiresAuth:false}}, // Login view route
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    //const authStore = useAuthStore();
    let token = localStorage.getItem('token');
    console.log(token);
    if (!token && to.meta.requiresAuth) { //!authStore.getToken() 
        next("login");
    } else {
        next();
    }
});

export default router;