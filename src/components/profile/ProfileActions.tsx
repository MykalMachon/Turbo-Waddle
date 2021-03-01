import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useRouteMatch, Link } from 'react-router-dom';
import { followUser, unfollowUser } from '/@utils/users';

const ProfileActions = ({ data }) => {
  const queryClient = useQueryClient();
  let match = useRouteMatch();
  const { data: auth } = useQuery<{ id: string }>('authState');

  const mutateFollow = useMutation<
    any,
    any,
    { userId: string; authId: string }
  >(({ userId, authId }) => followUser(userId, authId), {
    onSuccess: () => queryClient.invalidateQueries(['user', data.id, auth.id]),
  });

  const mutateUnfollow = useMutation<
    any,
    any,
    { userId: string; authId: string }
  >(({ userId, authId }) => unfollowUser(userId, authId), {
    onSuccess: () => queryClient.invalidateQueries(['user', data.id, auth.id]),
  });

  return (
    <section className="user__profile--actions">
      {data.isAuthedUser() ? (
        <Link to={`${match.url}/edit`}>Edit profile</Link>
      ) : (
        <>
          {data.isFollwedByAuthedUser && (
            <button
              onClick={() => {
                mutateUnfollow.mutate({ userId: data.id, authId: auth.id });
              }}
              data-checked
              disabled={mutateUnfollow.isLoading}
            >
              unfollow
            </button>
          )}
          {!data.isFollwedByAuthedUser && (
            <button
              onClick={() => {
                mutateFollow.mutate({ userId: data.id, authId: auth.id });
              }}
              disabled={mutateFollow.isLoading}
            >
              follow
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default ProfileActions;
