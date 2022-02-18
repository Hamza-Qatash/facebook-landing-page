import Vue from "vue";

export const genericMixins = {
    methods: {
    },
    computed: {
        mdAndUp() {
            return this.$vuetify.breakpoint.mdAndUp;
        },
        isMobile() {
            return this.$vuetify.breakpoint.xsOnly;
        },
        isRtl() {
            return Vue.prototype.$vuetify.rtl;
        }
    },
};