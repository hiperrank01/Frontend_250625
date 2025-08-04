import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import intro1 from "@/public/info1.png";
import intro2 from "@/public/info2.png";
import intro3 from "@/public/info3.png";
import intro4 from "@/public/info4.png";
import Image from "next/image";

export default function intro() {
  const introImages = [intro1, intro2, intro3, intro4];
  return (
    <div>
      <Header />
      <div className="min-h-screen w-full mt-8">
        {introImages.map((img, idx) => (
          <Image
            key={idx}
            src={img.src}
            width={60}
            height={60}
            alt={`intro-${idx + 1}`}
            className="w-3/4 mb-2 object-contain block mx-auto"
          />
        ))}
      </div>
      <a href="/down/나인위닛_회사소개서.pdf">
        <button>회사소개서 pdf파일 받기</button>
      </a>

      <Footer />
    </div>
  );
}
