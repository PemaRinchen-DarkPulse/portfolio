// Simple in-memory cache middleware for frequently accessed data
class SimpleCache {
  constructor() {
    this.cache = new Map();
    this.TTL = 5 * 60 * 1000; // 5 minutes TTL
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // Check if cache is expired
    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  // Clean expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, cached] of this.cache.entries()) {
      if (now - cached.timestamp > this.TTL) {
        this.cache.delete(key);
      }
    }
  }
}

// Create a singleton cache instance
const cache = new SimpleCache();

// Clean up expired entries every 5 minutes
setInterval(() => {
  cache.cleanup();
}, 5 * 60 * 1000);

// Cache middleware generator
const cacheMiddleware = (keyGenerator, ttlMs = 5 * 60 * 1000) => {
  return (req, res, next) => {
    // Generate cache key
    const cacheKey = typeof keyGenerator === 'function' ? keyGenerator(req) : keyGenerator;
    
    // Check cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return res.json(cachedData);
    }

    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data) {
      // Cache the response data
      cache.set(cacheKey, data);
      console.log(`Cached response for key: ${cacheKey}`);
      
      // Call original json method
      return originalJson.call(this, data);
    };

    next();
  };
};

// Helper to invalidate cache by pattern
const invalidateCache = (pattern) => {
  if (typeof pattern === 'string') {
    cache.delete(pattern);
  } else if (pattern instanceof RegExp) {
    for (const key of cache.cache.keys()) {
      if (pattern.test(key)) {
        cache.delete(key);
      }
    }
  }
};

module.exports = {
  cache,
  cacheMiddleware,
  invalidateCache
};
