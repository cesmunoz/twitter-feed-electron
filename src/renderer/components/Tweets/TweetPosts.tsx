import { format } from 'date-fns';
import { FaRetweet, FaHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { BsChatLeftQuote } from 'react-icons/bs';
import { useTweets } from './TweetsContext';

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return format(dateObj, 'dd MMM');
};

export const TweetPosts = ({ tweet, lastSearchUser }: any) => {
  const { currentProfileSearch } = useTweets();
  return (
    <div key={tweet.id}>
      <hr className="border-gray-600" />
      <div className="flex flex-shrink-0 p-4 pb-0">
        <a href="#" className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={currentProfileSearch?.profile_image_url}
                alt={currentProfileSearch?.name}
              />
            </div>
            <div className="ml-3">
              <p className="text-base leading-6 font-medium text-white gap-2">
                {currentProfileSearch?.name}
                <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150 ml-2">
                  @{currentProfileSearch?.username}{' '}
                  {`. ${formatDate(tweet.created_at)}`}
                </span>
              </p>
            </div>
          </div>
        </a>
      </div>
      <div className="pl-16">
        <p className="text-base width-auto font-medium text-white flex-shrink">
          {tweet.text}
        </p>
        {/* {tweet.entities?.urls?.length > 0 && (
        <div className="md:flex-shrink pr-6 pt-3">
          <img
            className="rounded-lg w-full h-64"
            src={`https://${tweet.entities?.urls[0]?.display_url}`}
            alt="Tweet"
          />
        </div>
      )} */}
        <div className="flex">
          <div className="w-full">
            <div className="flex items-center gap-10">
              <div className="flex text-center gap-2">
                <FiMessageCircle className="text-white h-5 w-5" />
                <p className="text-white text-sm ml-1">
                  {tweet.public_metrics?.reply_count}
                </p>
              </div>
              <div className="flex text-center py-2 m-2 gap-2">
                <FaRetweet className="text-white h-6 w-6" />
                <p className="text-white text-sm ml-2">
                  {tweet.public_metrics?.retweet_count}
                </p>
              </div>
              <div className="flex text-center py-2 m-2 gap-2">
                <FaHeart className="text-white h-5 w-5" />
                <p className="text-white text-sm ml-2">
                  {tweet.public_metrics?.like_count}
                </p>
              </div>
              <div className="flex text-center py-2 m-2 gap-2">
                <BsChatLeftQuote className="text-white h-5 w-5" />
                <p className="text-white text-sm ml-2">
                  {tweet.public_metrics?.quote_count}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-600" />
    </div>
  );
};
