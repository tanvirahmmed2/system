
import "./globals.css";


export const metadata = {
  title: "Disibin",
  description: "Disibin WEb Page",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
