import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() data: any;
  @Output() filteredData = new EventEmitter();
  search: string = null;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: string): void {
    if (event.length > 2) {
      const filtered = this.data.filter(item =>
          item.title.toLowerCase().includes(event.toLowerCase()) ||
          item.body.toLowerCase().includes(event.toLowerCase())
      );
      this.filteredData.emit(filtered);
    } else {
        this.filteredData.emit(this.data);
    }
  }
}
