# Deployment Guide

This guide explains how to deploy the Sr. SDET Learning Platform to various platforms and environments.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Free for Personal Projects)

Vercel offers the easiest deployment with automatic updates from Git.

#### Steps:
1. Create a free account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Click "Deploy" - Vercel will detect it's a React app and configure automatically
4. Your app will be live at `https://your-project-name.vercel.app`

**Pros**:
- Zero configuration needed
- Automatic deployments on git push
- Custom domain support
- Free tier is generous
- Built-in analytics

**Cons**:
- Need to push to GitHub first

---

### Option 2: Netlify (Free with Custom Domain)

Netlify is another excellent option with generous free tier.

#### Steps:
1. Create account at [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy

**Pros**:
- Unlimited deploys
- Free SSL certificates
- Easy environment variables
- Form handling built-in

---

### Option 3: GitHub Pages (Free)

Perfect for static hosting, requires extra build step.

#### Steps:
1. Edit `package.json`, add: `"homepage": "https://yourusername.github.io/sdet-learning-platform"`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Run: `npm run deploy`
5. Enable GitHub Pages in repository settings

**Pros**:
- Completely free
- No external services needed
- Uses GitHub infrastructure

**Cons**:
- Limited to static sites
- Slightly more setup required

---

### Option 4: Docker Container (Self-Hosted)

For hosting on your own server or cloud infrastructure.

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  sdet-platform:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    volumes:
      - ./src:/app/src
```

#### Deploy to Docker:
```bash
docker build -t sdet-platform:latest .
docker run -p 3000:3000 sdet-platform:latest
```

---

### Option 5: AWS (Scalable Production)

#### Using AWS Amplify:
1. Install Amplify CLI: `npm install -g @aws-amplify/cli`
2. Initialize: `amplify init`
3. Deploy: `amplify publish`

#### Using S3 + CloudFront:
1. Build: `npm run build`
2. Upload to S3 bucket
3. Set up CloudFront distribution
4. Configure Route 53 DNS

#### Estimated Costs:
- S3: ~$0.023 per GB
- CloudFront: ~$0.085 per GB
- Total for typical usage: $5-20/month

---

### Option 6: Heroku (Simple Deployment)

Heroku is shutting down free tier but still available:

```bash
# Install Heroku CLI
# Login: heroku login
# Create: heroku create sdet-platform
# Deploy: git push heroku main
```

---

## 📊 Deployment Comparison

| Platform | Cost | Setup Time | Auto-Deploy | Custom Domain | Analytics |
|----------|------|-----------|------------|---------------|-----------|
| Vercel | Free/$20 | 2 min | ✅ | ✅ | ✅ |
| Netlify | Free/$19+ | 2 min | ✅ | ✅ | ✅ |
| GitHub Pages | Free | 5 min | ✅ | ✅ | ❌ |
| Docker | Varies | 10 min | Manual | ✅ | ✅ |
| AWS | $5-50 | 15 min | ✅ | ✅ | ✅ |
| Heroku | $7+ | 5 min | ✅ | ✅ | ✅ |

---

## 🔐 Environment Variables

Create a `.env` file for production configuration:

```bash
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=1.0.0
REACT_APP_ANALYTICS_ID=UA-xxxxxx-x
```

Variables available in code:
```typescript
const apiUrl = process.env.REACT_APP_API_URL;
const env = process.env.REACT_APP_ENVIRONMENT;
```

---

## 🚀 Recommended Deployment Strategy

### Development → Staging → Production

```
Local Dev
    ↓
    git push origin feature-branch
    ↓
GitHub Pull Request
    ↓
Automated Tests & Preview (Vercel)
    ↓
Code Review
    ↓
Merge to Main
    ↓
Automatic Deploy to Production
```

---

## 📱 Continuous Integration / Continuous Deployment (CI/CD)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: BetaHuhn/deploy-to-vercel-action@v1
        with:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📊 Performance Optimization

### Pre-Deployment Checklist

- [ ] Run `npm run build` and verify output
- [ ] Check bundle size: `npm run build -- --stats`
- [ ] Test on multiple browsers
- [ ] Verify localStorage works
- [ ] Test responsive design on mobile
- [ ] Check console for errors
- [ ] Verify all images load
- [ ] Test all navigation links

### Build Output Size

Typical production build:
- HTML: ~50KB
- CSS: ~80KB
- JavaScript: ~200KB
- Total: ~330KB gzipped

### Optimization Tips

```bash
# Analyze bundle
npm install -D webpack-bundle-analyzer

# Check dependencies
npm audit

# Update dependencies
npm update

# Clean install
rm -rf node_modules && npm install
```

---

## 🔄 Update Deployment Process

### Releasing a New Version

1. **Update Version Number**
   ```bash
   # In src/data/curriculum.ts
   export const APP_VERSION = {
     version: '1.1.0',
     // ...
   };
   ```

2. **Update VERSION_HISTORY.md**
   - Add new version section
   - Document changes, features, bug fixes

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "chore: release v1.1.0"
   git tag -a v1.1.0 -m "Version 1.1.0"
   ```

4. **Push to Remote**
   ```bash
   git push origin main
   git push origin v1.1.0
   ```

5. **Automatic Deployment**
   - Vercel/Netlify automatically deploys
   - Tests run in CI/CD pipeline
   - New version live within minutes

---

## 🐛 Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### localhost vs Deployed Version Difference
- Check for hardcoded URLs (use environment variables)
- Verify CORS settings if using APIs
- Check browser console for errors
- Test in production build locally: `npm run build && npx serve -s build`

### Performance Issues
- Optimize images
- Code-split large modules
- Enable gzip compression
- Use CDN for static assets

---

## 📞 Monitoring & Support

### Set Up Monitoring
- Enable Vercel/Netlify analytics
- Set up error tracking (Sentry, LogRocket)
- Monitor Core Web Vitals
- Set up uptime monitoring

### Create Support Page
Document for users:
- How to clear cache
- How to export/import data
- Troubleshooting common issues
- Contact information

---

## 🎯 Sharing Your Deployment

Once deployed, share the link:

**Social Media Template:**
```
🚀 Check out my Sr. SDET Interview Preparation Platform!
📚 Complete 5-month curriculum with 300+ exercises
🎓 Learn Java, Selenium, TestNG, Cucumber, API testing & more
🏆 Track progress & prepare for top-tier tech companies

🔗 [Your Deployment URL]

#SDET #Testing #InterviewPrep #Learning
```

---

## 📚 Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [AWS Deployment](https://aws.amazon.com/getting-started/projects/deploy-react-app/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Last Updated**: October 7, 2026  
**Platform**: React 18+, Node.js 16+  
**Recommended**: Vercel or Netlify for fastest setup
