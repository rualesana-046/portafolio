const VECTOR_IMAGE_PATTERN = /\.svg(?:$|[?#])/i;

export function isVectorImage(src: string): boolean {
  return VECTOR_IMAGE_PATTERN.test(src);
}
