import { useRef } from 'preact/hooks';
import { useQuery, useQueryClient } from 'react-query';
import { supabase } from '../utils/supabase';
import WaddleForm from './forms/WaddleForm';
import Waddle from './Waddle';

const Feed = () => {
  const queryClient = useQueryClient();
  const getWaddles = async () => {
    const { data, error } = await supabase
      .from('waddles')
      .select(
        `
        text,
        created_at,
        user_id (
          display_name,
          profile_pic
        ) `
      )
      .order('created_at', { ascending: false });
    if (!error) {
      return data;
    } else {
      throw new Error(error.toString());
    }
  };

  const { isLoading, error, data } = useQuery('waddles', getWaddles);
  const { data: authState } = useQuery('authState');

  return (
    <main className="feed">
      <section className="title">
        <h2>Your Waddles 🦆</h2>
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
