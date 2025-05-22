import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { X } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() message = '';
  @Input() variant: 'success' | 'danger' | 'info' | 'warning' = 'info';
  @Input() class = '';
  @Input() exiting = false;
  @Output() closed = new EventEmitter<void>();

  readonly X = X;

  get variantClasses() {
    switch (this.variant) {
      case 'success':
        return 'bg-green-500/90 text-white';
      case 'danger':
        return 'bg-red-500/90 text-white';
      case 'info':
        return 'bg-blue-500/90 text-white';
      case 'warning':
        return 'bg-yellow-400 text-black';
      default:
        return 'bg-gray-800 text-white';
    }
  }

  onClose() {
    this.closed.emit();
  }
}
