import { SanityImage } from "../models/product";
import { urlFor } from "@/sanity/lib/image";

export function buildImageUrl(img: SanityImage, w: number, h: number) {
  if ("url" in img.asset && img.asset.url) {
    return img.asset.url;
  }
  return urlFor(img).width(w).height(h).url();
}