import {Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";

export const AppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./components/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'ci-pme',
        loadChildren: () =>
          import('./components/ci-pme/ci-pme.module').then(m => m.CiPmeModule)
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
