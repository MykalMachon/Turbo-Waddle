const Waddle = ({ waddle }) => {
  return (
    <article className="waddle">
      <div className="waddle__pic">
        <img
          src={
            waddle.user_id.profile_pic ||
            `https://unavatar.now.sh/${waddle.user_id.display_name}`
          }
          alt="Picture"
        />
      </div>
      <div className="waddle__content">
        <p className="waddle__user">{waddle.user_id.display_name}</p>
        <p className="waddle__text">{waddle.text}</p>
        <span className="waddle__date">
          {new Date(waddle.created_at).toDateString()}
        </span>
      </div>
    </article>
  );
};

export default Waddle;
