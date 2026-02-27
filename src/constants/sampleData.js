const now = new Date();
const Y = now.getFullYear();
const M = now.getMonth();

const d = (year, month, day) => new Date(year, month, day).getTime();

export const SAMPLE_EXPENSES = [
  {id: 'e1', title: 'Grocery Shopping', amount: 85.5, category: 'food', date: d(Y, M, 2), description: 'Weekly groceries'},
  {id: 'e2', title: 'Uber to Airport', amount: 34.0, category: 'transport', date: d(Y, M, 3), description: ''},
  {id: 'e3', title: 'Netflix Subscription', amount: 15.99, category: 'entertainment', date: d(Y, M, 5), description: 'Monthly plan'},
  {id: 'e4', title: 'Electricity Bill', amount: 120.0, category: 'bills', date: d(Y, M, 7), description: ''},
  {id: 'e5', title: 'Lunch with Friends', amount: 42.5, category: 'food', date: d(Y, M, 8), description: ''},
  {id: 'e6', title: 'Amazon Purchase', amount: 67.99, category: 'shopping', date: d(Y, M, 10), description: 'New headphones'},
  {id: 'e7', title: 'Gym Membership', amount: 49.99, category: 'health', date: d(Y, M, 12), description: 'Monthly fee'},
  {id: 'e8', title: 'Gas Station', amount: 55.0, category: 'transport', date: d(Y, M, 14), description: ''},
  {id: 'e9', title: 'Online Course', amount: 29.99, category: 'education', date: d(Y, M, 15), description: 'React Native course'},
  {id: 'e10', title: 'Dinner Date', amount: 95.0, category: 'food', date: d(Y, M, 17), description: 'Italian restaurant'},
  {id: 'e11', title: 'Internet Bill', amount: 79.99, category: 'bills', date: d(Y, M, 18), description: ''},
  {id: 'e12', title: 'Movie Tickets', amount: 28.0, category: 'entertainment', date: d(Y, M, 20), description: 'IMAX'},
  {id: 'e13', title: 'Coffee Shop', amount: 12.5, category: 'food', date: d(Y, M, 22), description: ''},
  {id: 'e14', title: 'Pharmacy', amount: 35.0, category: 'health', date: d(Y, M, 23), description: 'Vitamins'},
  {id: 'e15', title: 'Clothes Shopping', amount: 156.0, category: 'shopping', date: d(Y, M, 25), description: 'Winter sale'},

  {id: 'e16', title: 'Rent Payment', amount: 1200.0, category: 'bills', date: d(Y, M - 1, 1), description: 'Monthly rent'},
  {id: 'e17', title: 'Groceries', amount: 95.0, category: 'food', date: d(Y, M - 1, 3), description: ''},
  {id: 'e18', title: 'Bus Pass', amount: 75.0, category: 'transport', date: d(Y, M - 1, 5), description: 'Monthly transit'},
  {id: 'e19', title: 'Spotify', amount: 9.99, category: 'entertainment', date: d(Y, M - 1, 8), description: ''},
  {id: 'e20', title: 'Doctor Visit', amount: 150.0, category: 'health', date: d(Y, M - 1, 10), description: 'Annual checkup'},
  {id: 'e21', title: 'Textbooks', amount: 89.0, category: 'education', date: d(Y, M - 1, 12), description: ''},
  {id: 'e22', title: 'Pizza Night', amount: 35.0, category: 'food', date: d(Y, M - 1, 15), description: ''},
  {id: 'e23', title: 'Phone Case', amount: 25.0, category: 'shopping', date: d(Y, M - 1, 18), description: ''},
  {id: 'e24', title: 'Water Bill', amount: 45.0, category: 'bills', date: d(Y, M - 1, 20), description: ''},
  {id: 'e25', title: 'Concert Tickets', amount: 85.0, category: 'entertainment', date: d(Y, M - 1, 22), description: ''},
];

export const SAMPLE_BUDGETS = [
  {category: 'food', monthlyLimit: 400},
  {category: 'transport', monthlyLimit: 200},
  {category: 'shopping', monthlyLimit: 300},
  {category: 'bills', monthlyLimit: 500},
  {category: 'entertainment', monthlyLimit: 100},
  {category: 'health', monthlyLimit: 150},
  {category: 'education', monthlyLimit: 100},
  {category: 'other', monthlyLimit: 100},
];
