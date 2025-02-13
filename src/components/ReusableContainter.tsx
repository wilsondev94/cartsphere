interface ReusableContainterProps {
  children: React.ReactNode;
}

export default function ReusableContainter({
  children,
}: Readonly<ReusableContainterProps>) {
  return (
    <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4">
      {children}
    </div>
  );
}
