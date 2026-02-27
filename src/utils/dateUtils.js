const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const formatDate = timestamp => {
  const d = new Date(timestamp);
  return `${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

export const formatDateShort = timestamp => {
  const d = new Date(timestamp);
  return `${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}`;
};

export const getMonthYear = timestamp => {
  const d = new Date(timestamp);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const getMonthName = index => MONTHS[index] || '';

export const isCurrentMonth = timestamp => {
  const d = new Date(timestamp);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

export const isSameMonth = (timestamp, month, year) => {
  const d = new Date(timestamp);
  return d.getMonth() === month && d.getFullYear() === year;
};

export const getWeekOfMonth = timestamp => {
  const d = new Date(timestamp);
  return Math.ceil(d.getDate() / 7);
};

export const getCurrentMonthDates = () => {
  const now = new Date();
  return {month: now.getMonth(), year: now.getFullYear()};
};

export const getDayLabel = timestamp => {
  const d = new Date(timestamp);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);

  const diff = Math.floor((today - date) / 86400000);
  if (diff === 0) {
    return 'Today';
  }
  if (diff === 1) {
    return 'Yesterday';
  }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${days[d.getDay()]}, ${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}`;
};

export const getLast7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);
    days.push({
      timestamp: date.getTime(),
      label: i === 0 ? 'Today' : i === 1 ? 'Yesterday' : formatDateShort(date.getTime()),
    });
  }
  return days;
};
