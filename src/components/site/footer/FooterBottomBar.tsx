import { TagStroke } from "./footer-ornaments";

/* The darker strip under the footer: the copyright line with the brand on its
   painted tag. Both come from GET /layout/footer. */
export default function FooterBottomBar({
  copyright,
  brand,
}: {
  copyright: string;
  brand: string;
}) {
  return (
    <div className="ft-bottom">
      <div className="container ft-bottom__inner">
        <p className="ft-copy">
          <span>{copyright}</span>
          {brand ? (
            <span className="ft-tag">
              <TagStroke />
              <span>{brand}</span>
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
