import { getInitialsName } from "../utils/get-initials-name";

type AvatarProps = {
  name?: string;
  className?: string;
};

export const Avatar = ({ name, className }: AvatarProps) => {
  const initials = getInitialsName(name);
  return (
    <div
      className={`bg-brand-blue-dark flex shrink-0 items-center justify-center rounded-full font-bold text-gray-600 ${className}`}
      title={name}
    >
      {initials.firstLetter}
      {initials.lastLetter}
    </div>
  );
};
