"use client";
import { login } from "@/src/api/AuthAPI";
import { LoginUserForm } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import Swal, { SweetAlertTheme } from "sweetalert2";
import ErrorMessage from "../ui/ErrorMessage";

export default function LoginForm() {
    const initialValues : LoginUserForm = {
        email: "",
        password: ""
    }

    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginUserForm>({defaultValues: initialValues});

    const { mutate } = useMutation({
        mutationFn: login,
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
                toast.error(customError.message || "Ocurrió un error inesperado");
            }
        },
        onSuccess: (data) => {
            Swal.fire({
                title: "Successfully logged in 🍾",
                text: data.message, 
                icon: "success",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
            }).then(() => {
                router.push("/");
            })

            reset()
        }
    })

    const handleLogin = (formData: LoginUserForm) => {
        console.log("📝 Submitting form:", formData.email);
        mutate(formData);
    }
    
    return (
        <form 
            className="p-12 bg-white dark:bg-stone-700 rounded-md"
            onSubmit={handleSubmit(handleLogin)}
        >
            <h1 className="text-4xl font-bold mb-2">
                Sign In
            </h1>

            <p className="paragraph">
                Sign in to your account in {" "}
                Ticket {" "} <span className='highlight'>X</span>
            </p>

            <div className="border max-w-68 border-amber-400" />

            <div className="space-y-8 my-4">
                <div className="">
                    <label htmlFor="">
                        Email Adress
                    </label>
                    <input 
                        className="input" 
                        type="text" 
                        id="email"
                        placeholder="Enter your Registered Email Adress"
                        {...register("email", { 
                            required: "Email cannot be empty",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && <ErrorMessage variant="inline">{errors.email.message}</ErrorMessage>}
                </div>

                <div className="">
                    <label htmlFor="">
                        Password
                    </label>
                    <input 
                        className="input" 
                        id="email"
                        type="password" 
                        placeholder="Enter your registered Password"
                        {...register("password", {
                            required: "Password cannot be empty",
                        })}
                    />
                    {errors.password && <ErrorMessage variant="inline">{errors.password.message}</ErrorMessage>}
                </div>
            </div>

            <button
                className="bg-amber-400 text-white px-4 py-2 rounded-md"
                type="submit"
            >
                Sign In
            </button>
        </form>
    )
}
