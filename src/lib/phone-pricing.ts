import type { Phone } from "@/data/phones";

export const PHONE_DISCOUNT = 0.2; // 20% off

export function getPhonePricing(phone: Pick<Phone, "price">) {
  const original = phone.price;
  const current = Math.round((original * (1 - PHONE_DISCOUNT)) / 100) * 100;
  return {
    original,
    current,
    discountPercent: Math.round(PHONE_DISCOUNT * 100),
  };
}
