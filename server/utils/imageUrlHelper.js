// Function to convert relative image paths to absolute URLs
const addImageBaseUrl = (item, req) => {
  // Generate base URL from request
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  // Create a copy of the item to avoid modifying the original
  const itemWithFullUrls = { ...item.toObject ? item.toObject() : item };
  
  // Convert image path if it's a relative path
  if (itemWithFullUrls.image && !itemWithFullUrls.image.startsWith('http')) {
    itemWithFullUrls.image = baseUrl + itemWithFullUrls.image;
  }
  
  // Also convert any gallery images
  if (itemWithFullUrls.gallery && Array.isArray(itemWithFullUrls.gallery)) {
    itemWithFullUrls.gallery = itemWithFullUrls.gallery.map(galleryItem => {
      if (typeof galleryItem === 'string' && !galleryItem.startsWith('http')) {
        return baseUrl + galleryItem;
      }
      return galleryItem;
    });
  }
  
  return itemWithFullUrls;
};

module.exports = addImageBaseUrl;
