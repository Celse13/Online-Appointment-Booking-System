class AdminValidators {
    static validateHour(hour: string) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hour);
    }

    static validateWorkingDays(workingdays: string[]) {
        const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return workingdays.every(day => validDays.includes(day));
    }
}

export default AdminValidators;