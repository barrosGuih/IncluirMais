import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Incluir +",
  description: "Software education for Schools",
  icons:{
    icon:['/favicon.png?v=4']}
  }

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
     
     <body>
     {children}
     </body>
    </html>
  );
}
