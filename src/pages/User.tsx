// utilities and libs
import {
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useQuery } from 'react-query';
import { getProfileData } from '/@utils/users';

// profile components
import ProfileHeader from '/@components/profile/ProfileHeader';
import ProfileWaddles from '/@components/profile/ProfileWaddles';
import ProfileActions from '/@components/profile/ProfileActions';
import ProfileEditPage from '/@components/profile/ProfileEditPage';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/main/lib/SupabaseAuthClient';
import { User, UserAttributes } from '@supabase/supabase-js';

const UserPage = () => {
  const { userId } = useParams();
  let match = useRouteMatch();

  const { data: auth, isLoading: authLoading } = useQuery<User>('authState');
  const { data, isLoading, error } = useQuery(
    ['user', userId],
    async () => await getProfileData(userId, auth?.id || null),
    {
      enabled: !!userId && (!!auth || auth === null),
    }
  );

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>failed to load page</p>;
  return (
    <main className="userPage feed">
      <Switch>
        <Route path={`${match.path}/edit`}>
          {data.isAuthedUser() ? (
            <ProfileEditPage data={data} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path={`${match.path}`}>
          <ProfileHeader data={data} />
          <ProfileActions data={data} />
          <ProfileWaddles waddles={data.waddles} />
        </Route>
      </Switch>
    </main>
  );
};

export default UserPage;
