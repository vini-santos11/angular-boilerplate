import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Tooltip {
  message: string;
  variant: 'dark' | 'light' | 'primary';
  target: DOMRect;
}

@Injectable({ providedIn: 'root' })
export class TooltipService {
  private tooltipSubject = new BehaviorSubject<Tooltip | null>(null);
  tooltip$ = this.tooltipSubject.asObservable();

  showTooltip(
    elementRef: ElementRef | HTMLElement,
    message: string,
    variant: 'dark' | 'light' | 'primary' = 'dark'
  ) {
    const rect =
      elementRef instanceof ElementRef
        ? elementRef.nativeElement.getBoundingClientRect()
        : elementRef.getBoundingClientRect();

    const tooltip: Tooltip = { message, variant, target: rect };
    this.tooltipSubject.next(tooltip);
  }

  hideTooltip() {
    this.tooltipSubject.next(null);
  }
}
