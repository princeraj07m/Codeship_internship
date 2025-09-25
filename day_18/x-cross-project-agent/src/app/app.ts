import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('x-cross-project-agent');
   

  teamMembers = [
    { name: 'Earnestine Lucero', designation: 'Designation', image: 'team-mem.png' },
    { name: 'Alice', designation: 'Developer', image: 'team-mem.png' },
    { name: 'Bob', designation: 'Designer', image: 'team-mem.png' },
    { name: 'Charlie', designation: 'Manager', image: 'team-mem.png' },
    { name: 'Diana', designation: 'QA', image: 'team-mem.png' },
  ];

  currentPage = 1;
  itemsPerPage = 3;

  get totalPages(): number {
    return Math.ceil(this.teamMembers.length / this.itemsPerPage);
  }

  get paginatedMembers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.teamMembers.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  pagesToShow(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    let range: (number | string)[] = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current - delta > 2) {
      range.unshift('...');
    }
    if (current + delta < total - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (total > 1) range.push(total);

    return range;
  }

}
