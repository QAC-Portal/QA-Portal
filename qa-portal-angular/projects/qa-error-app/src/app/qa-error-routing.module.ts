import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaErrorPageComponent } from './qa-error-page/qa-error-page.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: QaErrorPageComponent
      }
    ]
  },
  {
    path: 'error/404',
    redirectTo: '/error?errorMsg=Test/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaErrorRoutingModule { }
