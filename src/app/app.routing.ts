import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { GifsComponent } from './gifs/gifs.component';


const routes: Routes =[
  {
    path: '',
    redirectTo: 'gifs',
    pathMatch: 'full',
  },
  { path: 'gifs',     component: GifsComponent },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
