import Feed from '/@components/Feed';
import UserCard from '/@components/sidebar/UserCard';

const HomePage = () => {
  return (
    <div className="appLayout">
      <UserCard />
      <Feed />
    </div>
  );
};

export default HomePage;
