import { supabase } from './supabase';

/**
 * get a signle waddle by its ID
 * @param wid a waddle ID
 */
export const getWaddleById = (waddleId: string) => {};

/**
 * gets a users waddle feed based on
 * who they follow
 */
export const getWaddleFeed = (userId: string) => {};

/**
 * gets all waddles by a certain user
 */
export const getWaddlesByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('waddles')
    .select(
      `id, text, created_at, user_id (
      id,
      display_name,
      profile_pic
    )`
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    throw new Error(error.toString());
  } else {
    return data;
  }
};

/**
 * return all waddles, this is just for dev
 */
export const getAllWaddles = async () => {
  const { data, error } = await supabase
    .from('waddles')
    .select(
      `
        text,
        created_at,
        user_id (
          id,
          display_name,
          profile_pic
        ) `
    )
    .order('created_at', { ascending: false });
  if (!error) {
    return data;
  } else {
    throw new Error(error.toString());
  }
};
