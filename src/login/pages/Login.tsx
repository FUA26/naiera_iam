import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    FieldGroup,
    Field,
    FieldLabel,
    FieldError,
    FieldDescription,
    FieldSeparator
} from "@/components/ui/field";
import { Mail, Lock, Shield } from "lucide-react";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;

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
                                className="font-semibold text-red-600 hover:text-red-700 hover:underline"
                            >
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="mt-6 space-y-4">
                            <FieldSeparator>{msg("identity-provider-login-label")}</FieldSeparator>
                            
                            <div className="grid grid-cols-2 gap-3">
                                {social.providers.map((p) => (
                                    <Button
                                        key={p.alias}
                                        id={`social-${p.alias}`}
                                        variant="outline"
                                        asChild
                                        className="h-11 justify-center gap-2 border-slate-300 font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        <a href={p.loginUrl}>
                                            {p.iconClasses && <i className={clsx("text-lg", p.iconClasses)} aria-hidden="true"></i>}
                                            {!p.iconClasses && p.alias === "google" && (
                                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                </svg>
                                            )}
                                            {!p.iconClasses && p.alias !== "google" && <Shield size={18} />}
                                            <span dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}></span>
                                        </a>
                                    </Button>
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
                        >
                            <FieldGroup>
                                {/* Username / Email Field */}
                                {!usernameHidden && (
                                    <Field>
                                        <FieldLabel htmlFor="username">
                                            <span>
                                                {!realm.loginWithEmailAllowed
                                                    ? msg("username")
                                                    : !realm.registrationEmailAsUsername
                                                      ? msg("usernameOrEmail")
                                                      : msg("email")}
                                            </span>
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            tabIndex={2}
                                            id="username"
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                            placeholder={
                                                !realm.loginWithEmailAllowed
                                                    ? msgStr("username")
                                                    : !realm.registrationEmailAsUsername
                                                      ? msgStr("usernameOrEmail")
                                                      : msgStr("email")
                                            }
                                            icon={<Mail size={18} />}
                                        />
                                        {messagesPerField.existsError("username", "password") && (
                                            <FieldError>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                    }}
                                                />
                                            </FieldError>
                                        )}
                                    </Field>
                                )}

                                {/* Password Field */}
                                <Field>
                                    <div className="flex items-center justify-between gap-3">
                                        <FieldLabel htmlFor="password">
                                            <span>{msg("password")}</span>
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        {realm.resetPasswordAllowed && (
                                            <a 
                                                tabIndex={6} 
                                                href={url.loginResetCredentialsUrl}
                                                className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
                                            >
                                                {msg("doForgotPassword")}
                                            </a>
                                        )}
                                    </div>
                                    <PasswordInput
                                        tabIndex={3}
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        placeholder={msgStr("password")}
                                        icon={<Lock size={18} />}
                                    />
                                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                                        <FieldError>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                }}
                                            />
                                        </FieldError>
                                    )}
                                </Field>

                                {/* Remember Me Options Box */}
                                {realm.rememberMe && !usernameHidden && (
                                    <Field className="gap-3">
                                        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 transition-colors hover:bg-slate-50">
                                            <Checkbox 
                                                tabIndex={5}
                                                id="rememberMe"
                                                name="rememberMe"
                                                defaultChecked={!!login.rememberMe}
                                                className="mt-0.5"
                                            />
                                            <div className="grid gap-0.5 leading-snug">
                                                <label
                                                    htmlFor="rememberMe"
                                                    className="text-sm font-medium text-slate-800 cursor-pointer"
                                                >
                                                    {msg("rememberMe")}
                                                </label>
                                                <FieldDescription className="text-xs text-slate-500">
                                                    Simpan sesi login Anda pada perangkat ini untuk akses yang lebih cepat.
                                                </FieldDescription>
                                            </div>
                                        </div>
                                    </Field>
                                )}

                                {/* Form Submit Action */}
                                <Field>
                                    <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                    <Button
                                        tabIndex={7}
                                        disabled={isLoginButtonDisabled}
                                        size="lg"
                                        className="w-full bg-red-600 font-semibold text-white shadow-md shadow-red-600/20 hover:bg-red-700"
                                        name="login"
                                        id="kc-login"
                                        type="submit"
                                    >
                                        {msg("doLogIn")}
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
