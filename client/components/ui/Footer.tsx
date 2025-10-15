import Link from "next/link";

type FooterProps = {
    dark?: boolean; 
}

export default function Footer({ dark }: FooterProps) {
    return (
        <footer className={`${dark ? "bg-stone-900 border-t-2 border-stone-700" : "bg-stone-100 border-stone-300 dark:bg-stone-900 border-t-2 dark:border-stone-700"} flex justify-between`}>
            <p className={`text-center p-4 ${dark ? "text-stone-400" : "text-stone-700 dark:text-stone-400"}`}>
                TicketX - Microservices - Copyright &copy; {}
            </p>
            <p className={`text-center p-4 ${dark ? "text-stone-400" : "text-stone-700 dark:text-stone-400"} text-sm`}>
                Developed by{' '}
                <Link
                    className={`${dark ? "text-stone-400 hover:text-stone-300" : "hover:text-stone-900 dark:hover:text-stone-500 "} font-semibold transition-colors duration-200`}
                    href="https://thomas-dev-portfolio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Thomas Schrödinger GitHub Profile"
                >
                    Thomas Schrödinger
                </Link>
            </p>
        </footer>
    );
}