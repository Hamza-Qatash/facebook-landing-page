<template>
  <v-row justify="center" class="registration">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="440px"
      overlay-color="white"
      overlay-opacity="0.7"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="px-8 text-capitalize subtitle-1 font-weight-bold"
          x-large
          color="success rounded-lg"
          v-bind="attrs"
          v-on="on"
        >
          {{ $t("create-new-account") }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="flex-column align-start px-4 py-3">
          <div class="d-flex justify-space-between w-100">
            <span
              :class="[isRtl ? 'headline' : 'display-1']"
              class="font-weight-bold"
              >{{ $t("sign-up") }}</span
            >
            <v-btn icon small @click="dialog = false">
              <v-icon class="fs-28">mdi-close</v-icon>
            </v-btn>
          </div>
          <span class="body-2 grey--text text--darken-1 mt-2">{{
            $t("quick-easy")
          }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-2 pb-2">
          <v-container>
            <v-form v-model="valid" @keyup.native.enter="validate">
              <ValidationObserver ref="form">
                <v-row>
                  <v-col cols="12" sm="6" class="pb-0">
                    <ValidationProvider
                      v-slot="{ valid, errors }"
                      :name="$t('firstname')"
                      rules="required|alpha"
                    >
                      <v-text-field
                        :placeholder="$t('firstname')"
                        outlined
                        :dense="!isMobile"
                        filled
                        name="firstname"
                        v-model.trim="registrationInfo.firstName"
                        required
                        type="text"
                        :error-messages="errors"
                        :success="valid"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    class="pb-0"
                    :class="{ 'pt-0': isMobile }"
                  >
                    <ValidationProvider
                      v-slot="{ valid, errors }"
                      :name="$t('lastname')"
                      rules="required|alpha"
                    >
                      <v-text-field
                        :placeholder="$t('lastname')"
                        outlined
                        :dense="!isMobile"
                        filled
                        name="lastname"
                        v-model.trim="registrationInfo.lastName"
                        required
                        type="text"
                        :error-messages="errors"
                        :success="valid"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <ValidationProvider
                      v-slot="{ valid, errors }"
                      :name="$t('username')"
                      rules="required|email_or_phone"
                    >
                      <v-row align="center" class="mx-0 my-1">
                        <v-text-field
                          :placeholder="$t('email-or-phone')"
                          outlined
                          :dense="!isMobile"
                          filled
                          name="username"
                          v-model.trim="registrationInfo.username"
                          required
                          type="text"
                          :error-messages="errors"
                          :success="valid"
                        ></v-text-field>
                      </v-row>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <ValidationProvider
                      v-slot="{ valid, errors }"
                      :name="$t('password')"
                      rules="required|min:8|custom_password"
                    >
                      <v-row align="center" class="mx-0">
                        <v-text-field
                          v-model="registrationInfo.password"
                          @click:append="showPass = !showPass"
                          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showPass ? 'text' : 'password'"
                          :placeholder="$t('password')"
                          name="password"
                          outlined
                          :dense="!isMobile"
                          filled
                          required
                          :error-messages="errors"
                          :success="valid"
                        ></v-text-field>
                      </v-row>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" class="py-0 mb-n2">
                    <span class="caption pe-1">{{ $t("birthday") }}</span>
                    <v-icon class="pb-1 pointer" small>mdi-help-circle</v-icon>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    class="px-2 pb-0"
                    :class="{ 'mb-n4': isMobile }"
                  >
                    <ValidationProvider
                      v-slot="{ valid, errors }"
                      :name="$t('birthday-month')"
                      rules="required"
                    >
                      <v-select
                        :items="birthdayMonthItems"
                        v-model="registrationInfo.birthdayMonth"
                        :item-text="`title_${lang}`"
                        item-value="id"
                        name="birthday-month"
                        :placeholder="monthPlaceHolder"
                        required
                        outlined
                        :menu-props="{
                          bottom: true,
                          offsetY: true,
                        }"
                        dense
                        :error-messages="errors"
                        :success="valid"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    class="px-2 pb-0"
                    :class="{ 'mb-n4': isMobile }"
                  >
                    <ValidationProvider
                      v-slot="{ valid, errors }"
                      :name="$t('birthday-day')"
                      rules="required"
                    >
                      <v-select
                        :items="birthdayDays"
                        v-model="registrationInfo.birthdayDay"
                        placeholder="29"
                        name="birthday-day"
                        required
                        outlined
                        :menu-props="{
                          bottom: true,
                          offsetY: true,
                        }"
                        dense
                        :error-messages="errors"
                        :success="valid"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    class="px-2 pb-0"
                    :class="{ 'mb-n4': isMobile }"
                  >
                    <ValidationProvider
                      v-slot="{ valid, errors }"
                      :name="$t('birthday-year')"
                      rules="required"
                    >
                      <v-select
                        :items="birthdayYears"
                        v-model="registrationInfo.birthdayYear"
                        placeholder="1994"
                        name="birthday-year"
                        required
                        outlined
                        :menu-props="{
                          bottom: true,
                          offsetY: true,
                        }"
                        dense
                        :error-messages="errors"
                        :success="valid"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    class="pt-0 pb-1 mb-n2"
                    :class="{ 'mt-n3': !isMobile }"
                  >
                    <span class="caption pe-1">{{ $t("gender") }}</span>
                    <v-icon class="pb-1 pointer" small>mdi-help-circle</v-icon>
                  </v-col>
                  <v-col cols="12" class="py-0 mt-n3 mb-n2 pe-0">
                    <ValidationProvider
                      v-slot="{ errors }"
                      :name="$t('gender')"
                      rules="required"
                    >
                      <v-radio-group
                        class="d-flex justify-space-between"
                        v-model="registrationInfo.gender"
                        name="gender"
                        :error-messages="errors"
                        row
                      >
                        <div
                          class="d-flex align-center justify-space-between me-2 ps-3 custom-radio pointer"
                          :class="{
                            'mb-2 w-100': isMobile,
                            'custom-radio-error': errors.length,
                          }"
                          @click="registrationInfo.gender = 'Female'"
                        >
                          <span class="pe-1">{{ $t("female") }}</span>
                          <v-radio
                            color="orange"
                            class="ms-2 me-0"
                            value="Female"
                          ></v-radio>
                        </div>
                        <div
                          class="d-flex align-center justify-space-between me-2 ps-3 custom-radio pointer"
                          :class="{
                            'mb-2 w-100': isMobile,
                            'custom-radio-error': errors.length,
                          }"
                          @click="registrationInfo.gender = 'Male'"
                        >
                          <span class="pe-1">{{ $t("male") }}</span>
                          <v-radio
                            color="orange"
                            class="ms-2 me-0"
                            value="Male"
                          ></v-radio>
                        </div>
                      </v-radio-group>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" class="px-2 pb-0 mt-n1 pt-1">
                    <small
                      >{{ $t("sign-up-1") }}
                      <v-hover v-slot="{ hover }">
                        <a
                          href="#"
                          :class="{
                            'text-decoration-underline': hover,
                          }"
                          class="primary--text text--darken-3 text-decoration-none"
                          >{{ $t("sign-up-2") }}
                        </a></v-hover
                      >
                      <v-hover v-slot="{ hover }">
                        <a
                          href="#"
                          :class="{
                            'text-decoration-underline': hover,
                          }"
                          class="primary--text text--darken-3 text-decoration-none"
                          >{{ $t("sign-up-3") }}</a
                        ></v-hover
                      >
                      {{ $t("sign-up-4") }}
                      <v-hover v-slot="{ hover }">
                        <a
                          href="#"
                          :class="{
                            'text-decoration-underline': hover,
                          }"
                          class="primary--text text--darken-3 text-decoration-none"
                          >{{ $t("sign-up-5") }}</a
                        ></v-hover
                      >
                      {{ $t("sign-up-6") }}</small
                    >
                  </v-col>
                </v-row>
              </ValidationObserver>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-center pb-5">
          <v-btn
            class="px-16 text-capitalize font-weight-bold"
            :class="[isRtl ? 'subtitle-2' : 'subtitle-1']"
            color="success rounded-lg"
            @click="validate"
            :loading="sendingRequest"
          >
            {{ $t("sign-up") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Registration",
  data: () => ({
    valid: true,
    dialog: false,
    registrationInfo: {
      firstName: null,
      lastName: null,
      username: null,
      password: null,
      birthdayMonth: null,
      birthdayDay: null,
      birthdayYear: null,
      gender: null,
    },
    showPass: false,
    sendingRequest: false,
    birthdayMonthItems: [
      {
        id: 1,
        title_ar: "يناير",
        title_en: "Jan",
      },
      {
        id: 2,
        title_ar: "فبراير",
        title_en: "Feb",
      },
      {
        id: 3,
        title_ar: "مارس",
        title_en: "Mar",
      },
      {
        id: 4,
        title_ar: "أبريل",
        title_en: "Apr",
      },
      {
        id: 5,
        title_ar: "مايو",
        title_en: "May",
      },
      {
        id: 6,
        title_ar: "يونيو",
        title_en: "Jan",
      },
      {
        id: 7,
        title_ar: "يوليو",
        title_en: "Jul",
      },
      {
        id: 8,
        title_ar: "أغسطس",
        title_en: "Aug",
      },
      {
        id: 9,
        title_ar: "سبتمبر",
        title_en: "Sep",
      },
      {
        id: 10,
        title_ar: "أكتوبر",
        title_en: "Oct",
      },
      {
        id: 11,
        title_ar: "نوفمبر",
        title_en: "Nov",
      },
      {
        id: 12,
        title_ar: "ديسمبر",
        title_en: "Dec",
      },
    ],
  }),
  computed: {
    birthdayDays() {
      return Array(31)
        .fill(0)
        .map((el, i) => ++i);
    },
    birthdayYears() {
      return Array(118)
        .fill(0)
        .map((el, i) => ++i + 1904)
        .reverse();
    },
    lang() {
      return this.$store.getters.lang;
    },
    monthPlaceHolder() {
      let month = `title_${this.lang}`;
      return this.birthdayMonthItems[4][month];
    },
  },
  methods: {
    async validate() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        this.sendingRequest = true;
        setTimeout(() => {
          this.$store.dispatch("login", this.registrationInfo);
          this.$router.push({ name: "user" });
        }, 1100);
      }
    },
  },
};
</script>

<style scoped>
.custom-radio {
  border: 1px solid #ccd0d5;
  height: 40px;
  border-radius: 5px;
  width: 126px;
}
.custom-radio-error {
  border: 2px solid red;
}
.fade-enter-active {
  animation: fade-in 0.5s;
}
.fade-leave-active {
  animation: fade-in 0.5s reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<style>
.v-dialog {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px !important;
}
</style>
