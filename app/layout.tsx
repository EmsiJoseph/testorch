import type { Metadata } from "next"
import NextTopLoader from 'nextjs-toploader';


import "./globals.css"

import { Inter } from "next/font/google"
import Script from "next/script"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/common/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Testorch | Ample Tech",
  description:
    "Testorch is a load testing framework",
  metadataBase: new URL("https://testorch.com:8443"),
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
      <NextTopLoader
          color="#FF3737"
          height={2}         // Height of 4px
          showSpinner={false} // Disable spinner
          shadow="0 0 10px #FFFF00, 0 0 5px #FFFF00" // Custom yellow shadow
      />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Toaster position="bottom-right" />
        <Script id="heap">
          {`window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("1279799279");`}
        </Script>
      </body>
    </html>
  )
}
