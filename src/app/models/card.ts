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
  image_url_cropped?: string;
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

// El precio general se toma de TCGplayer o de una impresión con precio positivo.
export function cardPrice(card: Card): number | null {
  const vendor = Number(card.card_prices?.[0]?.tcgplayer_price);
  if (Number.isFinite(vendor) && vendor > 0) return vendor;

  const printings = (card.card_sets ?? [])
    .map(set => Number(set.set_price))
    .filter(price => Number.isFinite(price) && price > 0);
  return printings.length ? Math.min(...printings) : null;
}

export function cardPriceText(card: Card): string {
  const price = cardPrice(card);
  return price === null ? 'Sin precio publicado' : `$${price.toFixed(2)} USD`;
}

export function printingPriceText(rawPrice: string | undefined): string {
  const price = Number(rawPrice);
  if (Number.isFinite(price) && price > 0) return `$${price.toFixed(2)} USD`;
  // El cero de la API no indica que una carta pueda comprarse gratis.
  return rawPrice === '0' || rawPrice === '0.00'
    ? 'Sin precio publicado (API: 0)'
    : 'Sin precio publicado';
}
