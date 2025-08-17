import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Lexend } from "next/font/google";
import Provider from "./provider";
import ResponsiveGuard from "@/components/ResponsiveGuard";
const lexend = Lexend({
  subsets: ["latin"],
});

export const metadata = {
  title: "NotaMind",
  description: "Intelligent web app for uploading and interacting with PDFs using AI",
  icons: {
    icon: "/website.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider> 
    <html lang="en">
      <body
        className={ lexend.className }
      >
        <Provider>
            <ResponsiveGuard>
              {children}
            </ResponsiveGuard>
        </Provider>
      </body>
    </html>
    </ClerkProvider> 
  );
}
