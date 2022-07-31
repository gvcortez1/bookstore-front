import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
    selector: 'app-categoria-read',
    templateUrl: './categoria-read.component.html',
    styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

    categorias: Categoria[] = [];

    displayedColumns: string[] = ['id_categoria', 'nome', 'descricao', 'acoes'];

    constructor(private categoriaService: CategoriaService) { }

    ngOnInit(): void {
        this.findAll();
    }

    findAll() {
        this.categoriaService.findAll().subscribe(resposta => {
            console.log(resposta);
            this.categorias = resposta;
        })
    }

}
