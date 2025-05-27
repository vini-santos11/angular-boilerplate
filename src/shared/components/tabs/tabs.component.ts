import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit{
  @ContentChildren(TabItemComponent) tabs!: QueryList<TabItemComponent>;
  @Input() activeIndex: number = 0;
  @Output() onChange = new EventEmitter<number>();

  ngAfterContentInit() {
    this.selectTab(this.activeIndex);
  }

  selectTab(index: number) {
    this.tabs.forEach((tab, i) => (tab.active = i === index));
    this.activeIndex = index;
    this.onChange.emit(index);
  }
}
