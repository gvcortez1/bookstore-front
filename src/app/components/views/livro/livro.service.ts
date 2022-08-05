import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro-read-all/livro.model';

@Injectable({
    providedIn: 'root'
})

export class LivroService {

    baseURL: String = environment.baseURL;

    constructor(private http: HttpClient, private _snack: MatSnackBar) { }

    findAllByCategoria(id_categoria: String): Observable<Livro[]> {
        const url = `${this.baseURL}/livros?categoria=${id_categoria}`;
        return this.http.get<Livro[]>(url);
    }

    findById(id_livro: String): Observable<Livro> {
        const url = `${this.baseURL}/livros/${id_livro}`;
        return this.http.get<Livro>(url);
    }

    update(livro: Livro): Observable<Livro> {
        const url = `${this.baseURL}/livros/${livro.id_livro}`;
        return this.http.put<Livro>(url, livro);
    }

    create(livro: Livro, id_categoria: String): Observable<Livro> {
        const url = `${this.baseURL}/livros?categoria=${id_categoria}`;
        return this.http.post<Livro>(url, livro);
    } 

    delete(id_livro: String): Observable<void> {
        const url = `${this.baseURL}/livros/${id_livro}`;
        return this.http.delete<void>(url);
    }

    mensagem(str: String): void {
        this._snack.open(`${str}`, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
        })
    } 

}
