const ProfileEditForm = () => {
  return (
    <form action="" className="form form__profile">
      <label htmlFor="displayName">
        Display name
        <input name="displayName" id="displayName" type="text" />
      </label>
      <label htmlFor="description">
        Description
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={3}
        ></textarea>
      </label>

      <input type="submit" value="save profile" />
    </form>
  );
};

export default ProfileEditForm;
