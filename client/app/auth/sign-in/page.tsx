import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function page() {
    return (
        <section>
            <Logo />
            <LoginForm />

            <div className="flex flex-col items-center gap-5 mt-5 mb-5">
                <Link 
                    className="link" 
                    href="/auth/sign-up"
                >
                    Don&apos;t have an account? {' '}
                    <span className='font-semibold'>Sign Up here</span>
                </Link>

                <Link 
                    className="link" 
                    href="/auth/forgot"
                >
                    Forgot your password? {' '}
                    <span className='font-semibold'>Reset </span>
                </Link>
            </div>
        </section>
    )
}
