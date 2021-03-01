import UserCard from './UserCard';
import { Link } from 'react-router-dom';
import UserNav from './UserNav';

const UserPanel = () => {
  return (
    <aside className="panel__user">
      <div className="panel__content">
        <UserNav />
      </div>
    </aside>
  );
};

export default UserPanel;
