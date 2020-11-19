import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full' },
  {path:'add', component:AddComponent},
  {path:'home', component:HomeComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'show/:id',component:ShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
