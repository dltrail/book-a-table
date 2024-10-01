// Email Validation
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number Validation
export const isValidPhone = (phone: string) => {
  const phoneRegex = /^[0-9]{7,15}$/ // Allows 7 to 15 digits
  return phoneRegex.test(phone)
}

// Form Validator
export interface BookingData {
    name: string;
    email: string;
    phone: string;
    date: string; // Consider using Date type if necessary
    time: string; // Consider using Date type if necessary
    guests: number; // Consider using number if converting before validation
}

export const validateFormData = (data: BookingData): string | null => {
    const { name, email, phone, date, time, guests } = data;
    const bookingDateTime = new Date(`${date}T${time}`);
    const currentTime = new Date();
    const oneHourInMillis = 60 * 60 * 1000;

    if (!name || !email || !phone) return "Please fill out all required fields.";
    if (!isValidEmail(email)) return "Please enter a valid email.";
    if (!isValidPhone(phone)) return "Please enter a valid phone number.";
    if (!date || !time) return "Please select a valid date and time.";
    if (guests > 12) return "Bookings are limited to 12 people.";

    if (bookingDateTime.getTime() < currentTime.getTime() + oneHourInMillis) {
        return "Bookings must be scheduled at least 1 hour in the future.";
    }
    return null;
};
