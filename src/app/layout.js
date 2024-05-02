import { Inter } from "next/font/google";
import "./globals.css";
import { PROJECT_NAME_TITLE_CASE } from "@/constants";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "@/app/AuthProvider";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import StoreProvider from "./StoreProvider";
import TourProvider from "./TourProvider";
import TransitionBar from "./TransitionBar";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${PROJECT_NAME_TITLE_CASE} | You deserve the best`,
  description: "Your complete guidance for Engineering & Medical College Counselling",
  generator: "Next.js",
  applicationName: "Get Your College",
  // referrer: "origin-when-cross-origin",
  keywords: [
    "TNEA",
    "Get Your College",
    "College",
    "Medical",
    "Engineering",
    "Colleges",
    "Dinesh Kumar",
    "Counselling",
  ],
  authors: [
    { name: "Kartheeshwaran" },
    { name: "Dinesh Kumar", url: "https://www.youtube.com/c/A2KDK" },
  ],
  creator: "Sachin",
  publisher: "Sachin",
  metadataBase: new URL("https://www.getyourcollege.com"),
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className + ` bg-background`}>
        <AuthProvider>
          <StoreProvider>
            <TourProvider>
              <MantineProvider>
                <TransitionBar />
                {children}
                <Analytics />
              </MantineProvider>
            </TourProvider>
          </StoreProvider>
        </AuthProvider>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Slide}
        />
      </body>
    </html>
  );
}
