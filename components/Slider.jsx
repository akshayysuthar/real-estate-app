import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Slider = ({ imageList }) => {
  return (
    <div className="mt-5 ">
      {imageList ? (
        <Carousel>
          <CarouselContent>
            {imageList.map((item, index) => (
              <CarouselItem key={index}>
                <Image
                  src={item.url}
                  height={1000}
                  width={500}
                  alt="images"
                  className="object-cover  w-full rounded-xl h-[400px] "
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="w-full h-[200px] bg-slate-300 animate-pulse "></div>
      )}
    </div>
  );
};

export default Slider;
