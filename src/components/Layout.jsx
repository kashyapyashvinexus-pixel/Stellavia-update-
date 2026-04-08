import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './MouseGlow';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
