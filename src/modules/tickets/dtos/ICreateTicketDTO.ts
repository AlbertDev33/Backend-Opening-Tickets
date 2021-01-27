export default interface ICreateTicketDTO {
  identifier: string;
  subject: string;
  message: string;
  user_id: string;
  user_role: string;
  accountable?: string;
  status: string;
  condition: string;
  conclusion?: Date;
}
