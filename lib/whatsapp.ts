// lib/whatsapp.ts
import type { CartItem } from "@/lib/zustand/useCartStore";

const PHONE = "5511999999999"; // troque pelo número real (formato: DDI+DDD+número)

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function buildWhatsAppMessage(items: CartItem[], totalUnits: number, totalPrice: number) {
  const header =
    "🧢 *Novo orçamento — Ouro Bonés*\n" +
    "Olá! Montei meu pedido pelo site e gostaria de finalizar:\n";

  const body = items
    .map((i, idx) => {
      const subtotal = BRL.format(i.unitPrice * i.quantity);
      const notes = i.notes ? `\n   📝 Obs: ${i.notes}` : "";
      return (
        `\n*${idx + 1}. ${i.name}*\n` +
        `   • Modelo/Variação: ${i.variant}\n` +
        `   • Quantidade: ${i.quantity} un.\n` +
        `   • Unitário: ${BRL.format(i.unitPrice)}\n` +
        `   • Subtotal: ${subtotal}${notes}`
      );
    })
    .join("\n");

  const footer =
    `\n\n──────────────\n` +
    `*Total de peças:* ${totalUnits} un.\n` +
    `*Valor estimado:* ${BRL.format(totalPrice)}\n\n` +
    `Aguardo o contato da equipe para alinhar logo, cores e prazo. 🚀`;

  return encodeURIComponent(header + body + footer);
}

export function buildWhatsAppLink(items: CartItem[], totalUnits: number, totalPrice: number) {
  return `https://wa.me/${PHONE}?text=${buildWhatsAppMessage(items, totalUnits, totalPrice)}`;
}