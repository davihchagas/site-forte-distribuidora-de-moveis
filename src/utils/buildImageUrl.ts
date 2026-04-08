import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityImage } from "@/src/models/product";

const builder = imageUrlBuilder(client);

export function buildImageUrl(
  source: SanityImage | undefined,
  width: number,
  height: number
) {
  if (!source?.asset) return "/placeholder.png";

  const asset = source.asset as any;

  // Se já veio com URL pronta
  if (asset.url) {
    return asset.url;
  }

  // Se veio como referência do Sanity
  if (asset._ref) {
    return builder.image(source).width(width).height(height).url();
  }

  return "/placeholder.png";
}