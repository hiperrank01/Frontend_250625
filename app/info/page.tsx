import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import info1 from "@/public/info1.png";
import info2 from "@/public/info2.png";
import info3 from "@/public/info3.png";
import info4 from "@/public/info4.png";
export default function Info() {
  return (
    <div>
      <Header />
      <div className="min-h-screen ">
        <img className="w-full mb-2" src={info1.src} alt="Info" />
        <img className="w-full  mb-2" src={info2.src} alt="Info" />
        <img className="w-full  mb-2" src={info3.src} alt="Info" />
        <img className="w-full  mb-2" src={info4.src} alt="Info" />
      </div>
      <a href="/down/나인위닛_회사소개서.pdf">
        <button>회사소개서 pdf파일 받기</button>
      </a>

      <Footer />
    </div>
  );
}
