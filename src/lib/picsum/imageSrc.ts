type ImageOptions = {
  width: number;
  height: number;
  blur?: number;
  grayscale?: boolean;
  extension?: 'jpg' | 'webp';
};

export const imageSrc = (id: string, options: ImageOptions): string => {
  const { width, height, blur, grayscale, extension } = options;

  const extensionString = extension ? `.${extension}` : '';
  const baseUrl = `https://picsum.photos/id/${id}/${width}/${height}${extensionString}`;

  const url = new URL(baseUrl);
  if (blur) {
    url.searchParams.append('blur', String(blur));
  }

  if (grayscale) {
    url.searchParams.append('grayscale', '');
  }

  return url.toString();
};
