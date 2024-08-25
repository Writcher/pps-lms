import SideNav from '@/app/components/admin/sidenav';
import { getTypeAdmin } from '../lib/queries/usertype';
import { auth } from '../lib/auth';
import { redirect } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { doLogout } from '../actions';
import Button from '@mui/material/Button';

 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const adminType = await getTypeAdmin();
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session?.user.usertype_id != adminType) {
      return (
          <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
              <p className="mt-16">
                  No tienes permiso para ver esta página.
              </p>
          </div>
      )
  }
  
  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-60">
          <SideNav />
        </div>
        <div className="flex-grow md:overflow-y-auto">{children}</div>
        <div className="h-16 w-full md:hidden">
          <form action={doLogout}>
            <div className="flex flex-row h-16 bg-gradient-to-t from-gray-800 to-gray-700 border-t-4 border-orange-500 text-white items-center justify-end">
              <Button variant="text" size="large" color="inherit" type="submit" disableElevation endIcon={<LogoutIcon />} fullWidth>
                CERRAR SESIÓN
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
}