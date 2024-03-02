import { Inter } from "next/font/google";
import "./globals.css";
import { PROJECT_NAME_TITLE_CASE } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${PROJECT_NAME_TITLE_CASE} | You deserve the best`,
  description: "Search best colleges for you quicker!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ` bg-background`}>{children}</body>
    </html>
  );
}
