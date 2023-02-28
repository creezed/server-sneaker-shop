import { v4 as uuidv4 } from 'uuid';

export const generateFileName = (
  _req: any,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  const randomName = uuidv4();
  const fileExtName = file.originalname.match(/\.[a-z]*/);
  callback(null, `${randomName}${fileExtName}`);
};
