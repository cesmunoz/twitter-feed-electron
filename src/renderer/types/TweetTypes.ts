export type PublicMetricsType = {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
};

export type TweetsType = {
  id: string;
  text: string;
  public_metrics: PublicMetricsType;
  created_at: string;
  entities: {
    urls: {
      url: string;
      expanded_url: string;
      display_url: string;
    }[];
  };
};

export type ProfileType = {
  id: string;
  username: string;
  profile_image_url: string;
  name: string;
};

export type TweetsResponseType = {
  profile: ProfileType;
  tweets: SearchedTweetsType;
};

export type SearchedTweetsType = {
  data: TweetsType[];
  meta: {
    newest_id: string;
    oldest_id: string;
    result_count: number;
    next_token: string;
  };
};
