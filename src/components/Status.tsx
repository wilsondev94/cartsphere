import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

export default function Status({ text, icon: Icon, bg, color }: StatusProps) {
  return (
    <div
      className={`${bg} ${color} px-2 rounded flex items-center gap-8 h-[35px] mt-2`}
    >
      {text}
      <Icon size={15} />
    </div>
  );
}
