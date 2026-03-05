import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const dmSans = DM_Sans({ subsets: ["latin"], variable: '--font-dm-sans' });

export const metadata = {
  title: "Incluir +",
  description: "Software education for Schools",
  icons: { icon: ['/favicon.png?v=4'] }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${dmSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}