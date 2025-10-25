import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import ReactQueryProvider from "@/components/providers/QueryClientProvider";
import { Theme } from "@/components/providers/ThemeProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import BackToTopButton from "@/components/ui/BackToTop";

// Font optimization
const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap", // Ensures text remains visible during font loading
});

// Viewport configuration for responsive design and mobile optimization
export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0f172a" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
};

// SEO Configuration
const siteConfig = {
	name: "TicketX",
	title: "TicketX",
	description: "Find the tickets for your favorite artists in TicketX.",
	url: "https://www.tickets.dev", // Replace with your actual domain
	siteName: "TicketX",
	locale: "es_CL",
	type: "website",
};

export const metadata: Metadata = {
	title: {
        template: `%s | ${siteConfig.name}`,
        default: siteConfig.title
    },
	description: siteConfig.description
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
                suppressHydrationWarning
				className="font-sans antialiased flex min-h-screen flex-col"
			>
                <ReactQueryProvider>
                    <Theme>
                        <ToastProvider />
                        {children}
                        <BackToTopButton />
                    </Theme>
                </ReactQueryProvider>
			</body>
		</html>
	);
}
