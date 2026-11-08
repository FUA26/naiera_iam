import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
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
                <p className="text-sm text-slate-500 text-center">
                    {realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
                </p>
            }
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" action={url.loginAction} method="post">
                <FieldGroup>
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
                            type="text"
                            id="username"
                            name="username"
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                            placeholder={msgStr("usernameOrEmail")}
                            icon={<Mail size={18} />}
                        />
                        {messagesPerField.existsError("username") && (
                            <FieldError>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("username"))
                                    }}
                                />
                            </FieldError>
                        )}
                    </Field>

                    <div className="flex items-center justify-between pt-1">
                        <Button variant="link" asChild className="p-0 h-auto gap-1 text-red-600 hover:text-red-700">
                            <a href={url.loginUrl}>
                                <ArrowLeft size={16} />
                                {msg("backToLogin")}
                            </a>
                        </Button>
                    </div>

                    <Field>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-red-600 font-semibold text-white shadow-md shadow-red-600/20 hover:bg-red-700"
                        >
                            {msgStr("doSubmit")}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </Template>
    );
}
