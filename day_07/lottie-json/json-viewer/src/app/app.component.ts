import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'json-viewer';
  services = [
    { name: 'Mobile Apps', path: '/assets/data.json' },
    { name: 'Cloud Services', path: '/assets/cloud_services.json' },
    { name: 'Backup Services', path: '/assets/backup.json' },
    { name: 'RFID Solutions', path: '/assets/rfid.json' },
    { name: 'Training & Placement', path: '/assets/presentation-work-activity.json' }
  ];
}
