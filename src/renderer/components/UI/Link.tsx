type LinkProps = {
  text: string;
  url: string;
  urlText: string;
  onClick: (url: string) => void;
};

export const LinkButton = ({ text, url, urlText, onClick }: LinkProps) => {
  return (
    <>
      {text}:
      <button
        type="button"
        className="text-blue-500 cursor-pointer ml-2"
        onClick={() => onClick(url)}
      >
        @{urlText}
      </button>
    </>
  );
};
