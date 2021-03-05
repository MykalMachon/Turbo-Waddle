export type PublicUser = {
  id: string;
  display_name: string;
  description: string;
  profile_pic?: string;
};

export type Waddle = {
  id: number;
  text: string;
  created_at: string;
  user_id: string;
};

export type Follow = {
  id: number;
  follower_id: string;
  followed_id: string;
  created_at: string;
};
