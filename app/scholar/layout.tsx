import SideNav from "../components/scholar/sidenav";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-60">
          <SideNav />
        </div>
        <div className="flex-grow bg-gray-100 md:overflow-y-auto">{children}</div>
      </div>
  );
}