import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetPostsComponent } from './Components/get-posts/get-posts.component';


const routes: Routes = [
  { path: '', component: GetPostsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
