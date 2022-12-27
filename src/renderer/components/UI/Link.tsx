type LinkProps = {
  text: string;
  url: string;
  urlText: string;
  onClick: (url: string) => void;
};

export const Link = ({ text, url, urlText, onClick }: LinkProps) => {
  return (
    <>
      {text}:
      <a
        className="text-blue-500 cursor-pointer ml-2"
        onClick={() => onClick(url)}
      >
        @{urlText}
      </a>
    </>
  );
};
