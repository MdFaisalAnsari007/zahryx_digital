import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Load env early — ensures credentials are available at module initialization
dotenv.config();

// Local storage directory setup
const UPLOAD_DIR = path.join(__dirname, '../../public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function getCloudinaryConfig() {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  };
}

function isCloudinaryReady(): boolean {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  return !!(cloudName && apiKey && apiSecret);
}

function initCloudinary(): boolean {
  if (!isCloudinaryReady()) {
    console.warn('⚠️ Cloudinary environment keys are missing. Falling back to local storage.');
    return false;
  }
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
  console.log('☁️ Cloudinary storage is active and configured.');
  return true;
}

// Initialize once at startup
const cloudinaryActive = initCloudinary();

export class StorageService {
  /**
   * Uploads file to Cloudinary if credentials exist; otherwise falls back to local storage.
   */
  static async uploadFile(file: Express.Multer.File): Promise<string> {
    if (cloudinaryActive) {
      try {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'zahryx' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(file.buffer);
        });

        if (uploadResult && uploadResult.secure_url) {
          return uploadResult.secure_url;
        }
      } catch (error) {
        console.error('Cloudinary stream upload failed, trying local fallback:', error);
      }
    }

    // Local Storage Fallback
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    await fs.promises.writeFile(filePath, file.buffer);

    const serverUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    return `${serverUrl}/uploads/${uniqueName}`;
  }

  /**
   * Deletes a file either from Cloudinary or local storage.
   */
  static async deleteFile(fileUrl: string): Promise<void> {
    if (!fileUrl) return;

    if (cloudinaryActive && fileUrl.includes('cloudinary.com')) {
      try {
        // Extract public ID from Cloudinary URL
        // e.g. https://res.cloudinary.com/cloud/image/upload/v12345/zahryx/file.png -> zahryx/file
        const match = fileUrl.match(/\/image\/upload\/(?:v\d+\/)?([^.]+)/);
        if (match && match[1]) {
          const publicId = match[1];
          await cloudinary.uploader.destroy(publicId);
          console.log(`Deleted image from Cloudinary: ${publicId}`);
        }
        return;
      } catch (error) {
        console.error('Failed to delete file from Cloudinary:', error);
      }
    }

    // Local Storage Fallback
    try {
      const parts = fileUrl.split('/uploads/');
      if (parts.length > 1) {
        const filename = parts[1];
        const filePath = path.join(UPLOAD_DIR, filename);
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      }
    } catch (error) {
      console.error('Failed to delete local file:', error);
    }
  }
}
