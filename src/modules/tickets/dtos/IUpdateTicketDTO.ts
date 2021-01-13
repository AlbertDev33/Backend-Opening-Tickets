export default interface IUpdateTicketDTO {
  subject?: string;
  message?: string;
  accountable?: string;
  status?: string;
  condition?: string;
  conclusion?: Date;
}
