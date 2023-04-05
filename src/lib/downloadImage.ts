const placeImageInsideCanvas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
) => {
  const ctx = canvas.getContext('2d');
  const { width, height } = image;
  canvas.width = width;
  canvas.height = height;
  if (ctx) {
    ctx.drawImage(image, 0, 0);
  } else {
    throw new Error('Canvas context is null');
  }
};

const downloadUsingAnchor = (href: string, filename: string) => {
  const a = document.createElement('a');
  a.download = filename;
  a.href = href;
  a.click();
  a.remove();
};

type MimeTypes =
  | 'image/png'
  | 'image/jpeg'
  | 'image/webp'
  | 'image/gif'
  | 'image/bmp';

const mimeTypeToExt: Map<MimeTypes, string> = new Map([
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
  ['image/bmp', 'bmp'],
]);

type Options = {
  /**
   * Base name of the file to be downloaded.
   * Extension will be added automatically.
   */
  basename: string;
  mimeType: MimeTypes;
};

export const downloadImage = (url: string, options?: Partial<Options>) => {
  const basename = options?.basename || 'image';
  const mimeType = mimeTypeToExt.has(options?.mimeType || 'image/jpeg')
    ? options?.mimeType || 'image/jpeg'
    : 'image/jpeg';
  const filename = `${basename}.${mimeTypeToExt.get(mimeType)}`;

  const canvas = document.createElement('canvas');
  const img = new Image();
  img.src = url;
  img.crossOrigin = 'anonymous';

  img.onload = () => {
    try {
      placeImageInsideCanvas(canvas, img);
      downloadUsingAnchor(canvas.toDataURL(mimeType), filename);
    } catch (e) {
      // Fallback to normal download if canvas is not supported
      console.warn('Unable to use canvas to download image.', e);
      downloadUsingAnchor(url, filename);
    }
  };
};
