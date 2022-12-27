import { Link } from 'react-router-dom';
import cx from 'classnames';

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
  isCurrentLocation: boolean;
};

export const NavLink = ({ children, to, isCurrentLocation }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cx(
        'group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full text-blue-300 cursor-pointer',
        {
          'bg-blue-900': isCurrentLocation,
        }
      )}
    >
      {children}
    </Link>
  );
};
