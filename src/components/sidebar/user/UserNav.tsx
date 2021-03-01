import UserCard from './UserCard';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

/**
 * The main navigation for signed in Users
 */
const UserNav = () => {
  const { data: authState } = useQuery('authState');

  return (
    <nav className="nav__main">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {authState && (
          <li>
            <Link to={`/users/${authState.id}`}>Profile</Link>
          </li>
        )}
        <li>
          <a
            noValidate
            target="_blank"
            href="https://github.com/MykalMachon/Turbo-Waddle"
          >
            Code
          </a>
        </li>
      </ul>
      <UserCard />
    </nav>
  );
};

export default UserNav;
