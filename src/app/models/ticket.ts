export interface Ticket {
	id?: any;
	openedDate?: string;
	closedDate?: string; 
	priority: string;
	status: string;
	title: string;
	description: string;
    technician: any;
	client : any;
}