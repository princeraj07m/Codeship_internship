
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
// import { UploadMediaComponent } from './upload-media/upload-media.component';

@NgModule({
  declarations: [
    App,
    // UploadMediaComponent
  ],

  providers: [MessageService],
  bootstrap: [App]
})
export class AppModule { }
