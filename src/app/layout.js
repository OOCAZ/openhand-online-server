import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
async function dataConnect() {
  try {
    const session = await mongoose.connect(process.env.DATABASE_ACCESS);
  } catch (err) {
    console.log(err);
  }
}

export const metadata = {
  title: "Open Hand Server",
  description:
    "A simple board for displaying numbers of ready orders for the open hand food pantry.",
};

export default function RootLayout({ children }) {
  dataConnect();
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
