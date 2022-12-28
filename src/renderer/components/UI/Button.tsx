type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export const Button = ({ onClick, children, ...restProps }: ButtonProps) => {
  return (
    <button
      type="button"
      className="bg-blue-800 w-48 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};
