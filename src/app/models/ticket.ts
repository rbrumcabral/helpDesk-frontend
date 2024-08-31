export interface Ticket {
	id?: any;
	openedDate: string;
	closedDate: string; 
	priority: string;
	status: string;
	title: string;
	observations: string;
    technician: any;
	client : any;
    technicianName: string;
	clientName : string;
}