<template>
    <v-container>
        <v-row class="justify-center">
            <v-card elevation="3" class="login-card rounded-lg">
                <v-card-text class="mb-0 pb-0">
                    <v-form v-model="valid" @keyup.native.enter="validate">
                        <ValidationObserver ref="form">
                            <ValidationProvider
                                v-slot="{ valid, errors }"
                                :name="$t('username')"
                                rules="required|email_or_phone"
                            >
                                <v-row align="center" class="mx-0 mt-1">
                                    <v-text-field
                                        :placeholder="$t('email-or-phone')"
                                        outlined
                                        name="username"
                                        v-model.trim="loginInfo.username"
                                        required
                                        type="text"
                                        :error-messages="errors"
                                        :success="valid"
                                    ></v-text-field>
                                </v-row>
                            </ValidationProvider>
                            <ValidationProvider
                                v-slot="{ valid, errors }"
                                :name="$t('password')"
                                rules="required|min:8|custom_password"
                            >
                                <v-row align="center" class="mx-0 mt-3">
                                    <v-text-field
                                        v-model="loginInfo.password"
                                        @click:append="showPass = !showPass"
                                        :append-icon="
                                            showPass ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                                        :type="showPass ? 'text' : 'password'"
                                        :placeholder="$t('password')"
                                        name="password"
                                        outlined
                                        required
                                        :error-messages="errors"
                                        :success="valid"
                                    ></v-text-field>
                                </v-row>
                            </ValidationProvider>
                        </ValidationObserver>
                    </v-form>
                </v-card-text>
                <v-card-actions class="px-4 d-flex flex-column mt-1">
                    <v-btn
                        block
                        x-large
                        color="primary text-capitalize title font-weight-bold rounded-lg"
                        @click="validate"
                        :loading="sendingRequest"
                    >
                        {{ $t("log-in") }}
                    </v-btn>
                    <div class="my-4 primary--text pointer">
                        {{ $t("forgot-password") }}
                    </div>
                    <v-divider class="w-100"></v-divider>
                    <div class="px-8 py-10">
                        <Registration />
                    </div>
                </v-card-actions>
            </v-card>
        </v-row>
        <div class="mt-9 body-2">
            <v-hover v-slot="{ hover }">
                <a
                    href="#"
                    :class="{
                        'text-decoration-underline': hover,
                    }"
                    class="black--text font-weight-bold text-decoration-none"
                    >{{ $t("create-page") }}</a
                ></v-hover
            >
            {{ $t("create-page-sub") }}
        </div>
    </v-container>
</template>

<script>
import Registration from "@/components/Registration";
export default {
    name: "LoginForm",
    data: () => ({
        loginInfo: {
            username: null,
            password: null,
        },
        showPass: false,
        password: "",
        valid: true,
        sendingRequest: false,
    }),
    methods: {
        async validate() {
            const valid = await this.$refs.form.validate();
            if (valid) {
                this.sendingRequest = true;
                setTimeout(() => {
                    this.$store.dispatch("login", this.loginInfo);
                    this.$router.push({ name: "user" });
                }, 1100);
            }
        },
    },
    components: {
        Registration,
    },
};
</script>

<style scoped>
.login-card {
    width: 420px;
}
</style>
