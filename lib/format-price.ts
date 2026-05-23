const THB_SYMBOL = "฿"

export function formatPrice(amount: number): string {
  return `${THB_SYMBOL}${amount.toFixed(0)}`
}
