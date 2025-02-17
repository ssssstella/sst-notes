import { NavLink } from 'react-router-dom';

const paths = [
  { title: 'Login', href: '/login' },
  { title: 'Signup', href: '/signup' },
];

export default function Nav() {
  // active is not working?
  return (
    <nav>
      <ul className="flex justify-between gap">
        {paths.map((item) => (
          <li className=''>
            <NavLink to={item.href} className="text-lg px-6 py-2 hover:bg-blue-100 active:bg-blue-100 active:underline">
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
