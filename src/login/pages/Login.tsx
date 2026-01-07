import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Shield } from "lucide-react";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container" className="text-center">
                    <div id="kc-registration">
                        <span className="text-slate-600">
                            {msg("noAccount")}{" "}
                            <a 
                                tabIndex={8} 
                                href={url.registrationUrl}
                                className="font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                            >
                                {msg("doRegister")}
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="mt-6">
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-4 text-slate-500">
                                        {msg("identity-provider-login-label")}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {social.providers.map((p) => (
                                    <a
                                        key={p.alias}
                                        id={`social-${p.alias}`}
                                        href={p.loginUrl}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
                                    >
                                        {p.iconClasses && <i className={clsx("text-lg", p.iconClasses)} aria-hidden="true"></i>}
                                        {!p.iconClasses && p.alias === "google" && (
                                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                            </svg>
                                        )}
                                        {!p.iconClasses && p.alias !== "google" && <Shield size={20} />}
                                        <span dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}></span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className="space-y-5"
                        >
                            {!usernameHidden && (
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                                        {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")}
                                    </Label>
                                    <Input
                                        tabIndex={2}
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        placeholder="Masukkan email atau NIK"
                                        icon={<Mail size={18} />}
                                    />
                                    {messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className="text-sm text-red-600"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                                    {msg("password")}
                                </Label>
                                <PasswordInput
                                    tabIndex={3}
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                    placeholder="Masukkan password"
                                    icon={<Lock size={18} />}
                                />
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className="text-sm text-red-600"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <label className="flex cursor-pointer items-center gap-2">
                                            <input
                                                tabIndex={5}
                                                id="rememberMe"
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span className="text-sm text-slate-600">{msg("rememberMe")}</span>
                                        </label>
                                    )}
                                </div>
                                <div>
                                    {realm.resetPasswordAllowed && (
                                        <a 
                                            tabIndex={6} 
                                            href={url.loginResetCredentialsUrl}
                                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                                        >
                                            {msg("doForgotPassword")}
                                        </a>
                                    )}
                                </div>
                            </div>
                                        
                            <div id="kc-form-buttons">
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <Button
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-700"
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                >
                                    {msg("doLogIn")}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
