"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="flex items-center justify-center">
			<div className="bg-gray-200 dark:bg-stone-800 lg:dark:bg-zinc-700 rounded-lg p-1 flex gap-1">
				<button
					onClick={() => setTheme("light")}
					className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 ${
						theme === "light"
							? "bg-white text-yellow-500 shadow-md"
							: "text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
					}`}
					aria-label="Light mode"
				>
					<Sun size={18} />
				</button>

				<button
					onClick={() => setTheme("dark")}
					className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 ${
						theme === "dark"
							? "bg-gray-800 text-blue-400 shadow-md"
							: "text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
					}`}
					aria-label="Dark mode"
				>
					<Moon size={18} />
				</button>
			</div>
		</div>
	);
}