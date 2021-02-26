import { useRef } from 'preact/hooks';
import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../../utils/supabase';

const WaddleForm = () => {
  const queryClient = useQueryClient();
  const waddleInputRef = useRef(null);

  const postWaddle = async (waddle) => {
    const waddleData = {
      text: waddle.text,
      user_id: supabase.auth.user()?.id,
    };
    const { data, error } = await supabase.from('waddles').insert(waddleData);
    if (error) {
      alert('something went wrong!');
    } else {
      console.log(data);
    }
  };

  const postWaddleMutation = useMutation(postWaddle, {
    onSuccess: () => {
      queryClient.queryClient.invalidateQueries('waddles');
      waddleInputRef.current.value = '';
    },
  });

  return (
    <form
      className="new_waddle"
      onSubmit={(e) => {
        e.preventDefault();
        postWaddleMutation.mutate({
          text: e.target.waddle.value,
        });
      }}
    >
      <label htmlFor="waddle">
        <textarea
          name="waddle"
          ref={waddleInputRef}
          id="waddle"
          cols={30}
          rows={3}
          placeholder="what are you waddling about?"
        ></textarea>
      </label>
      <input
        type="submit"
        value="Waddle"
        disabled={postWaddleMutation.isLoading}
      />
    </form>
  );
};

export default WaddleForm;
