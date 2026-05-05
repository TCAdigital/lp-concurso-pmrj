import type { Metadata } from "next";
import { Archivo, Inter, Outfit } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["900"],
});

export const metadata: Metadata = {
  title: "Praticar Online | Preparatório Concurso PMERJ 2026 - O Caminho da Farda",
  description: "O preparatório líder em aprovação para o Concurso PMERJ 2026. Estude com o método Praticar de Ensino e conquiste sua vaga na Polícia Militar do Rio de Janeiro. +15.000 alunos aprovados.",
  keywords: "concurso pmerj 2026, preparatório pmerj, praticar online, policia militar rj, curso pmerj, soldado pmerj, pmerj soldado 2026",
  openGraph: {
    type: "website",
    url: "https://www.praticaronline.com.br/pmerj",
    title: "Praticar Online | Preparatório Concurso PMERJ 2026",
    description: "Conquiste sua vaga na Polícia Militar do Rio com quem mais aprova. Estude com o Método Praticar!",
    images: ["https://raw.githubusercontent.com/TCAdigital/lp-concurso-pmrj/main/public/assets/hero_final_bg.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praticar Online | Preparatório Concurso PMERJ 2026",
    description: "O seu caminho para a farda da PMERJ começa aqui. +15 mil aprovados!",
    images: ["https://raw.githubusercontent.com/TCAdigital/lp-concurso-pmrj/main/public/assets/hero_final_bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,900;1,900&family=Inter:wght@400;600&family=Outfit:wght@900&display=swap" rel="stylesheet" />
      </head>
      <body className="noise-bg">{children}</body>
    </html>
  );
}
