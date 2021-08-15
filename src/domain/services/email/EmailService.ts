export interface EmailService {
  sendMail: (to: string, content: string) => void;
}
