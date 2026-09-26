/* Photo album of the incubator — how GET /pages/incubator's `gallery` items
   are placed. The grid is five named areas on three columns (.inc-album-grid):

       RTL:  video | featured | mentor
             video | workshop | community

   The API names each item's slot physically, as the editor sees the design
   (right_tall is the tall start-side card in Arabic), so a slot is looked up
   here, never inferred from the list order. An item with an unknown slot is
   not drawn — the grid has no seat for it.

   Each area also decides how an item's copy sits on the dark hover gradient:
   a caption with a sub line reads as the bold caption block; a caption alone
   is the white chip, at the corner that area's mock puts it. */

export type AlbumArea = "video" | "featured" | "workshop" | "mentor" | "community";
export type AlbumChipPos = "top-end" | "bottom-end" | "bottom-start";

export const SLOT_AREAS: Record<string, AlbumArea> = {
  right_tall: "video",
  center_top: "featured",
  center_bottom: "workshop",
  left_top: "mentor",
  left_bottom: "community",
};

export const CHIP_POS: Record<AlbumArea, AlbumChipPos> = {
  video: "bottom-start",
  featured: "top-end",
  workshop: "bottom-end",
  mentor: "bottom-end",
  community: "bottom-end",
};
