import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <p>Welcome to the homepage!</p>
        <p>Please press the button that suits your needs!</p>
        <button className="btn btn-outline btn-secondary">
          <Link href="/recipelist">List recipes</Link>
        </button>
        <button className="btn btn-outline">What should I cook?</button>
      </div>
    </main>
  );
}
