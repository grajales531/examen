import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { Card, CardResponse } from '../models/card';

@Injectable({ providedIn: 'root' })
export class YugiohService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  // Adrián usará este método; la respuesta se comparte para no repetir la consulta.
  private readonly blueEyes$ = this.http.get<CardResponse>(this.url, {
    params: { archetype: 'Blue-Eyes' }
  }).pipe(map(response => response.data), shareReplay({ bufferSize: 1, refCount: false }));

  searchCards(name: string): Observable<Card[]> {
    // fname permite buscar una parte del nombre, a diferencia de name.
    return this.http.get<CardResponse>(this.url, { params: { fname: name.trim() } })
      .pipe(map(response => response.data));
  }

  getBlueEyes(): Observable<Card[]> { return this.blueEyes$; }
}
