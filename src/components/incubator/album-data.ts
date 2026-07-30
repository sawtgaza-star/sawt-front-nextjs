/* Photo album of the incubator — sixth section of /incubator.
   Five photos on a three-column grid; each card's chip / caption sits on the
   dark gradient and only appears while the card is hovered.
   NOTE: the mentor card's real photo (red-beanie cameraman) isn't exported
   from Figma yet — it reuses the featured shot as a stand-in; swap `image`
   here when the asset lands. The workshop / community cards intentionally
   share one photo with different crops (object-position), as in the mock. */

export type AlbumChipPos = "top-end" | "bottom-end" | "bottom-start";

export type AlbumCard = {
  key: string;
  /* grid-area name consumed by .inc-album-grid */
  area: "video" | "featured" | "workshop" | "mentor" | "community";
  image: string;
  /* shifts the crop when two cards share one photo */
  position?: string;
  /* white pill over the photo */
  chip?: { key: string; text: string; pos: AlbumChipPos };
  /* bold caption (+ optional sub line) on the bottom start edge */
  caption?: { key: string; text: string };
  captionSub?: { key: string; text: string };
  /* dark-green play badge (always visible, unlike the texts) */
  play?: boolean;
};

export const ALBUM_CARDS: AlbumCard[] = [
  {
    key: "video",
    area: "video",
    image: "/assets/images/bac7442160787c37131e5f9a31e3703041164e49.jpg",
    chip: {
      key: "inc_album_launch_chip",
      text: "يوم الإطلاق — الدفعة الثالثة",
      pos: "bottom-start",
    },
    play: true,
  },
  {
    key: "featured",
    area: "featured",
    image: "/assets/images/042ae163aa0d78003024d720046b35cdf2cea552.jpg",
    chip: {
      key: "inc_album_launch_chip",
      text: "يوم الإطلاق — الدفعة الثالثة",
      pos: "top-end",
    },
    caption: {
      key: "inc_album_final_caption",
      text: "الدفعة تسجّل مشاريعها النهائية",
    },
  },
  {
    key: "workshop",
    area: "workshop",
    image: "/assets/images/939948c90beeea5448d93e57769396241090bb08.jpg",
    caption: {
      key: "inc_album_workshop_title",
      text: "ورشة عمل — التسويق بالمحتوى",
    },
    captionSub: {
      key: "inc_album_workshop_sub",
      text: "كل جلسة عملية لا محاضرات نظرية",
    },
  },
  {
    key: "mentor",
    area: "mentor",
    image: "/assets/images/042ae163aa0d78003024d720046b35cdf2cea552.jpg",
    position: "80% center",
    chip: {
      key: "inc_album_mentor_chip",
      text: "جلسة مرشد 1:1",
      pos: "bottom-end",
    },
  },
  {
    key: "community",
    area: "community",
    image: "/assets/images/939948c90beeea5448d93e57769396241090bb08.jpg",
    position: "35% center",
    chip: {
      key: "inc_album_community_chip",
      text: "مجتمع صانعي المحتوى",
      pos: "bottom-end",
    },
  },
];
