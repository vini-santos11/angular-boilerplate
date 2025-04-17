import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() variant: 'filled' | 'outlined' | 'transparent' = 'filled';
  @Input() mode: 'icon' | 'text' | 'textAndIcon' = 'text';
  @Input() size: 'small' | 'medium' | 'large' | 'full' = 'medium';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() icon?: any;
  @Input() text?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';

  get variantClass(): string {
    switch (this.variant) {
      case 'filled':
        return this.color === 'secondary'
          ? 'bg-secondary text-white hover:bg-secondary/80'
          : 'bg-primary text-white hover:bg-primary/80';

      case 'outlined':
        return this.color === 'secondary'
          ? 'border border-secondary text-secondary hover:bg-secondary/10'
          : 'border border-primary text-primary hover:bg-primary/10';

      case 'transparent':
        return ' text-primary hover:bg-primary hover:text-white';

      default:
        return '';
    }
  }

  get styleClass(): string {
    switch (this.mode) {
      case 'icon':
       switch(this.size) {
          case 'small':
            return 'rounded-full w-9 h-9 flex items-center justify-center text-sm';
          case 'medium':
            return 'rounded-full w-12 h-12 flex items-center justify-center text-md';
          case 'large':
            return 'rounded-full w-18 h-18 flex items-center justify-center text-lg';

          default:
            return '';
        }

      case 'text':
        return 'flex items-center justify-center rounded-lg';
      case 'textAndIcon':
        return 'flex items-center justify-center rounded-md gap-2 w-full';
      default:
        return '';
    }
  }

  get sizeClass(): string {
    switch (this.size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'medium':
        return 'px-4 py-2 text-base';
      case 'large':
        return 'px-6 py-3 text-lg';
      case 'full':
        return 'w-full px-4 py-2 text-xl';
      default:
        return '';
    }
  }

  get iconSize(): number {
    switch (this.size) {
      case 'small':
        return 16;
      case 'medium':
        return 24;
      case 'large':
        return 32;
      default:
        return 20;
    }
  }

  get combinedClasses(): string {
    return `${this.variantClass} ${this.styleClass} ${this.sizeClass}`;
  }
}
