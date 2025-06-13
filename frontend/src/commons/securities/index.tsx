import dynamic from "next/dynamic";

export const PublicAccess = dynamic(() => import("./PublicAccess"), { ssr: true });
export const PrivateAccess = dynamic(() => import("./PrivateAccess"), { ssr: false });
export const AuthAccess = dynamic(() => import("./AuthAccess"), { ssr: true });
