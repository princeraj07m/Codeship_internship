import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-media',
  template: '<p>upload-media works!</p>',
})
export class UploadMediaComponent {
  @Output() selectedImg = new EventEmitter<any>();
}