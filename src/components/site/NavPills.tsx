// @ts-nocheck
/* eslint-disable */
import {
  IconNavIncubator,
  IconNavMedia,
  IconNavPillArrow,
} from "@/components/ui/icons";

/* The branded shortcuts that sit at the far (left) end of the navbar —
   `nav.secondary` of GET /layout/navbar, in the order the editor arranged it.
   RTL: first child renders on the right, so the payload's order reads
   [حاضنة صوت] [صوت ميديا] right-to-left, and inside each pill the brand icon
   sits on the right with the outbound arrow on the left.

   The brand marks stay with the site: they are drawings of these two
   sub-brands, not something an endpoint can send, so they are picked by the
   entry's `key`. A key this doesn't know gets the label and the arrow, with no
   mark in front of it. */
const ICON_BY_KEY = {
  incubator: IconNavIncubator,
  media_kit: IconNavIncubator,
  media: IconNavMedia,
  blog: IconNavMedia,
};

export default function NavPills({ pills, loading }) {
  if (loading) {
    return (
      <div className="nav-pills-group">
        {" "}
        <span className="nsk-navpill" style={{ width: "120px" }} />{" "}
        <span className="nsk-navpill" style={{ width: "115px" }} />{" "}
      </div>
    );
  }

  return (
    <div className="nav-pills-group">
      {" "}
      {pills.map((pill, index) => {
        const Icon = ICON_BY_KEY[pill.key];
        return (
          <a className="nav-pill" href={pill.url} key={index}>
            {" "}
            {Icon ? <Icon /> : null} <span>{pill.label}</span>{" "}
            <IconNavPillArrow />{" "}
          </a>
        );
      })}{" "}
    </div>
  );
}
