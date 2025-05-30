import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";




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
      <body
        className={`${font.className} antialiased`}
      >
         
        <Navbar />
        
        {children}
        
      </body>
    </html>
  );
}
