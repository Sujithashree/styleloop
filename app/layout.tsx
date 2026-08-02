import "./globals.css";
import Navbar from "./components/layout/Navbar";

export const metadata = {
  title: "StyleLoop",
  description: "AI-Powered Fashion Social Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
