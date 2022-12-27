import { FcAbout } from 'react-icons/fc';
import { FaTwitter, FaHome } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { NavLink } from '../UI/NavLink';

const routes = [
  {
    path: '/',
    name: 'Home',
    icon: FaHome,
  },
  {
    path: '/about-me',
    name: 'About me',
    icon: FcAbout,
  },
];

export const NavBar = () => {
  const location = useLocation();

  return (
    <div className="w-2/5 text-white h-12 pl-32 py-4">
      <FaTwitter className="h-10 w-10 ml-2" />
      <nav className="mt-5 px-2">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            isCurrentLocation={location.pathname === route.path}
          >
            <route.icon className="mr-4 h-6 w-6" />
            {route.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
