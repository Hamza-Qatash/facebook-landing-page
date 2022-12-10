import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import store from "@/store";
import i18n from '@/i18n'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: `/${i18n.locale}`
    },
    {
        path: "/:lang",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        children: [
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
                path: "user",
                name: "user",
                component: User,
                beforeEnter: (to, from, next) => {
                    if (store.getters.authenticated) {
                        next(true);
                    } else {
                        next({ name: "home" });
                    }
                },
            },
            {
                path: "*",
                name: "*",
                redirect: { name: "home" },
            },
        ],
    },
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// use beforeEach route guard to set the language
router.beforeEach((to, from, next) => {
    // use the language from the routing param or default language
    let language = to.params.lang;
    if (!language) {
        language = "en";
    }
    store.dispatch('setLang', language)
    next();
});

export default router;
