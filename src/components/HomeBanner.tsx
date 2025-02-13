import Image from "next/image";

export default function HomeBanner() {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700">
      <div className="max-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="text-center md:mb-0 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Summer sale
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy discount on selected items
          </p>
          <p className="text-2xl md:5xl text-yellow-400 font-bold">
            GET 50% OFF
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            fill
            alt="Baner Image"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
