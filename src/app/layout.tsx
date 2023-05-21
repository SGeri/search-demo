import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Advanced Search",
  description:
    "A demo project to showcase the ability of ElasticSearch combined with GPT-3",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
