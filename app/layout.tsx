import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"MATRA-X | Alchemy Architects",description:"Material Intelligence, Reasoning & Traceability Architecture"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
