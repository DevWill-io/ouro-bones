export interface Lead {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source: 'newsletter' | 'contact';
  createdAt?: string;
}