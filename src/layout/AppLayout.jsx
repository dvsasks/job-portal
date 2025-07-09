import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex justify-center p-8 ">
      <div className="w-full  p-4  max-w-7xl">
        <div className="grid-background  w-full "></div>
        <main className="min-h-screen">
          <Header />
          <Outlet />
        </main>
        <div className="p-10 text-center bg-gray-800 mt-10">
          Made with 💗 by sarma
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
