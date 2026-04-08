import { SanityImage } from "@/src/models/product";

export function isValidSanityImage(image: SanityImage | undefined | null): image is SanityImage {
  if (!image?.asset) return false;

  const asset = image.asset as any;

  return Boolean(asset._ref || asset.url || asset._id);
}