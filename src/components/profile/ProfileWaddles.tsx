import Waddle from '../Waddle';

const ProfileWaddles = ({ waddles }) => {
  return (
    <section className="waddles">
      {waddles.map((waddle) => (
        <Waddle waddle={waddle} />
      ))}
    </section>
  );
};

export default ProfileWaddles;
