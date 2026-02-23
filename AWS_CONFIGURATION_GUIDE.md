# AWS Configuration Guide for S3 Images and Video Streaming

This guide will help you configure your AWS S3 bucket and CloudFront distribution to fix image loading and video streaming issues.

## Prerequisites

- Access to AWS Console
- S3 bucket: `fulkrums-data`
- CloudFront distribution for your bucket
- Admin permissions to modify S3 and CloudFront settings

---

## Step 1: Configure S3 Bucket CORS Policy

CORS (Cross-Origin Resource Sharing) configuration is required to allow your Next.js application to load images and videos from S3/CloudFront.

### Instructions:

1. **Navigate to S3 Console:**
   - Go to [AWS S3 Console](https://s3.console.aws.amazon.com/)
   - Find and click on your bucket: `fulkrums-data`

2. **Access CORS Configuration:**
   - Click on the **Permissions** tab
   - Scroll down to **Cross-origin resource sharing (CORS)**
   - Click **Edit**

3. **Add CORS Configuration:**

   Replace or add the following JSON configuration:

   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": [
         "ETag",
         "Content-Length",
         "Content-Type",
         "Accept-Ranges",
         "Content-Range"
       ],
       "MaxAgeSeconds": 3600
     }
   ]
   ```

4. **Save Changes:**
   - Click **Save changes**

### Why These Headers?

- **Accept-Ranges & Content-Range**: Enable video seeking and partial content requests (HTTP 206 responses)
- **ETag**: Browser caching validation for better performance
- **Content-Length**: Required for video player buffering calculations
- **MaxAgeSeconds**: Cache CORS preflight requests for 1 hour

---

## Step 2: Configure CloudFront Response Headers Policy

CloudFront needs to pass CORS headers to the browser when serving your media files.

### Option A: Use SimpleCORS Managed Policy (Recommended)

1. **Navigate to CloudFront Console:**
   - Go to [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/)
   - Click on your distribution ID

2. **Edit Behavior:**
   - Click on the **Behaviors** tab
   - Select the **Default (*)** behavior
   - Click **Edit**

3. **Add Response Headers Policy:**
   - Scroll to **Response headers policy**
   - Select **SimpleCORS** from the dropdown
   - Scroll down and click **Save changes**

### Option B: Create Custom Response Headers Policy

If you need more control, create a custom policy:

1. **Create New Policy:**
   - In CloudFront console, go to **Policies** → **Response headers**
   - Click **Create policy**

2. **Configure Policy:**
   - **Name**: `CustomCORSMediaPolicy`
   - **CORS Configuration:**
     - Access-Control-Allow-Origin: `*`
     - Access-Control-Allow-Methods: `GET, HEAD, OPTIONS`
     - Access-Control-Allow-Headers: `*`
     - Access-Control-Expose-Headers: `Content-Length, Accept-Ranges, Content-Range, ETag`
     - Access-Control-Max-Age: `3600`
   - Click **Create**

3. **Attach to Behavior:**
   - Go back to your distribution → Behaviors
   - Edit the Default behavior
   - Select your custom policy
   - Save changes

---

## Step 3: Configure CloudFront Cache Behavior for Videos

Optimize video streaming with proper cache settings and range request support.

### Create Video-Specific Behavior:

1. **Navigate to Behaviors:**
   - In your CloudFront distribution
   - Click on the **Behaviors** tab
   - Click **Create behavior**

2. **Configure Behavior:**

   **Path Pattern:**
   ```
   *.mp4
   ```
   Or for portfolio-specific videos:
   ```
   Portfolio/*.mp4
   ```

   **Viewer Protocol Policy:**
   - Select: **HTTPS Only**

   **Allowed HTTP Methods:**
   - Select: **GET, HEAD, OPTIONS**

   **Cache Policy:**
   - Select: **CachingOptimized** (managed policy)
   - Or create a custom cache policy with these settings:
     - Minimum TTL: `0`
     - Maximum TTL: `31536000` (1 year)
     - Default TTL: `86400` (1 day)

   **Response Headers Policy:**
   - Select: **SimpleCORS** (or your custom policy)

   **Origin Request Policy:**
   - Select: **CORS-S3Origin** (or AllViewer)

3. **Save Behavior:**
   - Click **Create behavior**

### Important Video Settings:

✅ **Range Requests**: Automatically supported by CloudFront when cache behavior allows GET/HEAD methods
✅ **Compression**: CloudFront automatically compresses text-based content
✅ **HTTPS**: Required for modern browser video features

---

## Step 4: Deploy Changes and Invalidate Cache

After making configuration changes, you need to invalidate the CloudFront cache to ensure new settings take effect.

### Create Cache Invalidation:

1. **Navigate to Invalidations:**
   - In your CloudFront distribution
   - Click on the **Invalidations** tab
   - Click **Create invalidation**

2. **Specify Paths:**
   ```
   /*
   ```
   This invalidates all cached content. For specific paths:
   ```
   /Portfolio/*
   /Pr. Rezultati/*
   /homepage/*
   ```

3. **Create Invalidation:**
   - Click **Create invalidation**
   - Wait 5-15 minutes for completion

### Alternative: Wait for TTL Expiry

If you don't want to invalidate immediately, cached responses will naturally expire based on your TTL settings (default 24 hours).

---

## Step 5: Verify Configuration

Test that everything is working correctly.

### Test Image Loading:

1. **Open Browser DevTools:**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac)
   - Go to **Network** tab

2. **Navigate to Portfolio Page:**
   - Visit: `http://localhost:3000/portfolio`
   - Watch the Network tab

3. **Check for:**
   - ✅ Images loading from CloudFront (status 200)
   - ✅ No CORS errors in Console
   - ✅ Response headers include `access-control-allow-origin: *`
   - ✅ Next.js generates WebP/AVIF formats

### Test Video Playback:

1. **Open a Portfolio Detail Page:**
   - Click on any portfolio item
   - Watch videos in the TikTok-style slider

2. **Check for:**
   - ✅ Videos play without stuttering
   - ✅ Seeking works smoothly (drag progress bar)
   - ✅ Network tab shows `206 Partial Content` responses
   - ✅ Response headers include `accept-ranges: bytes`
   - ✅ Mute/unmute toggle works

### Check Response Headers:

In the Network tab, click on any media file and check the **Headers** section:

**Expected Headers:**
```
access-control-allow-origin: *
access-control-expose-headers: Content-Length, Accept-Ranges, Content-Range, ETag
accept-ranges: bytes
content-type: image/jpeg (or video/mp4)
content-length: [file size]
```

---

## Troubleshooting

### Images Still Not Loading?

1. **Check CloudFront URL:**
   - Verify `NEXT_PUBLIC_CLOUDFRONT_URL` in `.env.local` is correct
   - Example: `https://d1hqd8vqu5a5q0.cloudfront.net`
   - No trailing slash!

2. **Check S3 Bucket Policy:**
   - Ensure CloudFront has access via Origin Access Identity (OAI)
   - Or make bucket publicly readable (less secure)

3. **Check Next.js Config:**
   - Verify `next.config.mjs` has CloudFront domain in `remotePatterns`
   - Example: `hostname: '*.cloudfront.net'`

4. **Clear Browser Cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### Videos Still Stuttering?

1. **Check Cache Behavior:**
   - Ensure video cache behavior is created with correct path pattern
   - Verify SimpleCORS policy is attached

2. **Check File Sizes:**
   - Very large video files (>100MB) may need compression
   - Consider using AWS MediaConvert for HLS adaptive streaming

3. **Test Network Speed:**
   - Open DevTools → Network tab → Throttling
   - Test on "Fast 3G" to simulate mobile network
   - Videos should still play smoothly with some buffering

4. **Check CloudFront Distribution Status:**
   - Must be **Deployed** (not "In Progress")
   - Wait for deployment to complete after changes

### CORS Errors in Console?

**Error Message:**
```
Access to fetch at 'https://xxx.cloudfront.net/Portfolio/xxx.jpg' from origin
'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**
1. Double-check S3 CORS configuration is saved correctly
2. Ensure CloudFront response headers policy is attached
3. Create cache invalidation to clear old responses
4. Check that AllowedOrigins includes `*` or your specific domain

---

## Security Considerations

### Production Recommendations:

1. **Restrict CORS Origins:**
   - Replace `"AllowedOrigins": ["*"]` with your actual domains:
     ```json
     "AllowedOrigins": [
       "https://yourdomain.com",
       "https://www.yourdomain.com"
     ]
     ```

2. **Use Origin Access Identity (OAI):**
   - Keep S3 bucket private
   - Allow CloudFront access via OAI
   - Prevents direct S3 URL access

3. **Enable CloudFront Signed URLs:**
   - For premium content protection
   - Requires custom Lambda@Edge function

4. **Set Proper Cache Headers:**
   - Use long TTLs for immutable content
   - Use shorter TTLs for frequently updated content

---

## Optional: HLS Adaptive Streaming (Future Enhancement)

For professional-grade video streaming with automatic quality adjustment:

### Setup AWS MediaConvert:

1. **Create MediaConvert Job Template:**
   - Input: MP4 videos from S3
   - Output: HLS playlist (.m3u8) + segments (.ts)
   - Multiple bitrates: 1080p, 720p, 480p, 360p

2. **Update S3 Structure:**
   ```
   Portfolio/
   ├── ProjectName/
   │   ├── video.mp4 (original)
   │   └── hls/
   │       ├── playlist.m3u8
   │       ├── 1080p.m3u8
   │       ├── 720p.m3u8
   │       └── segments/
   ```

3. **Update media-sync.ts:**
   - Prefer `.m3u8` URLs over `.mp4`
   - ReactPlayer will automatically use HLS

4. **Benefits:**
   - Automatic quality switching based on network speed
   - Better buffering on poor connections
   - Lower bandwidth usage
   - Professional streaming experience

---

## Summary

After completing this configuration:

✅ **Images** will load correctly from CloudFront with Next.js optimization
✅ **Videos** will stream smoothly with range request support
✅ **No CORS errors** in browser console
✅ **Better performance** with CDN caching
✅ **Mobile-friendly** with automatic format optimization

## Need Help?

If you encounter issues not covered in this guide:

1. Check [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
2. Check [AWS S3 CORS Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)
3. Review CloudWatch logs for CloudFront errors
4. Test with AWS CLI to verify bucket access

---

**Last Updated:** 2026-02-14
