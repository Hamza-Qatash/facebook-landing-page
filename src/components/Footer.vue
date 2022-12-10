<template>
    <v-footer class="custom-footer white justify-start align-start">
        <v-container>
            <div
                class="pt-3 caption mb-3 d-flex flex-wrap pointer"
                ref="langsWrapper"
            >
                <span
                    v-for="(lang, index) in languages"
                    :key="index"
                    @click="changLang(lang, $event)"
                    class="pe-3 grey--text text--darken-1 text-decoration-none pointer lang-element"
                    :class="{'font-weight-bold': lang === 'English (US)'}"
                    >{{ lang }}</span
                >
                <v-btn x-small class="custom-blus-button elevation-0">
                    <v-icon class="grey--text text--darken-2 fs-20"
                        >mdi-plus</v-icon
                    >
                </v-btn>
            </div>
            <v-divider></v-divider>
            <div class="pt-3 caption mb-3 d-flex flex-wrap">
                <v-hover
                    v-slot="{ hover }"
                    v-for="(link, index) in links"
                    :key="index"
                >
                    <a
                        href="#"
                        :class="{
                            'text-decoration-underline': hover,
                        }"
                        class="pe-5 grey--text text--darken-1 text-decoration-none"
                        >{{ link }}</a
                    >
                </v-hover>
            </div>
            <div class="grey--text text--darken-1 pt-1 fs-11 d-flex flex-wrap">
                Meta © 2022
            </div>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: "Footer",
    data: () => ({
        languages: [
            "English (US)",
            "العربية",
            "Français (France)",
            "Русский",
            "Deutsch",
            "Bahasa Indonesia",
            "Español",
            "Türkçe",
            "ภาษาไทย",
            "Português (Brasil)",
            "Italiano",
        ],
        links: [
            "Sign",
            "UpLogIn",
            "Messenger",
            "FacebookLite",
            "Watch",
            "Places",
            "Games",
            "Marketplace",
            "Facebook Pay",
            "Oculus",
            "Portal",
            "Instagram",
            "Bulletin",
            "Local",
            "Fundraisers",
            "Services",
            "Voting Information Center",
            "Groups",
            "About",
            "Create Ad",
            "Create Page",
            "Developers",
            "Careers",
            "Privacy",
            "Cookies",
            "Ad choices",
            "Terms",
            "Help",
        ],
    }),
    methods: {
        changLang(lang, e) {
            let allLangsArr = [...this.$refs.langsWrapper.children];
            allLangsArr.forEach((el) => {
                el.classList.remove("font-weight-bold");
            });
            e.target.classList.add("font-weight-bold");
            const isoLang = lang === "العربية" ? "ar" : "en";
            if (this.$route.params.lang !== isoLang) {
                this.$router.replace({ params: { lang: isoLang } });
            }
        },
    },
};
</script>

<style scoped>
.custom-footer {
    height: 230px;
}
.custom-blus-button {
    min-width: 30px !important;
    border: 1px solid #ccd0d5;
    height: 20px;
    width: 30px !important;
}
.lang-element:hover {
    text-decoration: underline !important;
}
</style>
