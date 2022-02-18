<template>
    <v-container
        class="h-100"
        :class="[mdAndUp ? 'd-flex align-center' : 'pt-15']"
    >
        <v-row class="align-center text-center text-md-start login-content">
            <v-spacer></v-spacer>
            <v-col class="pe-md-16" cols="12" md="6" xl="4">
                <h1 class="display-3 primary--text font-weight-bold mb-4">
                    {{ $t("facebook") }}
                </h1>
                <p
                    class="fs-32 lh-37"
                    :class="{ 'w-65 mx-auto headline': !mdAndUp }"
                >
                    {{ $t("facebook-sub") }}
                </p>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="text-center">
                <LoginForm />
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
    name: "Home",
    components: {
        LoginForm,
    },
};
</script>

<style scoped>
.login-content {
    padding-bottom: 70px;
}
</style>
