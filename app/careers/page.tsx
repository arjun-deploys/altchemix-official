import Careers from "@/components/careers/Careers";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Careers />
      <Footer />
    </div>
  );
}
