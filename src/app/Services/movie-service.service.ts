import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { Movies } from '../Models/Movies';
import {MovieDetailsResponse} from '../Models/MovieDetails'
import { AddMovieRequest } from '../Models/AddMovieResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  movieListUrl: string = 'http://localhost:8080/api/v1/movies/all';
  movieDetailsUrl: string = 'http://localhost:8080/api/v1/movie/details/'
  addMovieUrl: string = 'http://localhost:8080/api/v1/movie/add-movie'
  editMovieUrl: string = 'http://localhost:8080/api/v1/movie/edit-movie/'

  private _movieSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  movieList: Observable<any> = this._movieSubject.asObservable().pipe(distinctUntilChanged())

  constructor(private http : HttpClient) { }


  getAllMovies(): Observable<Movies[]> {
    let movies = this.http.get<Movies[]>(this.movieListUrl);
    this.saveMoviesListToBehaviourSubject(movies)
    return movies;
  }

  getMovieDetails(id: number): Observable<MovieDetailsResponse[]> {
    let url = this.movieDetailsUrl + id;
    let movieDetails = this.http.get<MovieDetailsResponse[]>(url);
    return movieDetails;
  }

  addMovie(request: AddMovieRequest) {
    return this.http.post<any>(this.addMovieUrl, request);
  }

  editMovie(request: AddMovieRequest, id: any) {
    let uri = this.editMovieUrl + id;
    
    return this.http.post<any>(uri, request);
  }

  saveMoviesListToBehaviourSubject(httpData: Observable<Movies[]>) {
    httpData.subscribe({
      next: data =>  this._movieSubject.next(data)
    })
  }

}
