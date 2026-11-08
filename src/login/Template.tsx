import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import logoPngUrl from "./assets/img/siji.png";
import { Button } from "@/components/ui/button";
import { ChevronLeft, KeyRound, ShieldCheck, Zap } from "lucide-react";

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
    const { msg } = i18n;
    const { auth, url, message, isAppInitiatedAction } = kcContext;

    // Determine back URL: use client's base URL if available, otherwise login URL
    const backUrl = (kcContext as any).client?.baseUrl || url.loginUrl;

    useEffect(() => {
        document.title = documentTitle ?? "SIJI - Single Identity Jaringan Integrasi | Pemkab Malang";
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
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-10 animate-spin rounded-full border-[3px] border-red-100 border-t-red-600" />
                    <p className="text-sm text-slate-400">Memuat...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="relative min-h-screen w-full overflow-x-hidden md:overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-white">
            {/* Sisi Kiri: Hero & Feature List (Desktop) */}
            <div className="relative hidden md:flex min-w-0 flex-col justify-between overflow-hidden border-r border-slate-200 bg-slate-50/60 p-8 md:w-full xl:p-12">
                {/* Radial Dot Pattern Background */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 50% 50%, #dc2626 1px, transparent 1px)",
                        backgroundSize: "32px 32px"
                    }}
                />

                {/* Header Brand */}
                <div className="relative z-10 flex items-center gap-3">
                    <img 
                        src={logoPngUrl} 
                        alt="Logo SIJI Pemkab Malang" 
                        className="size-10 rounded-lg object-cover shadow-sm"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                                SIJI
                            </span>
                            <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                                SSO
                            </span>
                        </div>
                        <span className="text-xs font-medium text-slate-500 block mt-0.5">
                            Single Identity Jaringan Integrasi
                        </span>
                    </div>
                </div>

                {/* Main Hero Content */}
                <div className="relative z-10 mt-12 max-w-lg">
                    <h1 className="max-w-xl text-3xl font-bold tracking-tight text-balance text-slate-900 md:text-4xl lg:text-5xl leading-tight">
                        Satu Akun SSO.
                        <br />
                        <span className="text-red-600">Akses Seluruh Layanan.</span>
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
                        Aplikasi Single Sign-On (SSO) resmi Pemerintah Kabupaten Malang untuk mengakses seluruh portal publik dan sistem pemerintahan terintegrasi.
                    </p>

                    <div className="mt-10 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xs">
                                <KeyRound className="size-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="mb-0.5 text-sm font-semibold text-slate-900">
                                    Akses Terpadu Single Sign-On
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Cukup satu kali login untuk mengakses beragam portal layanan publik dan aplikasi internal Pemkab Malang.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xs">
                                <ShieldCheck className="size-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="mb-0.5 text-sm font-semibold text-slate-900">
                                    Jaringan Integrasi Aman
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Autentikasi identitas digital terenkripsi yang menjamin keamanan akses dan perlindungan data pengguna.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xs">
                                <Zap className="size-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="mb-0.5 text-sm font-semibold text-slate-900">
                                    Navigasi Cepat 24/7
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Kemudahan beralih antar aplikasi layanan pemerintahan tanpa perlu memasukkan kata sandi berulang kali.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Card Mockup Preview (Bottom Right) */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute right-0 bottom-16 hidden w-[370px] translate-x-1/4 rotate-[-3deg] flex-col gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl lg:flex"
                >
                    <div className="flex items-center gap-3">
                        <img src={logoPngUrl} alt="Logo Pemkab Malang" className="size-10 rounded-xl object-cover" />
                        <div>
                            <h4 className="text-sm font-bold text-slate-900">Pemerintah Kabupaten Malang</h4>
                            <p className="text-xs text-slate-500">SIJI - Single Identity Jaringan Integrasi</p>
                        </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-red-100">
                        <div className="h-full w-4/5 rounded-full bg-red-600" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>Layanan SSO Terpadu</span>
                        <span className="font-semibold text-red-600">Akses Terverifikasi</span>
                    </div>
                </div>
            </div>

            {/* Sisi Kanan: Form Authentication Container */}
            <div className="relative flex min-h-screen w-full min-w-0 flex-col justify-center overflow-hidden px-6 py-12 sm:px-8 sm:py-14 lg:w-full">
                {/* Back to Home Button */}
                <Button
                    asChild
                    className="absolute top-5 left-4 sm:top-7 sm:left-5"
                    variant="ghost"
                    size="sm"
                >
                    <a href={backUrl}>
                        <ChevronLeft className="size-4" />
                        <span>Kembali ke Beranda</span>
                    </a>
                </Button>

                <div className="mx-auto w-full max-w-md space-y-6 sm:space-y-7">
                    {/* Circle Badge Icon & Title */}
                    <div className="space-y-3 text-center">
                        <div className="flex w-full justify-center">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/25">
                                <img src={logoPngUrl} alt="SIJI Logo" className="size-8 object-contain" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                {headerNode}
                            </h1>
                            <p className="text-sm text-slate-500">
                                Masuk ke SIJI - Pemkab Malang untuk mengakses seluruh layanan
                            </p>
                        </div>
                    </div>

                    {/* Messages & Error Notifications */}
                    {displayMessage && message !== undefined && (message?.type !== "warning" || !isAppInitiatedAction) && (
                        <div
                            className={clsx("rounded-xl p-4 text-sm font-medium border shadow-xs", {
                                "bg-red-50 text-red-700 border-red-200": message?.type === "error",
                                "bg-emerald-50 text-emerald-700 border-emerald-200": message?.type === "success",
                                "bg-amber-50 text-amber-700 border-amber-200": message?.type === "warning",
                                "bg-blue-50 text-blue-700 border-blue-200": message?.type === "info"
                            })}
                        >
                            <span dangerouslySetInnerHTML={{ __html: kcSanitize(message?.summary ?? "") }} />
                        </div>
                    )}

                    {/* Main Form Content (Children) */}
                    <div>{children}</div>

                    {/* Social Login Providers */}
                    {socialProvidersNode}

                    {/* Footer Extra Links / Info */}
                    {(displayInfo || (auth !== undefined && auth?.showTryAnotherWayLink)) && (
                        <div className="mt-6 text-center">
                            {auth !== undefined && auth?.showTryAnotherWayLink && (
                                <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mb-4">
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <a
                                        href="#"
                                        onClick={() => {
                                            document.forms["kc-select-try-another-way-form" as never].requestSubmit();
                                            return false;
                                        }}
                                        className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </form>
                            )}

                            {displayInfo && (
                                <div className="text-sm text-slate-600">
                                    {infoNode}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
