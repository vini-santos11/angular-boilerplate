import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent {
 @Input() label : string = '';
 @Input() labelPosition: 'left' | 'right' | 'top' | 'bottom' = 'top';
 @Input() disabled: boolean = false;

 value: boolean = false;

 @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

 onChange = (value: boolean) => {};
  onTouched = () => {};

  toggle() {
    if (this.disabled) return;
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }
}
