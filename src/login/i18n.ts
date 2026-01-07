/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withExtraLanguages({
        id: {
            label: "Bahasa Indonesia",
            getMessages: () => import("./i18n.id")
        }
    })
    .withCustomTranslations({
        en: {
            // Custom English translations
            loginAccountTitle: "Welcome Back",
            noAccount: "Don't have an account?",
            doRegister: "Register Now →",
            usernameOrEmail: "Email or NIK",
            doLogIn: "Sign In",
            doForgotPassword: "Forgot Password?",
            rememberMe: "Remember me",
            backToLogin: "← Back to Login",
            backToApplication: "← Back to Application",
            proceedWithAction: "→ Click here to proceed",
            emailInstruction: "Enter your email or NIK and we will send you instructions on how to create a new password.",
            "identity-provider-login-label": "Or sign in with"
        },
        id: {
            // Custom Indonesian translations specific to our theme
            loginAccountTitle: "Selamat Datang Kembali",
            noAccount: "Belum punya akun?",
            doRegister: "Daftar Sekarang →",
            usernameOrEmail: "Email atau NIK",
            doLogIn: "Masuk",
            doForgotPassword: "Lupa Password?",
            rememberMe: "Ingat saya",
            backToLogin: "← Kembali ke Login",
            backToApplication: "← Kembali ke Aplikasi",
            proceedWithAction: "→ Klik di sini untuk melanjutkan",
            emailInstruction: "Masukkan email atau NIK Anda dan kami akan mengirimkan instruksi cara membuat password baru.",
            "identity-provider-login-label": "Atau masuk dengan"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
