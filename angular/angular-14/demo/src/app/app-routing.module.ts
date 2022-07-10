import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormDemoComponent } from './form-demo/form-demo.component';

const routes: Routes = [
  {
    path: 'standalone',
    loadComponent: () =>
      import('./standalone-demo/standalone-demo.component').then(
        (mod) => mod.StandaloneDemoComponent
      ),
  },
  { path: '**', component: FormDemoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
