import { Role } from "../services/auth.service";

export interface IRouteInfo {
	id: string;
	title: string;
	roles?: Role[];
}

export interface Tab extends IRouteInfo {
	path: string;
	iconName?: string;
	iconTemplate?: string;
	active?: boolean;
}

// export interface Tab {
// 	id: string;
// 	title: string;
// 	roles: Roles[];
// 	iconName?: string;
// 	iconTemplate?: string;
// 	active?: boolean;
// }
