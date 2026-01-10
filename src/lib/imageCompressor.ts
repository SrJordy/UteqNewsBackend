import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

interface CompressionOptions {
    quality?: number;  // 1-100, default 80
    maxWidth?: number; // Max width in pixels, default 1920
    maxHeight?: number; // Max height in pixels
}

/**
 * Comprime una imagen usando Sharp
 * @param inputBuffer - Buffer de la imagen original
 * @param outputPath - Ruta donde guardar la imagen comprimida
 * @param options - Opciones de compresión
 * @returns Path relativo del archivo guardado
 */
export async function compressImage(
    inputBuffer: Buffer,
    outputPath: string,
    options: CompressionOptions = {}
): Promise<void> {
    const { quality = 80, maxWidth = 1920, maxHeight } = options;

    const ext = path.extname(outputPath).toLowerCase();

    let sharpInstance = sharp(inputBuffer);

    // Redimensionar si es necesario
    const metadata = await sharpInstance.metadata();
    if (metadata.width && metadata.width > maxWidth) {
        sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true
        });
    }

    // Comprimir según el formato
    if (ext === '.jpg' || ext === '.jpeg') {
        await sharpInstance
            .jpeg({ quality, mozjpeg: true })
            .toFile(outputPath);
    } else if (ext === '.png') {
        await sharpInstance
            .png({ quality, compressionLevel: 9 })
            .toFile(outputPath);
    } else if (ext === '.webp') {
        await sharpInstance
            .webp({ quality })
            .toFile(outputPath);
    } else {
        // Formato no soportado, guardar sin comprimir
        await sharpInstance.toFile(outputPath);
    }
}

/**
 * Comprime una imagen y la guarda con extensión .webp para mejor compresión
 */
export async function compressToWebp(
    inputBuffer: Buffer,
    outputPath: string,
    quality: number = 80
): Promise<string> {
    // Cambiar extensión a .webp
    const webpPath = outputPath.replace(/\.[^.]+$/, '.webp');

    await sharp(inputBuffer)
        .resize(1920, undefined, {
            fit: 'inside',
            withoutEnlargement: true
        })
        .webp({ quality })
        .toFile(webpPath);

    return webpPath;
}

/**
 * Obtiene información de la imagen
 */
export async function getImageInfo(buffer: Buffer) {
    const metadata = await sharp(buffer).metadata();
    return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: buffer.length
    };
}
