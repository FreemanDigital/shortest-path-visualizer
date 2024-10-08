import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./components/header/Header";
import Options from "./components/options/Options";

import { OptionsProvider } from "./context/OptionsContext";
import { ClickModeProvider } from "./context/ClickModeContext";
import { SearchProvider } from "./context/SearchContext";
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <OptionsProvider>
            <ClickModeProvider>
                <SearchProvider>
                    <body className={inter.className}>
                        <Header />
                        {children}
                        <Options />
                        <Footer />
                    </body>
                </SearchProvider>
            </ClickModeProvider>
        </OptionsProvider>
    </html>
  );
}
