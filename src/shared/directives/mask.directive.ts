import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[mask]'
})
export class MaskDirective {
  @Input('mask') mask: string = '';

  private regexMap: Record<string, RegExp> = {
    '0': /\d/,
    'A': /[a-zA-Z]/,
    '@': /[a-zA-Z0-9]/,
  };

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    const raw = input.value.replace(/[^a-zA-Z0-9]/g, '');

    let masked = '';
    let rawIndex = 0;

    for (let i = 0; i < this.mask.length; i++) {
      const m = this.mask[i];
      const r = raw[rawIndex];

      if (!r) break;

      const matcher = this.regexMap[m];
      if (matcher) {
        if (matcher.test(r)) {
          masked += r;
          rawIndex++;
        } else {
          rawIndex++;
          i--;
        }
      } else {
        masked += m;
      }
    }

    if (raw.length === 0) {
      input.value = '';
    } else {
      requestAnimationFrame(() => input.setRangeText(masked, 0, input.value.length, 'end'));
    }
  }
}
