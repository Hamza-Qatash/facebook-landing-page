
import Vue from "vue";
import { extend, localize } from "vee-validate";
import { required, email, min, max, alpha, alpha_num, numeric, length, alpha_dash, alpha_spaces, min_value, max_value, excluded, confirmed, required_if } from "vee-validate/dist/rules";
import ar from "vee-validate/dist/locale/ar.json";
import en from "vee-validate/dist/locale/en.json";
import customEn from "@/locales/en/customValidation.json";
import customAr from "@/locales/ar/customValidation.json";

extend("required", required);
extend("email", email);
extend("min", min);
extend("max", max);
extend("min_value", min_value);
extend("max_value", max_value);
extend("alpha", alpha);
extend('alpha_num', alpha_num);
extend('numeric', numeric);
extend('length', length);
extend('alpha_dash', alpha_dash);
extend('alpha_spaces', alpha_spaces);
extend('excluded', excluded);
extend('confirmed', confirmed);
extend('required_if', required_if);

// Custome rules for
extend('email_or_phone', { validate : value => /^([\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)$/.test(value) });
extend('custom_password', { validate : value => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value) });


localize({
    en: {
        messages: {...en.messages, ...customEn},
    },
    ar: {
        messages: {...ar.messages, ...customAr}
    }
});

let LOCALE = "en";

// A simple get/set interface to manage our locale in components.
// This is not reactive, so don't create any computed properties/watchers off it.
Object.defineProperty(Vue.prototype, "locale", {
    get() {
        return LOCALE;
    },
    set(val) {
        LOCALE = val;
        localize(val);
    }
});