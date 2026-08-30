import "@/styles/legacy/style.css";
import "@/styles/legacy/search.css";
/* makes the creator / story / team cards clickable as a whole on desktop */
import "@/styles/card-links.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import SiteFooter from "@/components/site/SiteFooter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  );
}
