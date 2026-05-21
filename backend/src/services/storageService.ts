import fs from 'fs';
import path from 'path';

// Local storage directory setup
const UPLOAD_DIR = path.join(__dirname, '../../public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export class StorageService {
  /**
   * Uploads file either to Cloudinary (if configured) or locally.
   * Since this is designed to be immediately functional, it writes locally
   * and returns the static asset url relative to the backend server.
   */
  static async uploadFile(file: Express.Multer.File): Promise<string> {
    // If Cloudinary keys are set in environmental variables, we can process here.
    // However, to keep it extremely stable, out-of-the-box local storage is perfect.
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);
    
    await fs.promises.writeFile(filePath, file.buffer);
    
    const serverUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    return `${serverUrl}/uploads/${uniqueName}`;
  }

  static async deleteFile(fileUrl: string): Promise<void> {
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
      console.error('Failed to delete file:', error);
    }
  }
}
