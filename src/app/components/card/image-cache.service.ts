import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageCacheService {
  private readonly cacheName = 'yugioh-card-images-v1';
  private readonly pendingImages = new Map<string, Promise<string>>();

  getImageUrl(remoteUrl: string): Promise<string> {
    const pending = this.pendingImages.get(remoteUrl);
    if (pending) return pending;

    // Si el navegador no ofrece Cache Storage o bloquea CORS, la imagen sigue visible.
    const request = this.loadImage(remoteUrl).catch(() => remoteUrl);
    this.pendingImages.set(remoteUrl, request);
    return request;
  }

  private async loadImage(remoteUrl: string): Promise<string> {
    if (!('caches' in globalThis)) {
      throw new Error('Cache Storage no disponible');
    }

    const cache = await caches.open(this.cacheName);
    let response = await cache.match(remoteUrl);

    if (!response) {
      response = await fetch(remoteUrl, { mode: 'cors' });
      if (!response.ok) throw new Error(`No fue posible descargar la imagen: ${response.status}`);
      await cache.put(remoteUrl, response.clone());
    }

    return URL.createObjectURL(await response.blob());
  }
}
