import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
    selector: 'app-categoria-update',
    templateUrl: './categoria-update.component.html',
    styleUrls: ['./categoria-update.component.css']
})

export class CategoriaUpdateComponent implements OnInit {

    categoria: Categoria = {
        id_categoria: '',
        nome: '',
        descricao: ''
    }

    constructor(private categoriaService: CategoriaService
                , private route: ActivatedRoute
                , private router: Router ) { }

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

    update(): void {
        this.categoriaService.update(this.categoria).subscribe((resposta) => {
            this.router.navigate(['categorias']);
            this.categoriaService.mensagem('Categoria atualizada com sucesso!');
        }, err => {
            this.categoriaService.mensagem('Validar se todos os campos estão preenchidos corretamente!')
        })
    }

    cancel(): void {
        this.router.navigate(['categorias'])
    }

}
