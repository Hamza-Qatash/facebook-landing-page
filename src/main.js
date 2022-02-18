import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from '@/i18n'
import "@/vee-validate";
import '@/assets/styles/main.css'
import { ValidationProvider, ValidationObserver } from "vee-validate";

import { genericMixins } from "@/utilities/mixins";

Vue.mixin({
    ...genericMixins,
});

Vue.config.productionTip = false;

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: (h) => h(App),
}).$mount("#app");
