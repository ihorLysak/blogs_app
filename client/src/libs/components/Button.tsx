interface Props {
  label: string;
  onClick?: () => void;
}

function Button({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="transition text-white border-2 border-black text-xl bg-black text-center px-5 py-1 rounded-3xl hover:bg-white hover:text-black"
    >
      {label}
    </button>
  );
}

export { Button };
