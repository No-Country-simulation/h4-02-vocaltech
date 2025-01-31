import { IoSearch } from "react-icons/io5";
import { SlPencil, SlBell } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";

const DashboardHeader = () => {
  return (
    <div className="w-full row-start-1 col-span-3 mb-4 lg:col-start-1 lg:col-end-7 p-5">
      <div className="flex justify-between items-center">
        <div className="text-xl mr-2">
          <GiHamburgerMenu className="burger-menu"/>
          <img src="logo-negro.png" alt="" className="logo"/>
        </div>
        <div className="flex gap-5 items-center">
          <form action="" className="flex h-6 bg-slate-500 rounded-lg">
            <input
              type="text"
              className="h-6 bg-slate-500 rounded-lg w-50 md:w-64 lg:w-96"
            />
            <button className="mr-2">
              <IoSearch />
            </button>
          </form>
          <button>
            <SlBell />
          </button>
          <button>
            <SlPencil />
          </button>
          <img
            src="profile.jpeg"
            alt="User"
            className="h-full rounded-xl"
            width={50}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
