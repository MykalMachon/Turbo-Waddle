import { useQuery } from 'react-query';
import WaddleForm from './forms/WaddleForm';
import Waddle from './Waddle';
import { getAllWaddles } from '/@utils/waddles';

const Feed = () => {
  const { isLoading, error, data } = useQuery('waddleFeed', getAllWaddles);
  const { data: authState } = useQuery('authState');

  return (
    <main className="feed">
      <section className="title">
        <h2>Duck Pond 🦆</h2>
      </section>
      {authState ? (
        <WaddleForm />
      ) : (
        <div className="unauth_waddle">
          <p>Signin to waddle! ✨</p>
        </div>
      )}
      <section className="waddles">
        {isLoading && <p>loading...</p>}
        {error && <p>failed to load waddles...</p>}
        {data && (
          <>
            {data.map((waddle) => (
              <Waddle waddle={waddle} />
            ))}
          </>
        )}
      </section>
    </main>
  );
};

export default Feed;
