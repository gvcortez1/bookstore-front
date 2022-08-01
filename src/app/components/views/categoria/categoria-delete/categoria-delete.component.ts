import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
    selector: 'app-categoria-delete',
    templateUrl: './categoria-delete.component.html',
    styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

    categoria: Categoria = {
        id_categoria: '',
        nome: '',
        descricao: ''
    }

    constructor(private categoriaService: CategoriaService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.categoria.id_categoria = this.route.snapshot.paramMap.get('id')!;
        this.findById();
    }

    findById(): void {
        this.categoriaService.findById(this.categoria.id_categoria!).subscribe((resposta) => {
            this.categoria.nome = resposta.nome;
            this.categoria.descricao = resposta.descricao;
        });
    }

    delete(): void {
        this.categoriaService.delete(this.categoria.id_categoria!).subscribe((resposta) => {
            this.router.navigate(['categorias']);
            this.categoriaService.mensagem('Categoria apagada com sucesso!');
        }, err => {
            this.categoriaService.mensagem(err.error.error);
        })
        ;
    }

    cancel(): void {
        this.router.navigate(['categorias']);
    }
}
