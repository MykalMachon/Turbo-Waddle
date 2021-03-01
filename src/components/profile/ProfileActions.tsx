import { useQuery } from 'react-query';
import { supabase } from '/@utils/supabase';

const ProfileActions = ({ data }) => {
  const { data: auth } = useQuery('authState');

  const followUser = async () => {
    if (auth) {
      const { data: followData, error } = await supabase
        .from('follows')
        .insert({
          follower_id: auth.id,
          followed_id: data.id,
        });
      if (error) {
        console.log('could not follow user');
      } else {
        console.log('followed user');
      }
    }
  };

  const unfollowUser = () => {
    if (auth) {
      // TODO stub
      // supabase.from('follows').delete()
    }
  };

  return (
    <section className="user__profile--actions">
      {data.isAuthedUser() ? (
        <button>edit profile</button>
      ) : (
        <>
          {data.isFollowingAuthedUser && <button data-checked>unfollow</button>}
          {!data.isFollwedByAuthedUser && (
            <button onClick={followUser}>follow</button>
          )}
        </>
      )}
    </section>
  );
};

export default ProfileActions;
