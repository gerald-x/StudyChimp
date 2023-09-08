import { NavLink, Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { CiSaveDown2 } from "react-icons/ci"
import { useState } from "react";
import { BiSolidMessageSquareAdd, BiSolidDashboard, BiLogOut } from "react-icons/bi"
import { TbLogout2 } from "react-icons/tb"


const AdminSideNav = ({ open, onToggleHandler }) => {
  const [logout, setlogout] = useState(false);
  const hoverNav = " flex flex-row rounded-lg text-sm font-medium items-center h-10 focus:outline-none hover:bg-[#27272A] text-gray-700 hover:text-white pr-6 duration-300";
  const activeClass = ({ isActive }) => (isActive ? "bg-[#27272A] text-white" : "border-0").concat(hoverNav);

  return (
    <>
      {/* logout && <Logout onHideLogoutHandler={() => setlogout(!logout)} /> */}

      <div className={`${ open ? "translate-x-0" : "flex" } lg:flex w-64 h-screen z-40 duration-300 transition-transform -translate-x-full lg:translate-x-0 border-r fixed flex-col top-0 left-0 bg-[#fff]`} >
        <div className="px-5 relative pt-10 pb-5">
          <Link to="/overview/" className="font-semibold tracking-widest relative text-gray-900 uppercase rounded-lg my-6">
            Study Chimp
          </Link>

          <button type="button" className="absolute cursor-pointer top-[47px] right-5 lg:hidden focus:outline-none" >
            <span className="sr-only">Open main menu</span>
            {open && ( <IoCloseSharp onClick={() => onToggleHandler()} className="text-2xl" /> )}
          </button>
        </div>

        <div className="overflow-y-auto overflow-x-hidden scrollbar flex-grow">
          <ul className="flex flex-col text-gray-50 font-Poppins space-y-4 px-7 py-5">
            <li>
              <NavLink to="/dashboard" className={activeClass}>
                <span className="inline-flex justify-center items-center ml-3">
                  <BiSolidDashboard className="w-6 h-6 fill-current hover:text-[#05255F] " />
                </span>
                <span className="ml-5 tracking-wide truncate">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/add-book" className={activeClass}>
                <span className="inline-flex justify-center items-center ml-3">
                  <BiSolidMessageSquareAdd className="w-6 h-6 fill-current hover:text-[#05255F] " />
                </span>
                <span className="ml-5 tracking-wide truncate">Add Book</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/invoices" className={activeClass}>
                <span className="inline-flex justify-center items-center ml-3">
                  <CiSaveDown2 className="w-6 h-6 fill-current hover:text-[#05255F]" />
                </span>
                <span className="ml-5 tracking-wide truncate">Saved Books</span>
              </NavLink>
            </li>

            {/* DO NOT DELETE!!!. THESE ROUTES ARE HIBERNATED AND HAVE NOT TOTALLY BEEN PRUNED */}
            
            {/* Reports route */}
            {/*<li>
              <NavLink to="/reports" className={activeClass}>
                <span className="inline-flex justify-center items-center ml-3">
                  <ReportIcon className="w-6 h-6 stroke-current fill-none hover:text-[#05255F]" />
                </span>
                <span className="ml-5 tracking-wide truncate">Reports</span>
              </NavLink>
              </li>*/}

            {/* Inbox route */}
            {/*<li>
              <NavLink to="/inbox" className={activeClass}>
                <span className="inline-flex justify-center items-center ml-3">
                  <InboxIcon className="w-6 h-6 stroke-current fill-none hover:text-[#05255F]" />
                </span>
                <span className="ml-5 tracking-wide truncate">Inbox</span>
              </NavLink>
            </li>*/}

            <li className="px-5">
              <div className="flex flex-row items-center h-[7.5rem]"></div>
            </li>

            <li>
              <button onClick={() => setlogout(true)} className="w-full flex flex-row rounded-lg text-sm font-medium items-center h-10 focus:outline-none hover:bg-[#586E94]  text-gray-700 hover:text-gray-50 pr-6 duration-300" >
                <span className="inline-flex justify-center items-center ml-4">
                  <TbLogout2 className="h-6 w-6 lg:w-6 stroke-current fill-none" />
                </span>
                <span className="ml-5 tracking-wide truncate">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSideNav;
