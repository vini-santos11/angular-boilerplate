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
        return 'border border-[var(--border)] dark:border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]';
      case 'flat':
        return 'bg-[var(--surface)] dark:bg-[var(--surface)]';
      case 'ghost':
        return 'bg-transparent';
      case 'soft':
        return 'bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-700)]';
      default:
        return 'border border-[var(--border)] dark:border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)] shadow-sm hover:shadow-md transition';
    }
  }
}
