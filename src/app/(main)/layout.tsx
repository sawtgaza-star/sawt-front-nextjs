import "@/styles/legacy/style.css";
import "@/styles/legacy/search.css";
/* makes the creator / story / team cards clickable as a whole on desktop */
import "@/styles/card-links.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
/* holds the home sliders' layout until Owl boots — after owl's own CSS */
import "@/styles/owl-preinit.css";
/* every inner page's hero at the team hero's size */
import "@/styles/hero-size.css";
import SiteFooter from "@/components/site/SiteFooter";
import HeroRatioSync from "@/components/site/HeroRatioSync";
import StoryTapWiring from "@/components/site/StoryTapWiring";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SiteFooter />
      <HeroRatioSync />
      <StoryTapWiring />
    </>
  );
}
