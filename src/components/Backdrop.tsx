interface BackdropProps {
  onClick: () => void;
}

export default function Backdrop({ onClick }: BackdropProps) {
  return (
    <div
      onClick={onClick}
      className="z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0 "
    >
      Backdrop
    </div>
  );
}
