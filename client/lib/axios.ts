import axios from "axios";

const isServer = typeof window === "undefined"; // true = browser (CSR) & false = SSR

export const api = axios.create(
	isServer
		? {
				baseURL:
					"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
				headers: {
					Host: "tickets.dev",
				},
                withCredentials: true
		}
		: {
	    		baseURL: "/",
                withCredentials: true
		}
);

export default api;
