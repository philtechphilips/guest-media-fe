"use client";
import { BG_IMG, COUPLE } from "@/assets/images";
import Image from "next/image";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function Home() {
  const [uploadPageActive, setUploadPageActive] = useState(false);
  const router = useRouter();

  const toggleUploadPage = () => {
    setUploadPageActive((prev) => !prev);
  };

  useEffect(() => {
    gsap.fromTo(
      ".heading",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.5 }
    );
    gsap.fromTo(
      ".description",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
    gsap.fromTo(
      ".share-button",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1, stagger: 0.5 }
    );
  }, []);
  return (
    <main className="relative p-5 pr-0 pl-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          alt="wedding"
          src={BG_IMG}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-75"
        />
      </div>

      <div className="py-10 px-5">
        <h1 className="uppercase text-white text-xs mb-2 heading">
          A promise of forever
        </h1>
        <h1
          className="uppercase text-white font-[Love] text-4xl mb-2 heading"
          style={{ letterSpacing: "4px" }}
        >
          seye &
        </h1>
        <h1
          className="uppercase text-white font-[Love] text-4xl mb-2 heading"
          style={{ letterSpacing: "4px" }}
        >
          timileyin
        </h1>

        <p className="mt-8 text-white heading">
          Capture the Magic? Share your cherished moments with us by uploading
          your photos and videos of this unforgettable celebration. Let’s create
          lasting memories together.
        </p>

        <div
          onClick={() => router.push("/upload-memory")}
          className="text-white share-button cursor-pointer mt-2 border rounded-sm border-white w-fit px-4 py-1"
        >
          <p>Click to Upload</p>
        </div>
      </div>
      <div className="flex justify-center w-full gap-2 px-4">
        <div className="w-48 max-h-56 px-3 py-4 bg-white share-button">
          <Image
            alt="wedding"
            src={BG_IMG}
            layout="fit"
            objectFit="contain"
            className="brightness-75 max-h-56 pb-8"
          />
        </div>

        <div className="w-48 max-h-56 px-3 py-4 mt-6 bg-white share-button">
          <Image
            alt="wedding"
            src={COUPLE}
            layout="fit"
            objectFit="contain"
            className="brightness-75 max-h-56 pb-8"
          />
        </div>
      </div>

      <div className="flex w-full justify-center gap-2 mt-4 px-4">
        <div className="w-48 -mt-6 max-h-56 px-3 py-4 bg-white share-button">
          <Image
            alt="wedding"
            src={BG_IMG}
            layout="fit"
            objectFit="contain"
            className="brightness-75 max-h-56 pb-8"
          />
        </div>

        <div className="w-48 max-h-56 px-3 py-4 bg-white share-button">
          <Image
            alt="wedding"
            src={COUPLE}
            layout="fit"
            objectFit="contain"
            className="brightness-75 max-h-56 pb-8"
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 min-w-full min-h-full -z-10 bg-black opacity-65"></div>
    </main>
  );
}

