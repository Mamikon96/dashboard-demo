export interface Notification {
	type: string;
	text: string;
	color?: 'success' | 'warning' | 'danger';
}