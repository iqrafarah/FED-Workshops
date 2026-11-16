const euroFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
});

export function formatPrice(price: number): string {
  return euroFormatter.format(price);
}
