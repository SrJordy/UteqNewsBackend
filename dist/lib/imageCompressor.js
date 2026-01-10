"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressImage = compressImage;
exports.compressToWebp = compressToWebp;
exports.getImageInfo = getImageInfo;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
/**
 * Comprime una imagen usando Sharp
 * @param inputBuffer - Buffer de la imagen original
 * @param outputPath - Ruta donde guardar la imagen comprimida
 * @param options - Opciones de compresión
 * @returns Path relativo del archivo guardado
 */
function compressImage(inputBuffer_1, outputPath_1) {
    return __awaiter(this, arguments, void 0, function* (inputBuffer, outputPath, options = {}) {
        const { quality = 80, maxWidth = 1920, maxHeight } = options;
        const ext = path_1.default.extname(outputPath).toLowerCase();
        let sharpInstance = (0, sharp_1.default)(inputBuffer);
        // Redimensionar si es necesario
        const metadata = yield sharpInstance.metadata();
        if (metadata.width && metadata.width > maxWidth) {
            sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }
        // Comprimir según el formato
        if (ext === '.jpg' || ext === '.jpeg') {
            yield sharpInstance
                .jpeg({ quality, mozjpeg: true })
                .toFile(outputPath);
        }
        else if (ext === '.png') {
            yield sharpInstance
                .png({ quality, compressionLevel: 9 })
                .toFile(outputPath);
        }
        else if (ext === '.webp') {
            yield sharpInstance
                .webp({ quality })
                .toFile(outputPath);
        }
        else {
            // Formato no soportado, guardar sin comprimir
            yield sharpInstance.toFile(outputPath);
        }
    });
}
/**
 * Comprime una imagen y la guarda con extensión .webp para mejor compresión
 */
function compressToWebp(inputBuffer_1, outputPath_1) {
    return __awaiter(this, arguments, void 0, function* (inputBuffer, outputPath, quality = 80) {
        // Cambiar extensión a .webp
        const webpPath = outputPath.replace(/\.[^.]+$/, '.webp');
        yield (0, sharp_1.default)(inputBuffer)
            .resize(1920, undefined, {
            fit: 'inside',
            withoutEnlargement: true
        })
            .webp({ quality })
            .toFile(webpPath);
        return webpPath;
    });
}
/**
 * Obtiene información de la imagen
 */
function getImageInfo(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const metadata = yield (0, sharp_1.default)(buffer).metadata();
        return {
            width: metadata.width,
            height: metadata.height,
            format: metadata.format,
            size: buffer.length
        };
    });
}
