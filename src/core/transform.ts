export const resizeSvg = (svg: string, size: number): string => {
  return svg
    .replace(/width="[^"]*"/, `width="${size}"`)
    .replace(/height="[^"]*"/, `height="${size}"`);
};
