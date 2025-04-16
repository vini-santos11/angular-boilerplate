import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaskDirective } from '../../directives/mask.directive';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule, MaskDirective, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() mask: string = '';

  constructor() {}
}
