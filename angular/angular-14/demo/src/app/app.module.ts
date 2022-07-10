import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { StandaloneDemoComponent } from './standalone-demo/standalone-demo.component';


@NgModule({
  declarations: [AppComponent, FormDemoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatInputModule,
    StandaloneDemoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
