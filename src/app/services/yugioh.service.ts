import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, shareReplay, throwError } from 'rxjs';
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
    if (!name.trim()) return of([]);
    // fname permite buscar una parte del nombre, a diferencia de name.
    return this.http.get<CardResponse>(this.url, { params: { fname: name.trim() } })
      .pipe(
        map(response => response.data),
        catchError((error: unknown) => {
          // La API devuelve 400 cuando no hay coincidencias; otros errores se conservan.
          if (error instanceof HttpErrorResponse && error.status === 400) {
            const body: unknown = error.error;
            if (typeof body === 'object' && body !== null && 'error' in body &&
                typeof body.error === 'string' && body.error.startsWith('No card matching')) {
              return of([]);
            }
          }
          return throwError(() => error);
        })
      );
  }

  getBlueEyes(): Observable<Card[]> { return this.blueEyes$; }
}
