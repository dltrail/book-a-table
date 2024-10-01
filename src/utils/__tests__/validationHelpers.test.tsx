import { isValidEmail, isValidPhone, validateFormData, BookingData } from '../validationHelpers';

describe('Validation Functions', () => {
  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user@sub.example.com')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('plainaddress')).toBe(false);
      expect(isValidEmail('@missingusername.com')).toBe(false);
      expect(isValidEmail('username@.com')).toBe(false);
      expect(isValidEmail('username@domain..com')).toBe(false);
      expect(isValidEmail('username@domain.com.')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should return true for valid phone numbers', () => {
      expect(isValidPhone('1234567')).toBe(true);  // 7 digits
      expect(isValidPhone('12345678901')).toBe(true); // 15 digits
      expect(isValidPhone('123456789')).toBe(true); // 9 digits
    });

    it('should return false for invalid phone numbers', () => {
      expect(isValidPhone('12345')).toBe(false); // Less than 7 digits
      expect(isValidPhone('1234567890123456')).toBe(false); // More than 15 digits
      expect(isValidPhone('1234abc')).toBe(false); // Contains letters
      expect(isValidPhone('')).toBe(false); // Empty string
    });
  });

  describe('validateFormData', () => {
    const validData: BookingData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      date: '2024-10-01',
      time: '14:00',
      guests: 2,
    };

    it('should return null for valid booking data', () => {
      const result = validateFormData(validData);
      expect(result).toBe(null);
    });

    it('should return error message for missing required fields', () => {
      const result = validateFormData({ ...validData, name: '' });
      expect(result).toBe("Please fill out all required fields.");
    });

    it('should return error message for invalid email', () => {
      const result = validateFormData({ ...validData, email: 'invalid-email' });
      expect(result).toBe("Please enter a valid email.");
    });

    it('should return error message for invalid phone number', () => {
      const result = validateFormData({ ...validData, phone: 'invalid-phone' });
      expect(result).toBe("Please enter a valid phone number.");
    });

    it('should return error message for missing date and time', () => {
      const result = validateFormData({ ...validData, date: '', time: '' });
      expect(result).toBe("Please select a valid date and time.");
    });

    it('should return error message for too many guests', () => {
      const result = validateFormData({ ...validData, guests: 15 });
      expect(result).toBe("Bookings are limited to 12 people.");
    });

    it('should return error message for bookings made in the past', () => {
      const pastDateData: BookingData = {
        ...validData,
        date: '2024-01-01',
        time: '12:00',
      };
      const result = validateFormData(pastDateData);
      expect(result).toBe("Bookings must be scheduled at least 1 hour in the future.");
    });
  });
});
