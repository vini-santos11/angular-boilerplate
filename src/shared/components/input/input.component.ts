import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaskDirective } from '../../directives/mask.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-input',
  imports: [CommonModule, MaskDirective, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() icon?: any;
  @Input() iconPosition: 'left' | 'right' = 'left' ;

  constructor() {}

  get isIconLeft(): boolean {
    return !!this.icon && this.iconPosition === 'left';
  }

  get isIconRight(): boolean {
    return !!this.icon && this.iconPosition === 'right';
  }
}
