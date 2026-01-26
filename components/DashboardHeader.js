"use client";
import Link from "next/link";
import HamburgerAnimated from "./HamburgerAnimated";
import Navigation from "./Navigation";
import MenuAvatarPopover from "./MenuAvatarPopover";
// import FormNewWish from "./FormNewWish";
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import Image from "next/image";
import FormNewSub from "./FormNewSub";

const DashboardHeader = ({ children, extraStyles }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerRef.current.offsetHeight}px`,
      );
    }
  }, []);

  return (
    <header
      className={`fixed md:relative top-0 left-0 right-0 z-45 md:bg-base-300 bg-base-200 md:rounded-xl mb-7 md:p-5 md:py-1 md:mx-10 px-6 py-1 md:my-5 ${extraStyles}`}
      ref={headerRef}
    >
      <div className="max-w-7xl mx-auto">
        <div className="navbar flex justify-between items-center mb-0 p-0">
          <div className="flex gap-2 items-center justify-center">
            <Image
              src="/favicon.png"
              width={40}
              height={40}
              alt="Substop logo"
              className="rounded-lg md:block hidden"
            />
            <HamburgerAnimated extraStyle={`flex mr-2 md:hidden`} />
            <div className="text-md text-base-content font-primary font-normal">
              <Link href="/">
                <p>
                  Sub<span className="text-primary">Stop</span>
                </p>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <Navigation extraStyles={`hidden md:flex`} />

          {/* Right buttons */}
          <div className="flex gap-2 items-center">
            <Modal open={open} onClose={handleClose}>
              <p className="text-lg font-normal text-center mb-2">
                New Subscription
              </p>
              <FormNewSub onClose={handleClose} />
            </Modal>

            <div
              className="md:tooltip md:tooltip-bottom"
              data-tip="Add new wish"
            >
              <button
                onClick={() => setOpen(true)}
                className="btn btn-circle md:bg-base-300 hover:bg-base-200 border-white/20"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.48043 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                    className="fill-base-content"
                  />
                </svg>
              </button>
            </div>

            <MenuAvatarPopover />
          </div>
        </div>

        {children}
      </div>
    </header>
  );
};

export default DashboardHeader;
