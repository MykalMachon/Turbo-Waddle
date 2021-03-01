import {
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ProfileHeader from '/@components/profile/ProfileHeader';
import ProfileWaddles from '/@components/profile/ProfileWaddles';
import { getProfileData } from '/@utils/users';
import { useQuery } from 'react-query';
import ProfileActions from '/@components/profile/ProfileActions';
import ProfileEditPage from '/@components/profile/ProfileEditPage';

const UserPage = () => {
  const { userId } = useParams();
  let match = useRouteMatch();
  const { data: auth, isLoading: authLoading } = useQuery<{ id: string }>(
    'authState'
  );
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
          {!authLoading && auth && <ProfileActions data={data} />}
          <ProfileWaddles waddles={data.waddles} />
        </Route>
      </Switch>
    </main>
  );
};

export default UserPage;
