"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { ShoppingCart, User, LayoutDashboard, LogOut } from "lucide-react";
import { HiChevronDown } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/authSlice";
import { useToast } from "@/components/ToastProvider";
import clsx from "clsx";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Signed Out", "You have been successfully signed out.");
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

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button className="text-gray-900 hover:text-gray-700 p-2 relative cursor-pointer">
                  <ShoppingCart size={35} />
                  {/* Quantity Badge */}
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>

              {/* Total Price */}
              <div className="text-sm text-gray-700">
                <span className="font-semibold">RWF 245,000</span>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            {/* Profile Section */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="flex items-center text-gray-900 hover:text-gray-700 p-2 rounded-md cursor-pointer"
                  onClick={!isAuthenticated ? handleProfileClick : undefined}
                >
                  <Image
                    src="/images/abstract-user-flat-4.png"
                    alt="User Icon"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />

                  {/* User Info */}
                  {isAuthenticated && user && (
                    <div className="ml-3 text-left">
                      <p className="text-base font-bold text-gray-900">
                        {user.fName && user.lName
                          ? `${user.fName} ${user.lName}`
                          : "User"}
                      </p>
                      <p className="text-xs font-medium text-gray-500 truncate max-w-[150px]">
                        {user.email}
                      </p>
                    </div>
                  )}

                  {isAuthenticated && (
                    <HiChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
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
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none">
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
                              "flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                            )}
                          >
                            <User className="mr-3 h-4 w-4" />
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
                              "flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                            )}
                          >
                            <LayoutDashboard className="mr-3 h-4 w-4" />
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
                                ? "bg-red-50 text-red-700"
                                : "text-gray-700",
                              "flex items-center w-full text-left px-4 py-2 text-sm hover:bg-red-50 hover:text-red-700 transition-group cursor-pointer"
                            )}
                          >
                            <LogOut className="mr-3 h-4 w-4 group-hover:text-red-600" />
                            <span className="group-hover:text-red-600">
                              Logout
                            </span>
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
