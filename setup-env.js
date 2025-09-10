#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment variables for Flyming Drone...\n');

// Check if .env already exists
if (fs.existsSync('.env')) {
    console.log('⚠️  .env file already exists!');
    console.log('   If you want to recreate it, delete the existing .env file first.\n');
    process.exit(0);
}

// Check if env.example exists
if (!fs.existsSync('env.example')) {
    console.log('❌ env.example file not found!');
    process.exit(1);
}

// Copy env.example to .env
try {
    fs.copyFileSync('env.example', '.env');
    console.log('✅ Created .env file from env.example');
    console.log('📝 Please edit .env file with your actual API keys:');
    console.log('   - YOUTUBE_API_KEY: Get from Google Cloud Console');
    console.log('   - YOUTUBE_CHANNEL_ID: Your YouTube channel ID');
    console.log('   - RAPIDAPI_KEY: Get from RapidAPI');
    console.log('   - CONTACT_EMAIL: Your contact email address');
    console.log('\n🔒 Remember: Never commit .env to version control!');
} catch (error) {
    console.log('❌ Error creating .env file:', error.message);
    process.exit(1);
}
