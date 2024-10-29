import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap, catchError } from 'rxjs';

import { environment } from '../../../environments/environtment';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

	private baseUrl = environment.baseUrl;
	private user?: User;

	constructor(private httpClient: HttpClient) { }

	get currentUser(): User | undefined {
		if (!this.user) return undefined;
		return structuredClone(this.user); // JS para clonar objetos de manera profunda
	}

	login(email: string, password: string): Observable<User> {
		return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
			.pipe(
				tap(user => this.user = user),
				tap(user => localStorage.setItem('userToken', user.id.toString()))
			);
	}

	checkAuth(): Observable<boolean> {

		const userToken = localStorage.getItem('userToken');
		if (!userToken) return of(false);

		return this.httpClient.get<User>(`${this.baseUrl}/users/${userToken}`)
			.pipe(
				tap(user => this.user = user),
				map(user => !!user),
				catchError(err => of(false))
			);

	}


	logout(): void {
		this.user = undefined;
		localStorage.removeItem('userToken');
	}
}