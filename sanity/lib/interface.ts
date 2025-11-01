export interface simpleProductCard {
  name: string;
  price: number;
  currentSlug: string;
  category: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    }
  }
}