import { Directive, ElementRef, inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { ImageCacheService } from './image-cache.service';

@Directive({ selector: 'img[appCachedImage]', standalone: true })
export class CachedImageDirective implements OnDestroy {
  private readonly element = inject(ElementRef<HTMLImageElement>);
  private readonly renderer = inject(Renderer2);
  private readonly imageCache = inject(ImageCacheService);
  private requestNumber = 0;

  @Input()
  set appCachedImage(remoteUrl: string | undefined) {
    const currentRequest = ++this.requestNumber;
    this.renderer.removeAttribute(this.element.nativeElement, 'src');
    if (!remoteUrl) return;

    void this.imageCache.getImageUrl(remoteUrl).then(imageUrl => {
      // Evita aplicar una respuesta antigua cuando cambia la carta.
      if (currentRequest === this.requestNumber) {
        this.renderer.setAttribute(this.element.nativeElement, 'src', imageUrl);
      }
    });
  }

  ngOnDestroy(): void {
    this.requestNumber++;
  }
}
