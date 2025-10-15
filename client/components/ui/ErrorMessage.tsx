import { ReactNode } from "react";
import { XCircle, AlertTriangle, AlertOctagon } from "lucide-react";

type ErrorMessageProps = {
	children: ReactNode;
	variant?: "standard" | "mini" | "toast" | "inline" | "subtle";
	icon?: boolean;
	iconType?: "circle" | "triangle" | "octagon";
	dismissable?: boolean;
	onDismiss?: () => void;
	className?: string;
};

export default function ErrorMessage({
	children,
	variant = "standard",
	icon = true,
	iconType = "circle",
	dismissable = false,
	onDismiss,
	className = "",
}: ErrorMessageProps) {
	// Select the appropriate icon component
	const IconComponent = {
		circle: XCircle,
		triangle: AlertTriangle,
		octagon: AlertOctagon,
	}[iconType];

	// Base styles for each variant
	const variantStyles = {
		standard:
			"bg-red-100 text-red-700 font-bold p-3 uppercase text-sm border-l-4 border-red-500 my-2",
		mini: "bg-transparent text-red-500 text-xs font-medium p-0 text-left mt-0",
		toast: "bg-red-500 text-white font-medium py-3 px-4 rounded-md shadow-md",
		inline: "flex items-center text-red-600 text-sm font-medium",
		subtle: "bg-red-50 text-red-800 text-sm p-2 rounded border border-red-200",
	};

	return (
		<div
			className={`${variantStyles[variant]} ${
				variant !== "mini" && variant !== "inline"
					? "flex items-start"
					: ""
			} ${dismissable ? "pr-8" : ""} ${className} relative`}
		>
			{icon && IconComponent && (
				<span
					className={`${
						variant === "inline" || variant === "mini"
							? "mr-1"
							: "mr-2 mt-0.5"
					} flex-shrink-0`}
				>
					<IconComponent
						size={
							variant === "mini"
								? 12
								: variant === "inline"
								? 16
								: 20
						}
						className={variant === "toast" ? "text-white" : ""}
					/>
				</span>
			)}
			<div className={`${variant === "inline" ? "inline" : "flex-grow"}`}>
				{children}
			</div>

			{dismissable && (
				<button
					onClick={onDismiss}
					className={`absolute right-2 ${
						variant === "mini" ? "top-0" : "top-2"
					} hover:bg-red-200 hover:text-red-800 rounded-full p-1 transition-colors`}
					aria-label="Dismiss"
				>
					<XCircle size={variant === "mini" ? 14 : 16} />
				</button>
			)}
		</div>
	);
}