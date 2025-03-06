import { useAuthContext } from '@/lib/authContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';

const pathsNotAuth = [
  { title: 'Login', href: '/login' },
  { title: 'Signup', href: '/signup' },
];

export default function Nav() {
  // active is not working?
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  async function handleLogout() {
    await signOut();
    setIsAuthenticated(false);
    navigate('/login');
  }

  return (
    <nav>
      <ul className="flex justify-between gap">
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout}>logout</button>
          </li>
        ) : (
          pathsNotAuth.map((item) => (
            <li className="" key={item.title}>
              <NavLink
                to={item.href}
                className="text-lg px-6 py-2 hover:bg-blue-100 active:bg-blue-100 active:underline"
              >
                {item.title}
              </NavLink>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
}
