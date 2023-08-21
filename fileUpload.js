const multer = require('multer');

const createUploadMiddleware = (fieldName) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/' + fieldName + '/');
      },
      filename: function (req, file, cb) {
        const originalName = file.originalname;
        const extension = originalName.split('.').pop();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, fieldName + '-' + uniqueSuffix + '.' + extension);
      },
    });
  
    return multer({ storage: storage });
  };

  module.exports = createUploadMiddleware;
