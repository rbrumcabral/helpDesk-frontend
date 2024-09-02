enum TicketStatus {
    "OPEN" = 0,
    "IN_PROGRESS" = 1, 
    "CLOSED" = 2
}

const TicketStatusStrings: { [key: number]: string } = {
    [TicketStatus.OPEN]: "Aberto",
    [TicketStatus.IN_PROGRESS]: "Em andamento",
    [TicketStatus.CLOSED]: "Fechado"
};

export function getStatusString(value: number): string | undefined {
    return TicketStatusStrings[value];
}

export { TicketStatus };