enum TicketPriority {
    Low = 0,
    Medium = 1,
    High = 2
}

const TicketPriorityStrings: { [key: number]: string } = {
  [TicketPriority.Low]: "Baixa",
  [TicketPriority.Medium]: "Média",
  [TicketPriority.High]: "Alta"
};

export function getPriorityString(value: number): string | undefined {
  return TicketPriorityStrings[value];
}

export { TicketPriority };