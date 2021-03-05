import { PublicUser } from 'src/typings';
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

/**
 * return true if userA is following userB
 * @param userAId
 * @param userBId
 */
const getUserAFollowingUserB = async (
  userAId: string,
  userBId: string
): Promise<boolean> => {
  const { error, count } = await supabase
    .from('follows')
    .select('id', { count: 'exact' })
    .match({ follower_id: userAId, followed_id: userBId });
  return count == 1;
};

/**
 * return true if userA is being followed by userB
 * @param userAId
 * @param userBId
 */
const getUserAFollowedByUserB = async (
  userAId: string,
  userBId: string
): Promise<boolean> => {
  const { error, count } = await supabase
    .from('follows')
    .select('id', { count: 'exact' })
    .match({ follower_id: userBId, followed_id: userAId });
  return count == 1;
};

const getUserInfo = async (userId): Promise<PublicUser> => {
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
export const getProfileData = async (userId: string, authId: string | null) => {
  return {
    ...(await getUserInfo(userId)),
    followers: await getFollowers(userId),
    following: await getFollowing(userId),
    isFollowingAuthedUser: authId
      ? await getUserAFollowingUserB(userId, authId)
      : false,
    isFollwedByAuthedUser: authId
      ? await getUserAFollowedByUserB(userId, authId)
      : false,
    isAuthedUser: () => supabase.auth.user()?.id == userId,
    waddles: await getWaddlesByUser(userId),
  };
};

export const followUser = async (userId, authId) => {
  const { error } = await supabase.from('follows').insert({
    follower_id: authId,
    followed_id: userId,
  });
  if (error) {
    console.log('could not follow user');
  } else {
    console.log('followed user');
  }
};

export const unfollowUser = async (userId, authId) => {
  const { error } = await supabase.from('follows').delete().match({
    follower_id: authId,
    followed_id: userId,
  });
  if (error) {
    console.log('could not unfollow user');
  } else {
    console.log('unfollowed user');
  }
};
