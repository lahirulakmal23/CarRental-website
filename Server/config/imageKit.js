import ImageKit from "imagekit";

const imagekit = new ImageKit({
  imagekitId: process.env.IMAGEKIT_PUBLIC_KEY,
  apiSecret: process.env.IMAGEKIT_PRIVATE_KEY,
  apiKey: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;