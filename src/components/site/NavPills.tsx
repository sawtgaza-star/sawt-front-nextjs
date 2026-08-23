// @ts-nocheck
/* eslint-disable */
import {
  IconNavIncubator,
  IconNavMedia,
  IconNavPillArrow,
} from "@/components/ui/icons";

/* The two branded shortcuts that sit at the far (left) end of the navbar.
   RTL: first child renders on the right, so the order below reads
   [حاضنة صوت] [صوت ميديا] right-to-left, and inside each pill the brand
   icon sits on the right with the outbound arrow on the left. */
export default function NavPills() {
  return (
    <div className="nav-pills-group">
      {" "}
      <a className="nav-pill" href="/incubator">
        {" "}
        <IconNavIncubator />{" "}
        <span data-i18n="nav_incubator">حاضنة صوت</span>{" "}
        <IconNavPillArrow />{" "}
      </a>{" "}
      <a className="nav-pill" href="/media">
        {" "}
        <IconNavMedia /> <span data-i18n="nav_media">صوت ميديا</span>{" "}
        <IconNavPillArrow />{" "}
      </a>{" "}
    </div>
  );
}
