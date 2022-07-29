import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id="darkMode"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }`,
          }}
        ></Script>
      </body>
    </Html>
  );
}
