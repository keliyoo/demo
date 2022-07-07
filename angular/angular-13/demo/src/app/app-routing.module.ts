import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDemoComponent } from './form-demo/form-demo.component';

const routes: Routes = [{ path: 'demo/form', component: FormDemoComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
