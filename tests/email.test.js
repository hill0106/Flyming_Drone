const email = require('../API/email');

// Mock axios
jest.mock('axios');
const axios = require('axios');

describe('Email API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up environment variables for testing
    process.env.RAPIDAPI_KEY = 'test_rapidapi_key';
    process.env.RAPIDAPI_HOST = 'rapidmail.p.rapidapi.com';
    process.env.CONTACT_EMAIL = 'test@example.com';
    process.env.EMAIL_SENDER_NAME = 'Test Drone';
    process.env.EMAIL_TITLE = 'Test Contact';
  });

  describe('sendEmail', () => {
    it('should send email successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Email sent successfully'
        }
      };

      axios.request.mockResolvedValueOnce(mockResponse);

      const emailData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        content: 'Test message content'
      };

      await email.sendEmail(
        emailData.name,
        emailData.email,
        emailData.subject,
        emailData.content
      );

      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://rapidmail.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'test_rapidapi_key',
          'X-RapidAPI-Host': 'rapidmail.p.rapidapi.com'
        },
        data: {
          ishtml: 'false',
          sendto: 'test@example.com',
          name: 'Test Drone',
          replyTo: 'test@example.com',
          title: 'Test Contact',
          body: expect.stringContaining('Test User')
        }
      });
    });

    it('should handle email sending errors gracefully', async () => {
      const error = new Error('Email service unavailable');
      axios.request.mockRejectedValueOnce(error);

      // Mock console.log to avoid test output pollution
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await email.sendEmail('Test', 'test@example.com', 'Subject', 'Content');

      expect(consoleSpy).toHaveBeenCalledWith('Send Email Error: ', error);
      
      consoleSpy.mockRestore();
    });

    it('should format email body correctly', async () => {
      axios.request.mockResolvedValueOnce({ data: { message: 'Success' } });

      await email.sendEmail('John Doe', 'john@example.com', 'Test Subject', 'Test Content');

      const callArgs = axios.request.mock.calls[0][0];
      expect(callArgs.data.body).toContain('Name: John Doe');
      expect(callArgs.data.body).toContain('Email: john@example.com');
      expect(callArgs.data.body).toContain('Subject: Test Subject');
      expect(callArgs.data.body).toContain('Content: Test Content');
    });

    it('should use environment variables for configuration', async () => {
      axios.request.mockResolvedValueOnce({ data: { message: 'Success' } });

      await email.sendEmail('Test', 'test@example.com', 'Subject', 'Content');

      const callArgs = axios.request.mock.calls[0][0];
      expect(callArgs.headers['X-RapidAPI-Key']).toBe('test_rapidapi_key');
      expect(callArgs.headers['X-RapidAPI-Host']).toBe('rapidmail.p.rapidapi.com');
      expect(callArgs.data.sendto).toBe('test@example.com');
      expect(callArgs.data.name).toBe('Test Drone');
      expect(callArgs.data.title).toBe('Test Contact');
    });
  });
});
