<template>
    <v-app>
        <v-main class="custom-bg">
            <router-view></router-view>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Vue from "vue";
import Footer from "@/components/Footer";
export default {
    name: "App",
    created() {
        Vue.prototype.$vuetify = this.$vuetify;
    },
    components: {
        Footer,
    },
};
</script>

<style scoped>
.custom-bg {
    background-color: #f0f2f5 !important;
}
</style>
