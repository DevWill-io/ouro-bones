import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  company: z.string().optional(),
  message: z.string().min(10, 'Descreva sua necessidade'),
});

export const newsletterSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(2),
  colors: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  role: z.string().optional(),
  content: z.string().min(10),
  rating: z.number().min(1).max(5),
  published: z.boolean().default(false),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;