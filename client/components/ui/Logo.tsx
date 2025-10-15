import React from "react";

type LogoProps = {
    mini?: boolean;
}

export default function Logo({ mini } : LogoProps) {
	return (
		<div className={`flex items-center justify-center gap-3 ${mini ? "mb-0" : "mb-8"}`}>
			{/* Icon */}
			<div className="relative w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 rounded-lg rotate-45 shadow-lg">
				<div className="absolute inset-2 bg-white dark:bg-stone-700 rounded-sm" />
				<div className="absolute inset-0 flex items-center justify-center -rotate-45">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						className="w-7 h-7 text-amber-500 dark:text-amber-400"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						{/* Ticket shape */}
						<path d="M3 9h18M3 15h18M7 3v18M17 3v18" />
						<rect x="3" y="5" width="18" height="14" rx="2" />
					</svg>
				</div>
			</div>

			{/* Text */}
			<div className="flex items-baseline gap-1">
				<h2 className="text-3xl font-bold text-stone-100">
					Ticket
				</h2>
				<span className="text-3xl font-bold text-amber-500 dark:text-amber-400">
					X
				</span>
			</div>
		</div>
	);
}