import {getCategoryById} from '../constants/categories';
import {isSameMonth, getWeekOfMonth} from './dateUtils';

export const getMonthlyExpenses = (expenses, month, year) => {
  return expenses.filter(e => isSameMonth(e.date, month, year));
};

export const getTotalSpent = expenses => {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
};

export const getSpentByCategory = expenses => {
  const map = {};
  expenses.forEach(e => {
    if (!map[e.category]) {
      map[e.category] = 0;
    }
    map[e.category] += e.amount;
  });
  return map;
};

export const getCategoryBreakdown = expenses => {
  const spentMap = getSpentByCategory(expenses);
  const total = getTotalSpent(expenses);

  return Object.entries(spentMap)
    .map(([categoryId, amount]) => {
      const category = getCategoryById(categoryId);
      return {
        ...category,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
      };
    })
    .sort((a, b) => b.amount - a.amount);
};

export const getWeeklyBreakdown = expenses => {
  const weeks = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  expenses.forEach(e => {
    const week = getWeekOfMonth(e.date);
    if (weeks[week] !== undefined) {
      weeks[week] += e.amount;
    }
  });
  return Object.entries(weeks)
    .map(([week, amount]) => ({
      label: `W${week}`,
      amount,
    }))
    .filter(w => w.amount > 0);
};

export const getBudgetUsage = (expenses, budgets) => {
  const spentMap = getSpentByCategory(expenses);

  return budgets.map(budget => {
    const spent = spentMap[budget.category] || 0;
    const category = getCategoryById(budget.category);
    const percentage =
      budget.monthlyLimit > 0 ? (spent / budget.monthlyLimit) * 100 : 0;

    return {
      ...category,
      spent,
      limit: budget.monthlyLimit,
      percentage: Math.min(percentage, 100),
      rawPercentage: percentage,
      isOverBudget: spent > budget.monthlyLimit,
      remaining: Math.max(budget.monthlyLimit - spent, 0),
    };
  });
};

export const generateInsights = (currentExpenses, prevExpenses) => {
  const insights = [];
  const currentTotal = getTotalSpent(currentExpenses);
  const prevTotal = getTotalSpent(prevExpenses);

  if (prevTotal > 0) {
    const change = ((currentTotal - prevTotal) / prevTotal) * 100;
    if (change > 10) {
      insights.push({
        type: 'warning',
        text: `You've spent ${Math.abs(Math.round(change))}% more this month compared to last month.`,
        icon: 'trending-up',
      });
    } else if (change < -10) {
      insights.push({
        type: 'success',
        text: `Great job! You've spent ${Math.abs(Math.round(change))}% less this month.`,
        icon: 'trending-down',
      });
    }
  }

  const currentCat = getSpentByCategory(currentExpenses);
  const prevCat = getSpentByCategory(prevExpenses);

  Object.entries(currentCat).forEach(([catId, amount]) => {
    const prev = prevCat[catId] || 0;
    if (prev > 0) {
      const diff = ((amount - prev) / prev) * 100;
      if (diff > 20) {
        const cat = getCategoryById(catId);
        insights.push({
          type: 'warning',
          text: `You spent ${Math.round(diff)}% more on ${cat.name} this month.`,
          icon: 'error-outline',
        });
      }
    }
  });

  const topCat = Object.entries(currentCat).sort(([, a], [, b]) => b - a)[0];
  if (topCat) {
    const cat = getCategoryById(topCat[0]);
    const pct =
      currentTotal > 0 ? Math.round((topCat[1] / currentTotal) * 100) : 0;
    insights.push({
      type: 'info',
      text: `${cat.name} is your top category at ${pct}% of total spending.`,
      icon: 'info-outline',
    });
  }

  if (insights.length === 0) {
    insights.push({
      type: 'success',
      text: 'Your spending looks balanced this month. Keep it up!',
      icon: 'check-circle',
    });
  }

  return insights;
};
