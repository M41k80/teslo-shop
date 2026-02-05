

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

  if (!validExtensions.includes(fileExtension)) {
    return callback(
      new Error('Invalid file type'),
      false,
    );
  }

  callback(null, true);
};
