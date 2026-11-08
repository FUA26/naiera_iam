import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
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
            <form id="kc-passwd-update-form" action={url.loginAction} method="post">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="password-new">
                            <span>{msg("passwordNew")}</span>
                            <span className="text-destructive">*</span>
                        </FieldLabel>
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
                            <FieldError>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("password"))
                                    }}
                                />
                            </FieldError>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password-confirm">
                            <span>{msg("passwordConfirm")}</span>
                            <span className="text-destructive">*</span>
                        </FieldLabel>
                        <PasswordInput
                            id="password-confirm"
                            name="password-confirm"
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            placeholder="Konfirmasi password baru"
                            icon={<Lock size={18} />}
                        />
                        {messagesPerField.existsError("password-confirm") && (
                            <FieldError>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("password-confirm"))
                                    }}
                                />
                            </FieldError>
                        )}
                    </Field>

                    <Field className="gap-3">
                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                            <Checkbox 
                                id="logout-sessions" 
                                name="logout-sessions" 
                                value="on" 
                                defaultChecked={true}
                            />
                            <label htmlFor="logout-sessions" className="text-sm font-medium text-slate-800 cursor-pointer">
                                {msg("logoutOtherSessions")}
                            </label>
                        </div>
                    </Field>

                    <Field className="flex-row gap-3">
                        <Button
                            type="submit"
                            size="lg"
                            className="flex-1 bg-red-600 font-semibold text-white shadow-md shadow-red-600/20 hover:bg-red-700"
                        >
                            {msgStr("doSubmit")}
                        </Button>
                        {isAppInitiatedAction && (
                            <Button
                                type="submit"
                                name="cancel-aia"
                                value="true"
                                variant="outline"
                                size="lg"
                                className="border-slate-300 text-slate-700 hover:bg-slate-50"
                            >
                                {msg("doCancel")}
                            </Button>
                        )}
                    </Field>
                </FieldGroup>
            </form>
        </Template>
    );
}
