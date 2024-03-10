import { Inter } from "next/font/google";
import "./globals.css";
import { PROJECT_NAME_TITLE_CASE } from "@/constants";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "@/app/AuthProvider";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${PROJECT_NAME_TITLE_CASE} | You deserve the best`,
  description: "Search best colleges for you quicker!",
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
            <MantineProvider>{children}</MantineProvider>
          </StoreProvider>
        </AuthProvider>
        <ToastContainer
          position='bottom-right'
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
