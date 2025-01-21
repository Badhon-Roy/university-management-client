type Months = | 'January'| 'February'| 'March' | 'April'| 'May'| 'June'| 'July' | 'August' | 'September'| 'October'| 'November'| 'December';

const months: Months[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
export  const monthOptions = months.map((month) => ({
    value: month,
    label: month,
  }));