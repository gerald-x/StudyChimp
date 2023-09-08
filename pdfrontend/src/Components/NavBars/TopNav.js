import { HiOutlineBars3, HiGlobeEuropeAfrica } from "react-icons/hi2";
import { useState } from "react";


const AdminTopNav = ({ open, onToggleHandler, expandChild="", size="h-[80vh] w-[80vw]" }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <div className="lg:ml-64 flex justify-between border-b sticky top-0 px-1 md:px-1.5 lg:px-2.5 py-2 lg:py-3 z-20 bg-white lg:hidden block">
        <div>
          <button onClick={() => onToggleHandler()} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 lg:hidden focus:outline-none mr-4 lg:mr-0" >
            <span className="sr-only">Open main menu</span>
            {!open && <HiOutlineBars3 className="text-2xl text-black" />}
          </button>
        </div>

        <div className="w-full flex items-center justify-center text-xl">
          <span>Study Chimp</span>
        </div>

      </div>
    </>
  );
};

export default AdminTopNav;
