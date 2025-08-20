export function createHumanReadablePrice(
  amount: number,
  currency: string = 'CHF',
): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount provided');
  }
  const amountString = amount.toString();

  // insert a dot before the last two digits
  const integerPart = amountString.slice(0, -2);
  const fractionalPart = amountString.slice(-2);

  return `${integerPart}.${fractionalPart} ${currency}`;
}
