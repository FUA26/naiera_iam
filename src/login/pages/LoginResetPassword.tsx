import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={
                <p className="text-sm text-slate-500">
                    {realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
                </p>
            }
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" action={url.loginAction} method="post" className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                        {!realm.loginWithEmailAllowed
                            ? msg("username")
                            : !realm.registrationEmailAsUsername
                              ? msg("usernameOrEmail")
                              : msg("email")}
                    </Label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        autoFocus
                        defaultValue={auth.attemptedUsername ?? ""}
                        aria-invalid={messagesPerField.existsError("username")}
                        placeholder="Masukkan email atau NIK"
                        icon={<Mail size={18} />}
                    />
                    {messagesPerField.existsError("username") && (
                        <span
                            id="input-error-username"
                            className="text-sm text-red-600"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("username"))
                            }}
                        />
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <a 
                        href={url.loginUrl}
                        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                    >
                        <ArrowLeft size={16} />
                        {msg("backToLogin")}
                    </a>
                </div>

                <div id="kc-form-buttons">
                    <Button
                        type="submit"
                        className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-700"
                        size="lg"
                    >
                        {msgStr("doSubmit")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
