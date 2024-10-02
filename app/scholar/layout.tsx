import { redirect } from "next/navigation";
import SideNav from "../components/scholar/sidenav";
import { auth } from "../lib/auth";
import { getTypeScholar } from "../lib/queries/usertype";
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const scholarType = await getTypeScholar();
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session?.user.usertype_id != scholarType) {
      return (
          <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
              <p className="mt-16">
                No tienes permiso para ver esta página.
              </p>
          </div>
      );
  };
  
  return (
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-[15%]">
          <SideNav />
        </div>
        <div className="flex flex-grow bg-gray-100 md:w-[85%]">{children}</div>
      </div>
  );
};