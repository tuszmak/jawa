import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import HomeImage from "../images/homepageImage.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen items-center justify-between ${inter.className} font-sans`}
    >
      <div className="flex flex-col items-center h-screen lg:w-1/2">
        <div className="h-1/3"></div>
        <div className="flex flex-col gap-7 items-center">
          <p className="text-2xl ">
            Ran out of ideas? You don&apos;t know what to cook?
          </p>
          <p className="text-2xl text-pink-500">You came to the right place!</p>
        </div>
        <div className="m-10 flex flex-col gap-12 lg:flex-row ">
          <button className="btn btn-outline btn-secondary ">
            <Link href="/recipelist">List recipes</Link>
          </button>
          <button className="btn btn-outline" disabled>
            What should I cook?
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 h-screen flex content-end ">
        <Image
          src={HomeImage}
          alt="Food"
          width={0}
          height={0}
          className="hidden lg:flex"
        />
      </div>
    </main>
  );
}
