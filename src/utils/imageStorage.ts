import * as path from 'path';
import multer from 'multer';

export const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'), // Carpeta donde guardarás los archivos
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

export const upload = multer({ storage });