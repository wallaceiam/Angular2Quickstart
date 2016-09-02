import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
//import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {

    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);

        ///return Promise.resolve(HEROES);
    }

    getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
        setTimeout(resolve, 2000)) // delay 2 seconds
        .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return Promise.resolve(
            this.getHeroes().then(heroes => heroes.find(hero => hero.id === id)));
    }

    update(hero: Hero) : Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http.put(url, JSON.stringify(hero), 
            {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);

        return Promise.reject(error.message || error);
    }
}