# CORS Fix Deployment Instructions

## Summary of Changes Made

### 1. Backend Changes (server/server.js)
- Enhanced CORS configuration with dynamic origin checking
- Added comprehensive allowed headers
- Added manual CORS middleware as backup
- Added logging for debugging CORS issues
- Added preflight OPTIONS handling

### 2. Frontend Changes
- Created new axios configuration (client/src/config/axios.js)
- Updated Login component to use new axios instance
- Updated AuthContext to use new axios instance
- Updated contact API to use new axios instance

### 3. Server Configuration (server/vercel.json)
- Simplified configuration for better compatibility

## How to Deploy

### For Backend (Server):
1. Push your changes to your git repository
2. Your Vercel backend should auto-deploy
3. Monitor the logs in Vercel dashboard for CORS-related messages

### For Frontend (Client):
1. Test locally first: `npm run dev`
2. Build: `npm run build`
3. Deploy to Vercel

## Testing CORS

After deployment, test these endpoints:
1. `https://portfoliobackend-chi.vercel.app/api/test-cors` - Should return CORS test response
2. Try login from your frontend

## If CORS Still Doesn't Work

### Additional Steps:
1. Check Vercel function logs for your backend
2. Verify your frontend domain matches exactly: `https://portfoliofrontend-six.vercel.app`
3. Test with curl:
   ```bash
   curl -H "Origin: https://portfoliofrontend-six.vercel.app" \
        -H "Content-Type: application/json" \
        -X OPTIONS \
        https://portfoliobackend-chi.vercel.app/api/auth/login
   ```

### Alternative Domain Check:
If your frontend URL is different, update the allowed origins in server.js:
- Line 29: Add your actual frontend URL
- Line 58: Add your actual frontend URL

## Environment Variables
Make sure these are set in Vercel:
- `MONGO_URI`
- `JWT_SECRET`
- `NODE_ENV=production`
