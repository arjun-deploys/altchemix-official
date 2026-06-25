import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import TermsAndConditions from "@/components/terms/TermsCondition";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TermsAndConditions />
      <Footer />
    </div>
  );
}
