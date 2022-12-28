export const Button = ({
  onClick,
  children,
  className,
  ...restProps
}: {
  onClick: () => void;
  children: any;
  className?: string;
}) => {
  return (
    <button
      type="button"
      className={
        className ??
        'bg-blue-800 w-48 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full'
      }
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};
