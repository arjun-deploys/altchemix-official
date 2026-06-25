import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import Sitemap from "@/components/sitemap/Sitemap";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sitemap />
      <Footer />
    </div>
  );
}
