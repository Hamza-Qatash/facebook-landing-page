import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: [
                "Facebook - Log In or Sign Up",
                "فيسبوك - تسجيل الدخول او الاشتراك",
            ],
        },
    },
    {
        path: "/user",
        name: "user",
        component: User,
        beforeEnter: (to, from, next) => {
                if (store.getters.authenticated) {
                    next(true);
                } else {
                    next({name: 'home'});
                }
            }
    },
    {
        path: "*",
        name: "*",
        redirect: { name: "home" },
    },
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
