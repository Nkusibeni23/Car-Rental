"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import clsx from "clsx";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-black">
              Car & Driver Rental Hub
            </Link>
          </div>

          {/* Right side  */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button className="text-gray-900 hover:text-gray-700 p-2">
              <FaShoppingCart className="h-5 w-5" />
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="flex items-center text-gray-900 hover:text-gray-700 p-2 rounded-md"
                  onClick={!isAuthenticated ? handleProfileClick : undefined}
                >
                  <FaUser className="h-5 w-5" />
                  {isAuthenticated && (
                    <HiChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Menu.Button>
              </div>

              {isAuthenticated && (
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-700">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Manage Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                    </div>

                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full text-left px-4 py-2 text-sm"
                            )}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              )}
            </Menu>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-900 hover:text-gray-700 p-2">
                <FaBars className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
