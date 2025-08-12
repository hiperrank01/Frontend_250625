import React, { useState } from "react";
import { useSharedDragToScroll } from "@/hooks/use-shared-drag-to-scroll";
import Image from "next/image";
import { youtubeCategories } from "@/data/youtube-data";
import { Video, Category } from "@/types/youtube";

interface ScrollableRowProps {
  category: Category;
}

interface VideoItemProps {
  video: Video;
  categoryTitle: string;
  videoIndex: number;
}

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  categoryTitle,
  videoIndex,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseUrl = `https://www.youtube.com/embed/${video.id}`;

  const videoSrc = isHovered ? `${baseUrl}?autoplay=1&mute=1&rel=0` : baseUrl;

  return (
    <div
      className="flex-shrink-0 w-64 h-40 bg-gray-200 rounded-lg overflow-hidden select-none"
      onDragStart={(e) => e.preventDefault()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <iframe
        className="w-full h-full"
        src={videoSrc}
        title={`YouTube video player - ${categoryTitle} ${videoIndex + 1}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const ScrollableRow: React.FC<ScrollableRowProps> = ({ category }) => {
  const { draggableRef, scrollableRef } = useSharedDragToScroll<
    HTMLDivElement,
    HTMLDivElement
  >();

  return (
    <div ref={draggableRef} className="relative">
      <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
      <div
        ref={scrollableRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
      >
        {category.videos.map((video, videoIndex) => (
          <VideoItem
            key={videoIndex}
            video={video}
            categoryTitle={category.title}
            videoIndex={videoIndex}
          />
        ))}
      </div>
    </div>
  );
};

export const Creative = () => {
  return (
    <div className="w-full mt-8 space-y-8">
      {youtubeCategories.map((category, index) => (
        <ScrollableRow key={index} category={category} />
      ))}
      <div className="flex flex-col items-center justify-center mt-8">
        <Image
          src="/단가표.png"
          alt="단가표"
          className="max-w-full h-auto"
          width={1000}
          height={200}
        />
        <p className="text-sm text-gray-500 mt-4">부가세 미포함</p>
        <p className="text-sm text-gray-500">※계좌이체 입금</p>
        <p className="text-sm text-gray-500">※세금계산서 발행 가능합니다.</p>
      </div>
    </div>
  );
};
