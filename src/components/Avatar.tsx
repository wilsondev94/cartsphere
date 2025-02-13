import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}
export default function Avatar({ src }: AvatarProps) {
  if (src)
    return <Image src={src} alt="avatar" className="w-30 h-30 rounded-full"
  
  />;
  return <div>Avatar</div>;
}
