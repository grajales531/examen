import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timeout } from 'rxjs';
import { Card, ViewState, cardPrice } from '../../models/card';
import { YugiohService } from '../../services/yugioh.service';
import { CardComponent } from '../card/card.component';
import { CardDetailComponent } from '../card-detail/card-detail.component';

@Component({
  selector: 'app-blue-eyes',
  standalone: true,
  imports: [CardComponent, CardDetailComponent],
  templateUrl: './blue-eyes.component.html',
  styleUrl: './blue-eyes.component.css'
})
export class BlueEyesComponent {
  private readonly yugiohService = inject(YugiohService);
  private readonly destroyRef = inject(DestroyRef);

  state: ViewState = 'loading';
  cards: Card[] = [];
  filteredCards: Card[] = [];
  expansions: string[] = [];
  expansionQuery = '';
  selectedExpansion = '';
  selectedCard?: Card;

  get visibleExpansions(): string[] {
    const query = this.expansionQuery.trim().toLowerCase();
    return query ? this.expansions.filter(name => name.toLowerCase().includes(query)) : this.expansions;
  }

  get unpricedCount(): number {
    return this.cards.filter(card => cardPrice(card) === null).length;
  }

  constructor() {
    this.yugiohService.getBlueEyes()
      // Evita dejar la interfaz cargando indefinidamente si la API no responde.
      .pipe(timeout(15000), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: cards => {
          this.cards = cards;
          this.filteredCards = cards;
          this.expansions = this.getExpansions(cards);
          this.state = cards.length === 0 ? 'empty' : 'success';
        },
        error: () => {
          this.state = 'error';
          this.cards = [];
          this.filteredCards = [];
          this.selectedCard = undefined;
        }
      });
  }

  onExpansionChange(event: Event): void {
    this.chooseExpansion((event.target as HTMLSelectElement).value);
  }

  onExpansionQuery(event: Event): void {
    this.expansionQuery = (event.target as HTMLInputElement).value;
  }

  chooseExpansion(expansion: string): void {
    this.selectedExpansion = expansion;
    this.filteredCards = this.selectedExpansion
      ? this.cards.filter(card => card.card_sets?.some(
          printing => printing.set_name === this.selectedExpansion
        ))
      : this.cards;

    // No conserva un detalle que dejó de pertenecer al resultado visible.
    if (this.selectedCard && !this.filteredCards.some(card => card.id === this.selectedCard?.id)) {
      this.selectedCard = undefined;
    }
  }

  selectCard(card: Card): void {
    this.selectedCard = card;
  }

  private getExpansions(cards: Card[]): string[] {
    const names = cards.flatMap(card => card.card_sets?.map(printing => printing.set_name) ?? []);
    return [...new Set(names)].sort((first, second) => first.localeCompare(second));
  }
}
