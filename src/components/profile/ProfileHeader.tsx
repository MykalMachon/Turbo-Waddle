import { useQuery } from 'react-query';
import { supabase } from '/@utils/supabase';

const ProfileHeader = ({ userId }) => {
  const { isLoading, error, data } = useQuery(['users', userId], async () => {
    const { data, error } = await supabase
      .from('users')
      .select(
        `
      id,
      display_name, 
      description,
      profile_pic,
      followers,
      following
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
  });
  const { data: authData, isLoading: authLoading } = useQuery('authState');

  return (
    <>
      {error && <pre>{error.toString()}</pre>}
      {isLoading && <p>Loading!</p>}
      {data && (
        <>
          <section className="user__profile">
            <img src={data.profile_pic} />
            <h2>{data.display_name}</h2>
            <p>{data.description}</p>
            <div className="user__profile--stats">
              <div>{data.following?.length || 0} Following</div>
              <div>{data.followers?.length || 0} Followers</div>
            </div>
            {!authLoading && (
              <p>
                {authData.id == data.id ? (
                  <button>edit profile</button>
                ) : (
                  <button>Follow</button>
                )}
              </p>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default ProfileHeader;
