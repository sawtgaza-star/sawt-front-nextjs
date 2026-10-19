"use client";
import { useFooter } from "@/lib/api/use-footer";
import { useLang } from "@/lib/use-lang";
import { resolveFooter } from "./footer/footer-data";
import { FooterBackdrop } from "./footer/footer-ornaments";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterBrand from "./footer/FooterBrand";
import FooterLinkColumn from "./footer/FooterLinkColumn";
import FooterContact from "./footer/FooterContact";
import FooterBottomBar from "./footer/FooterBottomBar";
import FooterSkeleton from "./footer/FooterSkeleton";
import "@/styles/site-footer.css";

/* Shared footer, the same on every page of the (main) group: the newsletter
   row on top, then brand · two link columns · contact, then the darker
   copyright strip — one layout that reflows for phones (styles/site-footer.css).

   The only client boundary down here: one request for the whole footer
   (GET /layout/footer) and one `lang` subscription, both resolved into a plain
   view model by resolveFooter() and handed down as props, so the columns
   themselves stay plain functions.

   <FooterSkeleton /> holds the shape while that request is in flight. The
   endpoint is the only source of the copy — nothing here shadows it, so a
   field the editor leaves empty renders empty. The one label the payload has
   no field for (the contact heading) is the site's own string,
   through tr() since the footer mounts after the DOM translation pass. See
   ./footer/footer-data. */
export default function SiteFooter() {
  const { lang, tr } = useLang();
  const { data, loading } = useFooter();

  if (loading) return <FooterSkeleton />;

  const footer = resolveFooter(data, lang);

  return (
    <footer className="sawt-footer">
      <FooterBackdrop />
      <div className="container ft-inner">
        <FooterNewsletter newsletter={footer.newsletter} />
        <div className="ft-cols">
          <FooterBrand
            logoUrl={footer.logoUrl}
            about={footer.about}
            socials={footer.socials}
          />
          <FooterLinkColumn title={footer.main.title} links={footer.main.links} stroke={0} />
          <FooterLinkColumn title={footer.quick.title} links={footer.quick.links} stroke={1} />
          <FooterContact title={tr("support_contact_us")} contact={footer.contact} />
        </div>
      </div>
      <FooterBottomBar copyright={footer.copyright} brand={footer.brand} />
    </footer>
  );
}
