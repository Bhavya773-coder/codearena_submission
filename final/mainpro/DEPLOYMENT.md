# Deployment Guide - Vercel

## Prerequisites
- GitHub account
- Vercel account (free)
- Your project pushed to GitHub

## Step-by-Step Deployment

### 1. Prepare Your Project

1. **Create a `.env` file** in the `mainpro` directory:
   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```

2. **For production**, you'll need to update the backend URL to your deployed backend service.

### 2. Push to GitHub

1. Initialize git (if not already done):
   ```bash
   cd mainpro
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository**:
   - Select your repository from the list
   - Vercel will auto-detect it's a Vite project
4. **Configure project settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `mainpro` (if your project is in a subdirectory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add: `VITE_BACKEND_URL` = `YOUR_BACKEND_URL`
6. **Click "Deploy"**

#### Option B: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd mainpro
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set root directory to `mainpro`
   - Confirm settings

### 4. Configure Environment Variables

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings → Environment Variables**
3. **Add the following variables**:
   - `VITE_BACKEND_URL`: Your deployed backend URL
   - Example: `https://your-backend.herokuapp.com` or `https://your-backend.railway.app`

### 5. Deploy Backend (Separate Service)

Since your frontend needs a backend, deploy your Python Flask backend to a service like:

- **Railway** (recommended, free tier)
- **Render** (free tier)
- **Heroku** (paid now)
- **PythonAnywhere** (free tier)

### 6. Update Backend URL

1. **Get your backend URL** from the deployment service
2. **Update the environment variable** in Vercel:
   - Go to Project Settings → Environment Variables
   - Update `VITE_BACKEND_URL` with your backend URL
3. **Redeploy** your frontend (Vercel will auto-redeploy)

### 7. Custom Domain (Optional)

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings → Domains**
3. **Add your custom domain**
4. **Follow DNS configuration instructions**

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check if all dependencies are in `package.json`
   - Ensure `npm run build` works locally

2. **Backend Connection Issues**:
   - Verify backend URL is correct
   - Check CORS settings on backend
   - Ensure backend is accessible

3. **Environment Variables Not Working**:
   - Variables must start with `VITE_` to be accessible in frontend
   - Redeploy after adding environment variables

### Backend CORS Configuration

Make sure your Flask backend allows requests from your Vercel domain:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://your-app.vercel.app", "http://localhost:5173"])
```

## Success!

Your app should now be live at `https://your-app.vercel.app`

## Next Steps

1. **Set up automatic deployments** (already enabled by default)
2. **Configure custom domain** if needed
3. **Set up monitoring** and analytics
4. **Optimize performance** using Vercel's built-in tools 