import { IconAvatarPlaceholder } from "./account-icons";

/* The user's round photo, or a neutral silhouette when there is none. */
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
      {src ? <img src={src} alt={name} /> : <IconAvatarPlaceholder />}
    </span>
  );
}
