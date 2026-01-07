import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import logoPngUrl from "./assets/img/naiera.png";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="w-full lg:grid lg:grid-cols-2 bg-white">
            

              {/* Kiri: Form login */}
            <div className="mx-auto flex min-h-screen w-[350px] flex-col justify-center gap-y-6 py-12">
                <div className="w-full max-w-md">
                    {/* Logo & Title */}
                    <div className="mb-8">
                        <a href="/" className="group mb-6 inline-flex items-center gap-3">
                            <img 
                                src={logoPngUrl}
                                alt="Naiera Logo" 
                                className="h-12 w-12 rounded-xl object-cover"
                            />
                            <div>
                                <h1 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-emerald-600">Super App Naiera</h1>
                                <p className="text-sm text-slate-500">Kabupaten Naiera</p>
                            </div>
                        </a>

                        {/* Dynamic Header from Keycloak or Fallback */}
                        <h2 className="mb-2 text-3xl font-bold text-slate-800">{headerNode}</h2>
                        <p className="text-slate-600">Masuk untuk mengakses layanan digital Kabupaten Naiera</p>
                    </div>

                    {/* Messages / Alerts */}
                    {displayMessage && message !== undefined && (message?.type !== "warning" || !isAppInitiatedAction) && (
                        <div
                            className={clsx("mb-4 rounded-md p-4 text-sm", {
                                "bg-red-50 text-red-600": message?.type === "error",
                                "bg-emerald-50 text-emerald-600": message?.type === "success",
                                "bg-yellow-50 text-yellow-600": message?.type === "warning",
                                "bg-blue-50 text-blue-600": message?.type === "info"
                            })}
                        >
                            <span dangerouslySetInnerHTML={{ __html: kcSanitize(message?.summary ?? "") }} />
                        </div>
                    )}

                    {/* Form Content (Children) */}
                    <div className="space-y-5">{children}</div>

                    {/* Social Providers */}
                    {socialProvidersNode}

                    {/* Footer / Info / Register */}
                    {(displayInfo || (auth !== undefined && auth?.showTryAnotherWayLink)) && (
                        <div className="mt-8 text-center">
                            {auth !== undefined && auth?.showTryAnotherWayLink && (
                                <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mb-4">
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <a
                                        href="#"
                                        onClick={() => {
                                            document.forms["kc-select-try-another-way-form" as never].requestSubmit();
                                            return false;
                                        }}
                                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </form>
                            )}

                            {displayInfo && (
                                <p className="text-slate-600">
                                    {infoNode}
                                </p>
                            )}
                        </div>
                    )} 
                </div>
            </div>

            {/* Right Side - Image/Info */}
            <div className="flex-col justify-center bg-muted bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-700 px-12 max-lg:hidden flex">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-white blur-3xl" />
                    <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-white blur-3xl" />
                </div>

                <div className="relative z-10 max-w-lg text-white">
                    <h2 className="mb-6 text-4xl font-bold">Akses Semua Layanan dalam Satu Aplikasi</h2>
                    <p className="mb-8 text-xl leading-relaxed text-emerald-50">
                        Lebih dari 100+ layanan pemerintahan Kabupaten Naiera siap melayani Anda 24/7 dengan cepat, mudah, dan aman.
                    </p>

                    <div className="space-y-4">
                        {[
                            "✓ E-KTP, KK, dan layanan kependudukan",
                            "✓ Pembayaran pajak dan retribusi online",
                            "✓ Perizinan usaha dan IMB",
                            "✓ Layanan kesehatan dan pendidikan"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-lg text-emerald-50">
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                        <p className="mb-2 text-sm text-emerald-100">Dipercaya oleh</p>
                        <p className="text-3xl font-bold">50.000+ Pengguna</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
