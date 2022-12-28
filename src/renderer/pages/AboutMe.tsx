import { shell } from 'electron';
import { LinkButton } from '../components/UI/Link';

export const AboutMe = () => {
  const handleOpenExternalLink = (url: string) => {
    shell.openExternal(url);
  };

  return (
    <div className="w-full m-5">
      <div className="flex flex-col justify-center text-white gap-5">
        <h2 className="text-4xl font-bold mt-5">About me</h2>
        <p className="text-2xl font-semibold">Hey! I&apos;m Cesar</p>
        <p className="text-2xl font-semibold">I&apos;m a software developer</p>
        <div className="flex flex-col gap-5 mt-2">
          <p className="text-2xl font-semibold">Quick Links:</p>
          <ul className="list-disc list-inside">
            <li>
              <LinkButton
                text="LinkedIn"
                url="https://www.linkedin.com/in/cesar-mu%C3%B1oz-61675949/"
                urlText="cesar-munoz"
                onClick={handleOpenExternalLink}
              />
            </li>
            <li>
              <LinkButton
                text="GitHub"
                url="https://github.com/cesmunoz"
                urlText="cesmunoz"
                onClick={handleOpenExternalLink}
              />
            </li>
            <li>
              <LinkButton
                text="Twitter"
                url="https://twitter.com/cesmdev"
                urlText="cesmdev"
                onClick={handleOpenExternalLink}
              />
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 mt-2">
          <p className="text-2xl font-semibold">A few quick facts about me:</p>
          <ul className="list-disc list-inside">
            <li>I&apos;m from Argentina</li>
            <li>I&apos;m 35 years old</li>
            <li>Used to play baseball</li>
            <li>Love music, used to have a band</li>
            <li>Passionate about software</li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 mt-2">
          <p className="text-2xl font-semibold">Tech I really fond of:</p>
          <ul className="list-disc list-inside">
            <li>React</li>
            <li>Node</li>
            <li>Typescript</li>
            <li>TRPC</li>
            <li>Serverless</li>
            <li>AWS</li>
            <li>Next.js</li>
            <li>DynamoDB</li>
            <li>Remix</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
