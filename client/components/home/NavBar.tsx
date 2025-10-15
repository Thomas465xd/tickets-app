"use client";

import { useAuth } from "@/src/hooks/useAuth";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { MenuIcon, User, XIcon } from "lucide-react";
import Logo from "../ui/Logo";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/src/api/AuthAPI";
import { toast } from "react-toastify";
import Swal, { SweetAlertTheme } from "sweetalert2";

const navigation = [
	{ name: "Home", href: "#", current: true },
	{ name: "My Tickets", href: "#", current: false },
	{ name: "Projects", href: "#", current: false },
	{ name: "Calendar", href: "#", current: false },
];

function classNames(...classes: (string | undefined | false | null)[]): string {
    return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
    const { data } = useAuth(); 
    const { mutate, isPending } = useMutation({
        mutationFn: logout, 
        retry: false,
        onError: (error) => {
            console.log("🔴 Error capturado:", error);

            // Type guard for custom error shape
            const customError = error as Error & {
                type?: string;
                errors?: { field: string; message: string }[];
                message?: string;
            };
            
            // Handle validation errors (field-specific)
            if (customError.type === 'validation' && customError.errors) {
                // Show ALL error messages in toast (one toast per error)
                customError.errors.forEach((err: { field: string; message: string }) => {
                    toast.error(err.message);
                });
            } else {
                // Handle generic errors
                toast.error(customError.message || "Error while logging out ❌");
            }
        },
        onSuccess: (data) => {
            Swal.fire({
                title: "Successfully logged out 🍾",
                text: data.message, 
                icon: "success",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
            }).then(() => {
                window.location.href = "/"; // ✅ Full reload
            });
        }
    })

    const handleLogout = () => {
        mutate();
        console.log("hi")
    }

	return (
		<Disclosure
			as="nav"
			className="relative bg-stone-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
		>
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8v py-2">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						{/* Mobile menu button*/}
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-amber-500">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<MenuIcon
								aria-hidden="true"
								className="block size-6 group-data-open:hidden"
							/>
							<XIcon
								aria-hidden="true"
								className="hidden size-6 group-data-open:block"
							/>
						</DisclosureButton>
					</div>
					<div className="flex flex-1 items-center justify-center sm:justify-start">
						<div className="flex shrink-0 items-center">
							<Logo mini />
						</div>
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										aria-current={
											item.current ? "page" : undefined
										}
										className={classNames(
											item.current
												? "bg-stone-950/50 text-white"
												: "text-gray-300 hover:bg-white/5 hover:text-white",
											"rounded-md px-3 py-2 text-sm font-medium"
										)}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						{/* <button
							type="button"
							className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
						>
							<span className="absolute -inset-1.5" />
							<span className="sr-only">View notifications</span>
							<BellIcon aria-hidden="true" className="size-6" />
						</button> */}

                        {data ? (
                            <>
                                <div className="hidden sm:block">
                                    Welcome back
                                    <span className="highlight ml-1">{data.name}</span>
                                </div>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <MenuButton className="relative flex rounded-full gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 hover:cursor-pointer hover:underline">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <User className="size-6" color="gray"/>
                                    </MenuButton>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-stone-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <MenuItem>
                                            <Link
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                            >
                                                Your profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                            >
                                                Settings
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                                disabled={isPending}
                                            >
                                                Sign out
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </>
                        ) : (
                            <div className="">
                                <Link
                                    href="/auth/sign-in"
                                    className="text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    href="/auth/sign-up"
                                    className="text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pt-2 pb-3">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as="a"
							href={item.href}
							aria-current={item.current ? "page" : undefined}
							className={classNames(
								item.current
									? "bg-stone-950/50 text-white"
									: "text-gray-300 hover:bg-white/5 hover:text-white",
								"block rounded-md px-3 py-2 text-base font-medium"
							)}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
