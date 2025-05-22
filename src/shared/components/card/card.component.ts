import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Input() variant: 'default' | 'outline' | 'flat' | 'ghost' | 'soft' = 'default';
  @Input() class?: string;

  get variantClasses() {
    switch (this.variant) {
      case 'outline':
        return 'border border-gray-200 bg-white';
      case 'flat':
        return 'bg-white';
      case 'ghost':
        return 'bg-transparent';
      case 'soft':
        return 'bg-primary-50';
      default:
        return 'border border-gray-200 bg-white shadow-sm hover:shadow-md transition';
    }
  }
}
