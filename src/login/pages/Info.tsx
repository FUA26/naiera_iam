import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ?? message.summary)
                    }}
                />
            }
        >
            <div id="kc-info-message" className="space-y-6">
                <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <p
                            className="text-sm text-emerald-700"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(
                                    (() => {
                                        let html = message.summary?.trim();

                                        if (requiredActions) {
                                            html += " <b>";

                                            html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                            html += "</b>";
                                        }

                                        return html;
                                    })()
                                )
                            }}
                        />
                    </div>
                </div>
                
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <a 
                                href={pageRedirectUri} 
                                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-300 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                        <ArrowRight size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800">{msg("backToApplication")}</p>
                                        
                                    </div>
                                </div>
                                <ArrowRight size={20} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                            </a>
                        );
                    }
                    if (actionUri) {
                        return (
                            <a 
                                href={actionUri} 
                                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-300 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                        <ArrowRight size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800">{msg("proceedWithAction")}</p>
                                        
                                    </div>
                                </div>
                                <ArrowRight size={20} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                            </a>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <a 
                                href={client.baseUrl} 
                                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-300 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                        <ArrowRight size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800">{msg("backToApplication")}</p>
                                        
                                    </div>
                                </div>
                                <ArrowRight size={20} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                            </a>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
