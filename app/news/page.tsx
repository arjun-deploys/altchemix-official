import News from "@/components/news/News";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <News />
      <Footer />
    </div>
  );
}
