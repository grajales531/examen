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
}
export interface CardResponse { data: Card[]; }
export type ViewState = 'idle' | 'loading' | 'success' | 'empty' | 'error';
