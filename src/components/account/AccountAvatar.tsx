import { IconAvatarPlaceholder } from "./account-icons";

/* The user's round photo, or a neutral silhouette when there is none.
   no-referrer: Google account photos (a Google sign-in's avatar) often refuse
   requests that carry another site's Referer. */
export default function AccountAvatar({
  src,
  name,
  className = "",
}: {
  src: string | null;
  name: string;
  className?: string;
}) {
  return (
    <span className={"acc-avatar " + className}>
      {src ? <img src={src} alt={name} referrerPolicy="no-referrer" /> : <IconAvatarPlaceholder />}
    </span>
  );
}
