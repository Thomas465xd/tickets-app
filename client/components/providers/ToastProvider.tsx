"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";

export default function ToastProvider() {
    const { theme } = useTheme();

	return (
		<ToastContainer position="top-right" autoClose={3000} theme={theme} />
	);
}