declare global {
  interface Date {
    addDays(days: number): Date;
  }
}

Date.prototype.addDays = function (days: number): Date {
  const date = new Date(this);
  date.setDate(date.getDate() + days);
  return date;
};

export {}