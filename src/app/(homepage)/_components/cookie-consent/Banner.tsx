"use client";

import { useEffect } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent";

export const CookieConsentBanner = () => {
  const hasConsented = typeof window !== "undefined" && localStorage.getItem(COOKIE_CONSENT_KEY) === "true";

  if (hasConsented) {
    return null;
  }

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === "false") {
      // User declined, hide banner and don't load analytics
      // Analytics will be blocked by layout.tsx
    }
  }, []);

  if (!hasConsented) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 max-w-screen mx-auto px-6 py-4 text-gray-800"
        aria-label="Cookie consent banner"
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <p className="font-medium">
{" "}{" "}We use analytics cookies to understand how visitors interact with our site.{" "}{" "}{" "}{" "}{" "}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                localStorage.setItem(COOKIE_CONSENT_KEY, "true");
                window.location.reload();
              }}
              className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-500 transition-colors"
            >
              Accept analytics
            </button>
            <button
              onClick={() => {
                localStorage.setItem(COOKIE_CONSENT_KEY, "false");
                window.location.reload();
              }}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              decline
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};