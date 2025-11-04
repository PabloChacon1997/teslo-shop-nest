import { Request } from 'express';

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function,
) => {
  // console.log({ file });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  if (!file) return callback(new Error('File is empty'), false);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const fileExtension = file.mimetype.split('/')[1];
  const validExtensios = ['jpg', 'jpeg', 'png', 'gif'];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (validExtensios.includes(fileExtension)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return callback(null, true);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  callback(null, false);
};
