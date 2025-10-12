import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// /* config options here */
	// webpack: (config) => {
	// 	return {
	// 		...config,
	// 		watchOptions: {
	// 			...config.watchOptions,
	// 			poll: 300,
	// 		},
	// 	};
	// },
	allowedDevOrigins: [
        "tickets.dev"
    ],
};

export default nextConfig;
