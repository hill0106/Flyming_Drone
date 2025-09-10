# 🚁 Flyming Drone Photography Portfolio

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19+-red.svg)](https://expressjs.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-blue.svg)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue.svg)](https://www.docker.com/)

> A modern, responsive photography portfolio website showcasing aerial drone photography with YouTube integration and contact functionality.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [🐳 Docker Deployment](#-docker-deployment)
- [☸️ Kubernetes Deployment](#️-kubernetes-deployment)
- [📁 Project Structure](#-project-structure)
- [🔧 API Endpoints](#-api-endpoints)
- [🌐 Live Demo](#-live-demo)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- **📱 Responsive Design**: Mobile-first approach with modern UI/UX
- **🎥 YouTube Integration**: Dynamic playlist loading and video display
- **📧 Contact Form**: Email functionality for inquiries
- **🔄 Auto Data Sync**: Scheduled YouTube data fetching (every 12 hours)
- **☸️ Kubernetes Ready**: Full containerization and orchestration support
- **🐳 Docker Support**: Easy deployment with Docker containers
- **📊 Analytics**: Top viewed videos and latest content tracking
- **🎨 EJS Templating**: Server-side rendering with dynamic content

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **EJS** - Template engine
- **Axios** - HTTP client for API calls
- **Node-localstorage** - Local data persistence

### Frontend
- **HTML5/CSS3** - Structure and styling
- **JavaScript** - Interactive functionality
- **Responsive Design** - Mobile-optimized layouts

### DevOps & Deployment
- **Docker** - Containerization
- **Kubernetes** - Container orchestration
- **Minikube** - Local Kubernetes development

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- YouTube API key
- RapidAPI account (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hill0106/Flyming_Drone.git
   cd Flyming_Drone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Option 1: Use the setup script (recommended)
   npm run setup
   
   # Option 2: Manual setup
   cp env.example .env
   nano .env  # or use your preferred editor
   ```

4. **Configure your API keys in `.env`**
   ```env
   # YouTube API Configuration
   YOUTUBE_API_KEY=your_youtube_api_key_here
   YOUTUBE_CHANNEL_ID=your_youtube_channel_id_here
   
   # Email API Configuration
   RAPIDAPI_KEY=your_rapidapi_key_here
   RAPIDAPI_HOST=rapidmail.p.rapidapi.com
   
   # Email Configuration
   CONTACT_EMAIL=your_contact_email_here
   EMAIL_SENDER_NAME=Flyming Drone
   
   # Server Configuration
   PORT=3000
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Access the application**
   ```
   http://localhost:3000
   ```

### 🔑 Getting API Keys

#### YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

#### RapidAPI Key (for Email)
1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to an email service (e.g., RapidMail)
3. Copy your API key to your `.env` file

## 🐳 Docker Deployment

### Build and Run with Docker

1. **Build the Docker image**
   ```bash
   docker build -t flyming-drone-backend:latest .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 flyming-drone-backend:latest
   ```

3. **Access the application**
   ```
   http://localhost:3000
   ```

## ☸️ Kubernetes Deployment

### Prerequisites
- Docker installed and running
- Minikube installed
- kubectl configured

### Deploy to Kubernetes

1. **Start Minikube**
   ```bash
   minikube start
   ```

2. **Apply Kubernetes manifests**
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

3. **Check deployment status**
   ```bash
   kubectl get pods
   kubectl get services
   ```

4. **Access the service**
   ```bash
   minikube service flyming-drone-backend-service
   ```

### Kubernetes Resources

- **Deployment**: Manages the application pods
- **Service**: Exposes the application on port 30001
- **NodePort**: Allows external access to the application

## 📁 Project Structure

```
Flyming_Drone/
├── 📁 API/                    # API integration modules
├── 📁 k8s/                    # Kubernetes manifests
│   ├── deployment.yaml        # Kubernetes deployment
│   └── service.yaml          # Kubernetes service
├── 📁 public/                 # Static assets
│   ├── 📁 assets/            # Images and media
│   ├── 📁 js/                # Client-side JavaScript
│   └── 📁 styles/            # CSS stylesheets
├── 📁 views/                  # EJS templates
│   ├── index.ejs             # Homepage
│   ├── AboutMe.ejs           # About page
│   ├── Project.ejs           # Projects page
│   ├── Contact.ejs           # Contact page
│   └── common.ejs            # Shared components
├── 📁 data/                   # Local storage data
├── app.js                     # Main application file
├── package.json               # Dependencies and scripts
├── Dockerfile                 # Docker configuration
└── README.md                  # Project documentation
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Homepage with latest content |
| `GET` | `/aboutme` | About page |
| `GET` | `/project` | Projects showcase |
| `GET` | `/contact` | Contact form |
| `POST` | `/send-data` | Fetch YouTube playlist data |
| `POST` | `/submitted` | Handle contact form submission |
| `GET` | `*` | 404 error page |

## 🌐 Live Demo

🚀 **Live Website**: [https://flymingdrone.azurewebsites.net](https://flymingdrone.azurewebsites.net)

Experience the full Flyming Drone Photography Portfolio with:
- 📱 Responsive design across all devices
- 🎥 Live YouTube integration showing latest aerial photography
- 📧 Working contact form for inquiries
- 📊 Real-time channel statistics and popular videos

### Local Development
For local testing:
```bash
minikube service flyming-drone-backend-service
```

## 📸 Screenshots

> 📷 Screenshots will be added here showing the responsive design and key features

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 🔒 Security

### Environment Variables
This project uses environment variables to store sensitive information like API keys. **Never commit your `.env` file to version control.**

- ✅ `.env` is already in `.gitignore`
- ✅ Use `env.example` as a template
- ✅ Keep your API keys secure and private

### API Key Security
- Rotate your API keys regularly
- Use environment-specific keys (dev/staging/prod)
- Monitor API usage and set up alerts
- Never share API keys in code or documentation

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **GitHub**: [@hill0106](https://github.com/hill0106)
- **Project Link**: [https://github.com/hill0106/Flyming_Drone](https://github.com/hill0106/Flyming_Drone)

---

<div align="center">
  <p>Made with ❤️ for aerial photography enthusiasts</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
