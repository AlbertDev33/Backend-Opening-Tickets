import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const tmpFolder = path.resolve(uploadConfig.tmpFolder, file);
    const uploadsFolder = path.resolve(uploadConfig.uploadsFolder, file);

    const promisedPipeline = promisify(pipeline);

    const readStream = async () => {
      await promisedPipeline(
        fs.createReadStream(tmpFolder),
        fs.createWriteStream(uploadsFolder),
      );
      await fs.promises.unlink(tmpFolder);
    };

    readStream().catch(err => err.message);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
