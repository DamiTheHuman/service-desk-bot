import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const getPathStyle = (path: string) => {
    return pathname == path
      ? 'nav-link px-2 text-white active'
      : 'nav-link px-2 text-secondary';
  };

  return (
    <header className="p-3 bg-dark text-white mb-3">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link href="/" className={getPathStyle('/')}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/statistics" className={getPathStyle('/statistics')}>
                Statistics
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
