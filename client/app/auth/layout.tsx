import Footer from "@/components/ui/Footer";
import type { ReactNode } from "react";

export default function AuthLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 relative overflow-hidden">
				{/* Darker-stone overlay */}
				<div className="absolute inset-0 bg-stone-900/40"></div>

				{/* Very subtle white highlight */}
				<div className="absolute top-1/3 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl opacity-3"></div>

				{/* Content container */}
				<div className="relative z-10">{children}</div>
			</main>

			<Footer dark />
		</>
	);
}
