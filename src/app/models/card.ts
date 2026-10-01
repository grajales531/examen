// Los campos opcionales no aparecen en todas las cartas, por ejemplo nivel en magia.
export interface CardSet {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_price: string;
}
export interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}
export interface CardPrice {
  tcgplayer_price?: string;
}
export interface Card {
  id: number;
  name: string;
  type: string;
  desc: string;
  attribute?: string;
  level?: number;
  atk?: number;
  def?: number;
  archetype?: string;
  card_images: CardImage[];
  card_sets?: CardSet[];
  card_prices?: CardPrice[];
}
export interface CardResponse { data: Card[]; }
export type ViewState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

// Es una referencia general; el precio exacto de cada impresión está en card_sets.
export function cardPriceText(card: Card): string {
  const vendor = Number(card.card_prices?.[0]?.tcgplayer_price);
  if (Number.isFinite(vendor) && vendor > 0) return `$${vendor.toFixed(2)} USD`;

  const printings = (card.card_sets ?? [])
    .map(set => Number(set.set_price))
    .filter(price => Number.isFinite(price) && price > 0);
  return printings.length ? `$${Math.min(...printings).toFixed(2)} USD` : 'No disponible';
}
