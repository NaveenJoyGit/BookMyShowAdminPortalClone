import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponentComponent } from './Components/add-movie-component/add-movie-component.component';
import { EditMovieComponent } from './Components/edit-movie/edit-movie.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import { TableComponent } from './Components/table/table.component';

const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'movie-details/:id', component: MovieDetailsComponent},
  {path: 'add-movie', component: AddMovieComponentComponent},
  {path: 'edit-movie/:id', component: EditMovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
