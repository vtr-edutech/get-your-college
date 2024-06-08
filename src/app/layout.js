import { Inter } from "next/font/google";
import "./globals.css";
import { PROJECT_NAME_TITLE_CASE } from "@/constants";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "@/app/AuthProvider";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import StoreProvider from "./StoreProvider";
import TourProvider from "./TourProvider";
import TransitionBar from "./TransitionBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${PROJECT_NAME_TITLE_CASE} | You deserve the best`,
  description: "Your complete guidance for Engineering & Medical College Counselling. Look for the most suitable colleges for your choice of career. Currently catering college admissions and guidances all over Tamil Nadu",
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
    "VTR",
    "Edu Tech",
    "Counselling",
    "Tamil Nadu",
    "Andhra Pradesh",
    "NEET",
    "Quota",
    "Minority",
    "Admissions",
    "Easy to use",
    "Guidance",
    "Free",
    "Kerala",
  ],
  authors: [
    { name: "Kartheeshwaran" },
    { name: "Dinesh Kumar", url: "https://www.youtube.com/c/A2KDK" },
  ],
  creator: "Sachin",
  publisher: "Sachin",
  metadataBase: new URL("https://www.getyourcollege.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className + ` bg-background`}>
        <GoogleAnalytics gaId="G-TGKTNWEQ2S" />
        <AuthProvider>
          <StoreProvider>
            <TourProvider>
              <MantineProvider>
                <TransitionBar />
                {children}
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
