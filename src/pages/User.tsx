import { useParams } from 'react-router-dom';
import ProfileHeader from '/@components/profile/ProfileHeader';
import ProfileWaddles from '/@components/profile/ProfileWaddles';
import { getProfileData } from '/@utils/users';
import { useQuery } from 'react-query';
import ProfileActions from '/@components/profile/ProfileActions';
import { supabase } from '/@utils/supabase';

const UserPage = () => {
  const { userId } = useParams();
  const { data: auth, isLoading: authLoading } = useQuery<{ id: string }>(
    'authState'
  );
  const { data, isLoading, error } = useQuery(
    ['user', userId, auth.id],
    async () => await getProfileData(userId, auth.id),
    {
      enabled: !!userId && !!auth,
    }
  );

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>failed to load page</p>;
  return (
    <div className="appLayout">
      <main className="userPage feed">
        <ProfileHeader data={data} />
        {!authLoading && auth && <ProfileActions data={data} />}
        <ProfileWaddles waddles={data.waddles} />
      </main>
    </div>
  );
};

export default UserPage;
