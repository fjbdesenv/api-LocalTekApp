import { parse } from 'path';
import { MulterError, diskStorage, FileFilterCallback } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const uploadPath = './files/uploads' || process.env.UPLOADS_PATH;

const dynamicPath = (codigoAtendimento) => `${uploadPath}/${codigoAtendimento}`;

const multerConfig = {
  fileFilter: (req, file, cb) => {

    /* Validação de tipo */
    if (file.originalname.match(/^.*\.(jpg|png|jpeg|cds|pdf|odt|doc|docx|txt)$/))
      cb(null, true);
    else {
      cb(new MulterError("LIMIT_UNEXPECTED_FILE", 'arquivo'), false);
    }
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      const { codigoAtendimento } = req.params;
      const pathAux = dynamicPath(codigoAtendimento);

      /* Se não existir cria a pasta do atendimento */
      if (!existsSync(pathAux)) mkdirSync(pathAux, { recursive: true });

      cb(null, pathAux);
    },
    filename: (req, file, cb) => {
      const fileName = uuidv4();
      const extension = parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export { uploadPath, dynamicPath, multerConfig };