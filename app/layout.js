import { Poppins } from "next/font/google";
import "./globals.css";




const font = Poppins({
  subsets: ["latin"],
  weight: "400"
})

export const metadata = {
  title: "LeJob",
  description: "get a job based on your resume",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased bg-slate-50 text-slate-900`}>
        {children}
        
      </body>
    </html>
  );
}
