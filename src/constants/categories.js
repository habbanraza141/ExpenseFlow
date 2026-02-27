const CATEGORIES = [
  {id: 'food', name: 'Food & Dining', icon: 'restaurant', color: '#EF4444'},
  {id: 'transport', name: 'Transport', icon: 'directions-car', color: '#06B6D4'},
  {id: 'shopping', name: 'Shopping', icon: 'shopping-cart', color: '#8B5CF6'},
  {id: 'bills', name: 'Bills & Utilities', icon: 'flash-on', color: '#10B981'},
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'movie',
    color: '#F59E0B',
  },
  {id: 'health', name: 'Health', icon: 'favorite', color: '#EC4899'},
  {id: 'education', name: 'Education', icon: 'school', color: '#3B82F6'},
  {
    id: 'other',
    name: 'Other',
    icon: 'more-horiz',
    color: '#6366F1',
  },
];

export default CATEGORIES;

export const getCategoryById = id =>
  CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
