export const formatCurrency = amount => {
  return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrencyShort = amount => {
  if (amount >= 1000) {
    return '$' + (amount / 1000).toFixed(1) + 'k';
  }
  return '$' + amount.toFixed(0);
};
