import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" action={url.loginAction} method="post" className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="password-new" className="text-sm font-medium text-slate-700">
                        {msg("passwordNew")}
                    </Label>
                    <PasswordInput
                        id="password-new"
                        name="password-new"
                        autoFocus
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        placeholder="Masukkan password baru"
                        icon={<Lock size={18} />}
                    />
                    {messagesPerField.existsError("password") && (
                        <span
                            id="input-error-password"
                            className="text-sm text-red-600"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("password"))
                            }}
                        />
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password-confirm" className="text-sm font-medium text-slate-700">
                        {msg("passwordConfirm")}
                    </Label>
                    <PasswordInput
                        id="password-confirm"
                        name="password-confirm"
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        placeholder="Konfirmasi password baru"
                        icon={<Lock size={18} />}
                    />
                    {messagesPerField.existsError("password-confirm") && (
                        <span
                            id="input-error-password-confirm"
                            className="text-sm text-red-600"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("password-confirm"))
                            }}
                        />
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="logout-sessions" 
                        name="logout-sessions" 
                        value="on" 
                        defaultChecked={true}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="logout-sessions" className="text-sm text-slate-600 cursor-pointer">
                        {msg("logoutOtherSessions")}
                    </Label>
                </div>

                <div id="kc-form-buttons" className="flex gap-3">
                    <Button
                        type="submit"
                        className="flex-1 rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-700"
                        size="lg"
                    >
                        {msgStr("doSubmit")}
                    </Button>
                    {isAppInitiatedAction && (
                        <Button
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            variant="outline"
                            className="rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50"
                            size="lg"
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
