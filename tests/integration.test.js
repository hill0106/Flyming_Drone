// Integration tests
describe('Integration Tests', () => {
  describe('Environment Variables', () => {
    it('should have required environment variables set', () => {
      expect(process.env.NODE_ENV).toBe('test');
      expect(process.env.PORT).toBe('3001');
    });
  });

  describe('Package Dependencies', () => {
    it('should have required dependencies installed', () => {
      const packageJson = require('../package.json');
      
      expect(packageJson.dependencies).toHaveProperty('express');
      expect(packageJson.dependencies).toHaveProperty('ejs');
      expect(packageJson.dependencies).toHaveProperty('axios');
      expect(packageJson.dependencies).toHaveProperty('node-localstorage');
      expect(packageJson.dependencies).toHaveProperty('dotenv');
    });

    it('should have test dependencies installed', () => {
      const packageJson = require('../package.json');
      
      expect(packageJson.devDependencies).toHaveProperty('jest');
      expect(packageJson.devDependencies).toHaveProperty('supertest');
    });
  });

  describe('File Structure', () => {
    const fs = require('fs');
    const path = require('path');

    it('should have required directories', () => {
      expect(fs.existsSync('API')).toBe(true);
      expect(fs.existsSync('views')).toBe(true);
      expect(fs.existsSync('public')).toBe(true);
      expect(fs.existsSync('tests')).toBe(true);
    });

    it('should have required files', () => {
      expect(fs.existsSync('app.js')).toBe(true);
      expect(fs.existsSync('package.json')).toBe(true);
      expect(fs.existsSync('jest.config.js')).toBe(true);
    });

    it('should have API files', () => {
      expect(fs.existsSync('API/index.js')).toBe(true);
      expect(fs.existsSync('API/youtube.js')).toBe(true);
      expect(fs.existsSync('API/email.js')).toBe(true);
    });

    it('should have view files', () => {
      expect(fs.existsSync('views/index.ejs')).toBe(true);
      expect(fs.existsSync('views/AboutMe.ejs')).toBe(true);
      expect(fs.existsSync('views/Project.ejs')).toBe(true);
      expect(fs.existsSync('views/Contact.ejs')).toBe(true);
    });
  });
});
