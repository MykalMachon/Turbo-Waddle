import { useParams } from 'react-router-dom';
import ProfileHeader from '/@components/profile/ProfileHeader';
import ProfileWaddles from '/@components/profile/ProfileWaddles';
import { getProfileData } from '/@utils/users';
import { useQuery } from 'react-query';
import ProfileActions from '/@components/profile/ProfileActions';

const UserPage = () => {
  const { userId } = useParams();
  const { data, isLoading, error } = useQuery(
    ['user', userId],
    async () => await getProfileData(userId)
  );
  const { data: auth, isLoading: authLoading } = useQuery('authState');

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
