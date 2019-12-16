import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvSearchComponent } from './cv-search/cv-search.component';

import { AppAuthGuard } from '../../../portal-core/src/app/_common/guards/app-auth-guard';
import { TRAINEE_ROLE, TRAINING_ADMIN_ROLE } from '../../../portal-core/src/app/_common/models/portal-constants';
import { GenerateCvComponent } from './generate-cv/generate-cv.component';

const routes: Routes = [
  {
    path: 'trainee/current',
    component: GenerateCvComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [
        TRAINEE_ROLE
      ]
    }
  },
  {
    path: 'admin/view/:id',
    component: GenerateCvComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [
        TRAINING_ADMIN_ROLE
      ]
    }
  },
  {
    path: 'admin/search',
    component: CvSearchComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [
        TRAINING_ADMIN_ROLE
      ]
    }
  },
  {
    path: 'admin/view/:id',
    component: GenerateCvComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [
        TRAINING_ADMIN_ROLE
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
