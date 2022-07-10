import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    selector: 'app-standalone-demo',
    templateUrl: './standalone-demo.component.html',
    styleUrls: ['./standalone-demo.component.scss'],
    // an existing module is imported directly into a standalone component
    imports: [MatButtonModule]
  })
  export class StandaloneDemoComponent implements OnInit  {
    ngOnInit(): void {
    }
  
  }