import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div id="kc-error-message" className="space-y-6">
                <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p 
                            className="text-sm text-red-700"
                            dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} 
                        />
                    </div>
                </div>
                
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <a 
                        href={client.baseUrl} 
                        className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                <ArrowLeft size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-slate-800">{msg("backToApplication")}</p>
                                <p className="text-sm text-slate-500">Kembali ke aplikasi</p>
                            </div>
                        </div>
                        <ArrowLeft size={20} className="text-slate-400 group-hover:text-slate-600 group-hover:-translate-x-1 transition-all" />
                    </a>
                )}
            </div>
        </Template>
    );
}
