import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaskDirective } from '../../directives/mask.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-input',
  imports: [CommonModule, MaskDirective, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() icon?: any;
  @Input() disabled: boolean = false;
  @Input() iconPosition: 'left' | 'right' = 'left' ;

  public showPassword = false;
  public initialType: string = '';

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  constructor() {}

  protected ngOnInit(): void {
    this.initialType = this.type;
  }

  get isIconLeft(): boolean {
    return !!this.icon && this.iconPosition === 'left';
  }

  get isIconRight(): boolean {
    return !!this.icon && this.iconPosition === 'right';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }
}
