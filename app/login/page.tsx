/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

interface Providers {
  [key: string]: any;
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    async function fetchProviders() {
      const fetchedProviders = await getProviders();
      setProviders(fetchedProviders);
    }
    fetchProviders();
  }, []);

  if (!providers) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 z-20">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black z-20">
      <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Sign In
        </h1>
        <div className="space-y-4">
          {Object.values(providers).map((provider) => {
            let buttonStyle = "";
            let hoverStyle = "";
            let iconSrc = "";

            // Apply specific styles based on the provider
            switch (provider.name.toLowerCase()) {
              case "google":
                buttonStyle = "bg-white border border-gray-300 text-gray-700";
                hoverStyle = "hover:bg-gray-50";
                iconSrc = "https://authjs.dev/img/providers/google.svg";
                break;
              case "github":
                buttonStyle = "bg-gray-500 text-white";
                hoverStyle = "hover:bg-gray-700";
                iconSrc = "https://authjs.dev/img/providers/github.svg";
                break;
              default:
                buttonStyle = "bg-blue-600 text-white";
                hoverStyle = "hover:bg-blue-700";
                break;
            }

            return (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id)}
                  className={`w-72 flex items-center justify-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md ${buttonStyle} ${hoverStyle}`}
                >
                  {iconSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={iconSrc}
                      alt={provider.name}
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  <span>Sign in with {provider.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
