import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from './categoria.model';

@Injectable({
    providedIn: 'root'
})

export class CategoriaService {

    baseURL: String = environment.baseURL;

    constructor(private http: HttpClient, private _snack: MatSnackBar) { }

    findAll(): Observable<Categoria[]> {
        const url = `${this.baseURL}/categorias`;
        return this.http.get<Categoria[]>(url)
    }

    findById(id_categoria: String): Observable<Categoria> {
        const url = `${this.baseURL}/categorias/${id_categoria}`;
        return this.http.get<Categoria>(url)
    }

    create(categoria: Categoria): Observable<Categoria> {
        const url = `${this.baseURL}/categorias`;
        return this.http.post<Categoria>(url, categoria);
    } 

    delete(id_categoria: String):Observable<void> {
        const url = `${this.baseURL}/categorias/${id_categoria}`;
        return this.http.delete<void>(url);
    }

    update(categoria: Categoria):Observable<void> {
        const url = `${this.baseURL}/categorias/${categoria.id_categoria}`;
        return this.http.put<void>(url, categoria);
    }

    mensagem(str: String): void {
        this._snack.open(`${str}`, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
        })
    } 
}
