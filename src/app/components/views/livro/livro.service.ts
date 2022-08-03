import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro-read-all/livro.model';

@Injectable({
    providedIn: 'root'
})

export class LivroService {

    baseURL: String = environment.baseURL;

    constructor(private http: HttpClient) { }

    findAllByCategoria(id_categoria: String): Observable<Livro[]> {
        const url = `${this.baseURL}/livros?categoria=${id_categoria}`
        return this.http.get<Livro[]>(url);
    }
}
