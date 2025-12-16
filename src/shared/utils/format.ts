export function formatCurrency(amount: number) {
  return `${amount.toFixed(2)}`
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString()
}
