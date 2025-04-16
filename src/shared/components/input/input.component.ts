import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { MaskDirective } from '../../directives/mask.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-input',
  imports: [CommonModule, MaskDirective, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() icon?: any;
  @Input() disabled: boolean = false;
  @Input() iconPosition: 'left' | 'right' = 'left' ;
  public value: string = '';

  public showPassword = false;
  public initialType: string = '';

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  constructor() {}

  onChange: (_value: string) => void = () => {};
  onTouched: () => void = () => {};

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

  onMaskedInput(event: Event) {
    if(this.mask === '') return;

    const customEvent = event as CustomEvent<string>;
    this.value = customEvent.detail;
    this.onChange(this.value);
  }

  onInput(event: Event) {
    if(this.mask !== '') return;

    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
