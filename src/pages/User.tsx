import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { supabase } from '/@utils/supabase';
import Waddle from '/@components/Waddle';
import UserCard from '/@components/sidebar/UserCard';
import ProfileHeader from '/@components/profile/ProfileHeader';

const UserPage = () => {
  const { userId } = useParams();

  const {
    isLoading: waddlesLoading,
    error: waddlesError,
    data: waddlesData,
  } = useQuery(['waddles', userId], async () => {
    const { data, error } = await supabase
      .from('waddles')
      .select(
        `id, text, created_at, user_id (
          id,
          display_name,
          profile_pic
        )`
      )
      .eq('user_id', userId);
    if (error) {
      console.error(error);
      throw new Error(error.toString());
    } else {
      return data;
    }
  });

  const { data: authData, isLoading: authLoading } = useQuery('authState');

  return (
    <div className="appLayout">
      <UserCard />
      <main className="userPage feed">
        <ProfileHeader userId={userId} />
        {waddlesLoading && <p>Loading</p>}
        {waddlesData && (
          <section className="waddles">
            {waddlesData.map((waddle) => (
              <Waddle waddle={waddle} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default UserPage;
