import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environtment';

@Injectable({providedIn: 'root'})
export class HeroesService {

	private baseUrl: string = environment.baseUrl;

	constructor(private http: HttpClient) { }

	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
	}

	getHeroById(id: string): Observable<Hero | undefined> {
		return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
			.pipe(
				catchError(err => of(undefined))
			);
	}

	getSuggestions(query: string): Observable<Hero[]> {
		return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
	}
}