const ProfileHeader = ({ data }) => {
  return (
    <>
      {data && (
        <>
          <section className="user__profile">
            <img src={data.profile_pic} />
            <h2>{data.display_name}</h2>
            <p>{data.description}</p>
            <div className="user__profile--stats">
              <div>{data.followers || 0} Following</div>
              <div>{data.following || 0} Followers</div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProfileHeader;
