class AdminValidators {
  static validateHour(hour: string) {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hour);
  }

  static validateWorkingDays(days: string[]) {
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.every(day => validDays.includes(day));
  }
}

export default AdminValidators;
