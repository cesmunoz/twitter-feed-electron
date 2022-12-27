import axios from 'axios';

const API_URL = 'https://api.twitter.com/2';
const TWITTER_BEARER_TOKEN =
  'AAAAAAAAAAAAAAAAAAAAAN9RkwEAAAAAsWEj2I3s95yFM4m4zoWY3%2Ffb5sE%3DNiEqt4UZ0vZOC4SSzwbvGnirS8IFHVTQLh3TnO3HLxcKjOBRiW';
const USER_URL = `${API_URL}/users`;

const buildTweetsByUserUrl = (userId: string, meta?: any) => {
  const paginationToken =
    meta && meta.next_token ? `pagination_token=${meta.next_token}&` : '';
  const extraParams =
    'user.fields=&media.fields=&tweet.fields=public_metrics%2Ccreated_at%2Centities&expansions=';
  return `${USER_URL}/${userId}/tweets?${paginationToken}${extraParams}`;
};

const buildGetUserNameIdByUsernameUrl = (username: string) =>
  `${USER_URL}/by/username/${username}?user.fields=profile_image_url`;
const requestParams = {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
  },
};

export const getUserProfileData = async (username: string) => {
  let apiError = false;
  try {
    const userResponse: any = await axios.get(
      buildGetUserNameIdByUsernameUrl(username),
      requestParams
    );

    if (userResponse.data.errors) {
      apiError = true;
      throw new Error(
        userResponse.data.title
          ? userResponse.data.title
          : userResponse.data.errors[0].detail
      );
    }

    return userResponse.data.data;
  } catch (e: any) {
    console.log(e)
    if (apiError) {
      throw new Error(e.message);
    }

    throw new Error(`Error getting user profile. Try again later`);
  }
};

export const getTweetsByUserId = async (userId: string, meta?: any) => {
  try {
    const tweetsResponse = await axios.get(
      buildTweetsByUserUrl(userId, meta),
      requestParams
    );
    return tweetsResponse.data;
  } catch (e) {
    throw new Error('Error getting tweets');
  }
};
