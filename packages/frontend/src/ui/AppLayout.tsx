import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function AppLayout() {
  return (
    <div className="w-full max-w-6xl min-h-screen flex flex-col items-center py-4 px-12 mx-auto">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
