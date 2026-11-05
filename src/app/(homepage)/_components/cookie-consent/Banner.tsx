"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent";

type ConsentState = "unknown" | "pending" | "granted" | "declined";

type CookieConsentBannerProps = {
  /** Google Analytics measurement ID. Analytics stays off when it is empty. */
  gaId?: string;
  /** Google Tag Manager script URL. Analytics stays off when it is empty. */
  gtmUrl?: string;
};

function readStoredConsent(): ConsentState {
  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === "true") return "granted";
    if (stored === "false") return "declined";
  } catch {
    // localStorage can be blocked; treat it as no choice made yet.
  }
  return "pending";
}

export const CookieConsentBanner = ({
  gaId,
  gtmUrl,
}: CookieConsentBannerProps) => {
  // "unknown" until the browser has been read, so the server render and the
  // first client render match and nothing flashes or loads before the choice.
  const [consent, setConsent] = useState<ConsentState>("unknown");

  useEffect(() => {
    setConsent(readStoredConsent());
  }, []);

  const choose = (value: boolean) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, String(value));
    } catch {
      // The choice still applies for this visit if it can't be saved.
    }
    setConsent(value ? "granted" : "declined");
  };

  const analyticsEnabled = consent === "granted" && Boolean(gaId && gtmUrl);

  return (
    <>
      {analyticsEnabled && (
        <>
          <Script async src={`${gtmUrl}?id=${gaId}`} />
          <Script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(gaId)}, {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      {consent === "pending" && (
        <div
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-6 py-4 text-gray-800 shadow-lg"
        >
          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-4">
            <p className="font-medium">
              We use analytics cookies to understand how visitors interact with
              our site.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => choose(true)}
                className="rounded-md bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-500"
              >
                Accept analytics
              </button>
              <button
                type="button"
                onClick={() => choose(false)}
                className="rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-200"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
