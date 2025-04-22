import { ChevronUp, ChevronDown, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-date-picker',
  imports: [CommonModule, LucideAngularModule, TranslateModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
})

export class DatePickerComponent implements ControlValueAccessor {
  @Input() mode: 'single' | 'multiple' | 'range' = 'single';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() maxSelections: number = 2;
  @Input() disabled: boolean = false;
  @Input() control!: AbstractControl | FormControl | null;
  @Output() dateChange = new EventEmitter<Date | Date[] | { start: Date | null; end: Date | null; range?: Date[] }>();
  @ViewChild('containerRef') containerRef!: ElementRef;

  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  daysInMonth: Date[] = [];

  readonly ChevronUp = ChevronUp;
  readonly ChevronDown = ChevronDown;

  isOpen = false;

  onChange: (_value: Date) => void = () => {};
  private onTouched = () => {};

  translatedMonths: string[] = [];
  translatedWeekdays: string[] = [];
  isSelectingMonthYear = false;
  selectedMonth = this.currentMonth;
  selectedYear = this.currentYear;
  yearList: number[] = [];
  selectedDates: Date[] = [];
  selectedRange: { start: Date | null; end: Date | null } = { start: null, end: null };

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.generateMonth(this.currentYear, this.currentMonth);
    this.initTranslations();
    this.translate.onLangChange.subscribe(() => {
      this.initTranslations();
    })
  }

  initTranslations() {
    this.translate.get([
      'datepicker.months.jan',
      'datepicker.months.feb',
      'datepicker.months.mar',
      'datepicker.months.apr',
      'datepicker.months.may',
      'datepicker.months.jun',
      'datepicker.months.jul',
      'datepicker.months.aug',
      'datepicker.months.sep',
      'datepicker.months.oct',
      'datepicker.months.nov',
      'datepicker.months.dec'
    ]).subscribe(months => {
      this.translatedMonths = [
        months['datepicker.months.jan'],
        months['datepicker.months.feb'],
        months['datepicker.months.mar'],
        months['datepicker.months.apr'],
        months['datepicker.months.may'],
        months['datepicker.months.jun'],
        months['datepicker.months.jul'],
        months['datepicker.months.aug'],
        months['datepicker.months.sep'],
        months['datepicker.months.oct'],
        months['datepicker.months.nov'],
        months['datepicker.months.dec']
      ];
    });

    this.translate.get([
      'datepicker.weekdays.sun',
      'datepicker.weekdays.mon',
      'datepicker.weekdays.tue',
      'datepicker.weekdays.wed',
      'datepicker.weekdays.thu',
      'datepicker.weekdays.fri',
      'datepicker.weekdays.sat'
    ]).subscribe(weekdays => {
      this.translatedWeekdays = [
        weekdays['datepicker.weekdays.sun'],
        weekdays['datepicker.weekdays.mon'],
        weekdays['datepicker.weekdays.tue'],
        weekdays['datepicker.weekdays.wed'],
        weekdays['datepicker.weekdays.thu'],
        weekdays['datepicker.weekdays.fri'],
        weekdays['datepicker.weekdays.sat']
      ];
    });
  }

  get displayValue(): string | null {
    if (this.mode === 'single' && this.selectedDates.length) {
      return this.formatDate(this.selectedDates[0]);
    }
    if (this.mode === 'multiple' && this.selectedDates.length) {
      return this.selectedDates.map(d => this.formatDate(d)).join(', ');
    }
    if (this.mode === 'range' && this.selectedRange.start) {
      const start = this.formatDate(this.selectedRange.start);
      const end = this.selectedRange.end ? this.formatDate(this.selectedRange.end) : '...';
      return `${start} - ${end}`;
    }
    return null;
  }

  get displayPlaceholder(): string {
    return this.placeholder?.trim() ?? this.translate.instant('date_placeholder');
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString(this.translate.currentLang);
  }

  toggleCalendar() {
    this.isOpen = !this.isOpen;
  }

  generateMonth(year: number, month: number) {
    this.daysInMonth = [];
    month = Number(month);

    const firstDay = new Date(year, month, 1);
    const startWeekDay = firstDay.getDay();

    for (let i = 0; i < startWeekDay; i++) {
      this.daysInMonth.push(null as any);
    }

    for (let i = 1; i <= 31; i++) {
      const date = new Date(year, month, i);
      if (date.getMonth() !== month) break;
      this.daysInMonth.push(date);
    }

    while (this.daysInMonth.length % 7 !== 0) {
      this.daysInMonth.push(null as any);
    }
  }

  toggleMonthYearSelector() {
    this.isSelectingMonthYear = !this.isSelectingMonthYear;

    if (this.isSelectingMonthYear && this.yearList.length === 0) {
      this.yearList = Array.from({ length: 2100 - 1940 + 1 }, (_, i) => 1940 + i);
    }

    this.selectedMonth = this.currentMonth;
    this.selectedYear = this.currentYear;
  }

  applyMonthYearSelection() {
    this.currentMonth = Number(this.selectedMonth);
    this.currentYear = Number(this.selectedYear);
    this.isSelectingMonthYear = false;
    this.generateMonth(this.currentYear, this.currentMonth);
  }

  get monthLabel(): string {
    if (this.translatedMonths?.length && this.currentMonth != null) {
      return `${this.translatedMonths[this.currentMonth]} ${this.currentYear}`;
    }
    return '';
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.generateMonth(this.currentYear, this.currentMonth);
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.generateMonth(this.currentYear, this.currentMonth);
  }

  getErrorMessage(): string {
    const ctrl = this.control;
    if (!ctrl || !ctrl.errors) return '';

    return this.translate.instant('required_field');
  }

  writeValue(value: any): void {
    if (this.mode === 'single') {
      this.selectedDates = value ? [new Date(value)] : [];
    }

    if (this.mode === 'multiple' && Array.isArray(value)) {
      this.selectedDates = value.map(d => new Date(d));
    }

    if (this.mode === 'range' && value?.start) {
      this.selectedRange = {
        start: value.start ? new Date(value.start) : null,
        end: value.end ? new Date(value.end) : null,
      };
    }
  }

  onDateClick(date: Date) {
    this.onTouched();

    switch (this.mode) {
      case 'single':
        this.selectedDates = [date];
        this.emitValue(date);
        break;
      case 'multiple':
        this.toggleDate(date);
        this.emitValue([...this.selectedDates]);
        break;
      case 'range':
        this.selectRange(date);
        this.emitValue({ ...this.selectedRange });
        break;
    }
  }

  toggleDate(date: Date) {
    const index = this.selectedDates.findIndex(d => d.toDateString() === date.toDateString());
    if (index !== -1) {
      this.selectedDates.splice(index, 1);
    } else if (this.selectedDates.length < this.maxSelections) {
      this.selectedDates.push(date);
    }
  }

  selectRange(date: Date) {
    if (!this.selectedRange.start || (this.selectedRange.start && this.selectedRange.end)) {
      this.selectedRange = { start: date, end: null };
    } else {
      if (date < this.selectedRange.start) {
        this.selectedRange = { start: date, end: this.selectedRange.start };
      } else {
        this.selectedRange.end = date;
      }
    }
  }

  isSelected(date: Date): boolean {
    return this.selectedDates.some(d => d.toDateString() === date.toDateString());
  }

  isInRange(date: Date): boolean {
    if (!this.selectedRange.start || !this.selectedRange.end) return false;
    return date >= this.selectedRange.start && date <= this.selectedRange.end;
  }

  isStart(date: Date): boolean {
    return this.selectedRange.start?.toDateString() === date.toDateString();
  }

  isEnd(date: Date): boolean {
    return this.selectedRange.end?.toDateString() === date.toDateString();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  emitValue(value: any) {
    this.onChange(value);
    this.dateChange.emit(this.prepareOutput(value));
  }

  prepareOutput(value: any): Date | Date[] | { start: Date | null; end: Date | null; range?: Date[] } {
    if (this.mode === 'single') {
      return value;
    }

    if (this.mode === 'multiple') {
      return value;
    }

    if (this.mode === 'range' && value?.start && value?.end) {
      return {
        start: value.start,
        end: value.end,
        range: this.getDatesInRange(value.start, value.end)
      };
    }

    return value;
  }

  getDatesInRange(start: Date, end: Date): Date[] {
    const dates: Date[] = [];
    const current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.containerRef?.nativeElement.contains(event.target)) {
      this.isOpen = false;
  }
}
}
