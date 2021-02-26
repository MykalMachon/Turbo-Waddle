import { useEffect, useState } from 'preact/hooks';
import { supabase } from '../utils/supabase';

const Feed = () => {
  const postWaddle = async (event) => {
    event.preventDefault();
    const waddleData = {
      text: event.target.waddle.value,
      user_id: supabase.auth.user()?.id,
    };
    const { data, error } = await supabase.from('waddles').insert(waddleData);
    if (error) {
      alert('something went wrong!');
    } else {
      console.log(data);
    }
  };

  const [waddles, setWaddles] = useState<any>(null);

  useEffect(() => {
    const getWaddles = async () => {
      const { data, error } = await supabase.from('waddles').select(`
          text,
          created_at,
          user_id (
            display_name,
            profile_pic
          ) `);
      if (!error) {
        setWaddles(data);
      } else {
        alert(`couldn't get waddles`);
      }
    };
    getWaddles();
  }, []);

  return (
    <main className="feed">
      <section className="title">
        <h2>Your Waddles 🦆</h2>
      </section>
      <form className="new_waddle" onSubmit={postWaddle}>
        <label htmlFor="waddle">
          <textarea
            name="waddle"
            id="waddle"
            cols={30}
            rows={3}
            placeholder="what are you waddling about?"
          ></textarea>
        </label>
        <input type="submit" value="Waddle" />
      </form>
      <section className="waddles">
        {waddles ? (
          <>
            {waddles.map((waddle) => (
              <article className="waddle">
                <div className="waddle__pic">
                  <img src={waddle.user_id.profile_pic} alt="Picture" />
                </div>
                <div className="waddle__content">
                  <p className="waddle__user">{waddle.user_id.display_name}</p>
                  <p className="waddle__text">{waddle.text}</p>
                  <span className="waddle__date">
                    {new Date(waddle.created_at).toDateString()}
                  </span>
                </div>
              </article>
            ))}
          </>
        ) : (
          <p>loading...</p>
        )}
      </section>
    </main>
  );
};

export default Feed;
