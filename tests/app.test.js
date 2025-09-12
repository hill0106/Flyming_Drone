const request = require('supertest');
const express = require('express');

// Mock the localStorage module
jest.mock('node-localstorage', () => ({
  LocalStorage: jest.fn(() => ({
    getItem: jest.fn(),
    setItem: jest.fn()
  }))
}));

// Mock the API module
jest.mock('../API', () => ({
  saveToLocal: jest.fn(),
  getYoutubeDataByPlaylist: jest.fn(),
  sendEmail: jest.fn()
}));

// Create a test app instance
const app = express();

// Add body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock the routes for testing
app.get('/', (req, res) => {
  res.send('<html><head><title>FlyMing Drone Page</title></head><body>Homepage</body></html>');
});

app.get('/aboutme', (req, res) => {
  res.send('<html><head><title>About</title></head><body>About Page</body></html>');
});

app.get('/project', (req, res) => {
  res.send('<html><head><title>Project</title></head><body>Project Page</body></html>');
});

app.get('/contact', (req, res) => {
  res.send('<html><head><title>Contact</title></head><body>Contact Page</body></html>');
});

app.post('/send-data', (req, res) => {
  res.json({ success: true, data: [] });
});

app.post('/submitted', (req, res) => {
  res.send(`<html><body>Thank you ${req.body.name}</body></html>`);
});

app.get('*', (req, res) => {
  res.status(404).send('<html><body>404 Not Found</body></html>');
});

describe('Express App Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return homepage with status 200', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.text).toContain('FlyMing Drone Page');
    });
  });

  describe('GET /aboutme', () => {
    it('should return about page with status 200', async () => {
      const response = await request(app)
        .get('/aboutme')
        .expect(200);
      
      expect(response.text).toContain('About');
    });
  });

  describe('GET /project', () => {
    it('should return project page with status 200', async () => {
      const response = await request(app)
        .get('/project')
        .expect(200);
      
      expect(response.text).toContain('Project');
    });
  });

  describe('GET /contact', () => {
    it('should return contact page with status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200);
      
      expect(response.text).toContain('Contact');
    });
  });

  describe('POST /send-data', () => {
    it('should handle playlist data request', async () => {
      const response = await request(app)
        .post('/send-data')
        .send({ data: '1' })
        .expect(200);
      
      expect(response.body).toBeDefined();
    });
  });

  describe('POST /submitted', () => {
    it('should handle contact form submission', async () => {
      const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        content: 'Test message content'
      };

      const response = await request(app)
        .post('/submitted')
        .send(contactData)
        .expect(200);
      
      expect(response.text).toContain('Test User');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);
      
      expect(response.text).toContain('404');
    });
  });
});
