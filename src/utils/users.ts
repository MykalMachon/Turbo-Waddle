import { supabase } from './supabase';
import { getWaddlesByUser } from './waddles';

/**
 * get all users that are "followers" of this user
 *
 * @param userId a userId
 */
const getFollowers = async (userId: string) => {
  const { count } = await supabase
    .from('follows')
    .select(`id`, { count: 'exact' })
    .eq('follower_id', userId);
  return count;
};

/**
 * get all users that are "following" this user
 *
 * @param userId a userId
 */
const getFollowing = async (userId: string) => {
  const { count } = await supabase
    .from('follows')
    .select(`id`, { count: 'exact' })
    .eq('followed_id', userId);
  return count;
};

const getUserAFollowingUserB = async (userAId: string, userBId: string) => {
  const { error, count } = await supabase
    .from('follows')
    .select('id', { count: 'exact' })
    .match({ follwer_id: userAId, followed_id: userBId });
  return count == 1;
};

const getUserAFollowedByUserB = async (userAId: string, userBId: string) => {
  const { error, count } = await supabase
    .from('follows')
    .select('id', { count: 'exact' })
    .match({ follwer_id: userBId, followed_id: userAId });
  return count == 1;
};

const getUserInfo = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select(
      `
  id,
  display_name, 
  description,
  profile_pic
`
    )
    .eq('id', userId)
    .single();
  if (error) {
    console.error(error);
    throw new Error(error.toString());
  } else {
    return data;
  }
};

/**
 * get all information you'l need for a specific user account
 *
 * @param userId a userId
 */
export const getProfileData = async (userId: string) => {
  return {
    ...(await getUserInfo(userId)),
    followers: await getFollowers(userId),
    following: await getFollowing(userId),
    isFollowingAuthedUser: false,
    isFollwedByAuthedUser: false,
    isAuthedUser: () => supabase.auth.user()?.id == userId,
    waddles: await getWaddlesByUser(userId),
  };
};
