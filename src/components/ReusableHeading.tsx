"use client";

interface ReusableHeadingProps {
  title: string;
  center?: boolean;
}
export default function ReusableHeading({
  title,
  center,
}: ReusableHeadingProps) {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <h1 className="font-bold text-2xl">{title}</h1>
    </div>
  );
}
