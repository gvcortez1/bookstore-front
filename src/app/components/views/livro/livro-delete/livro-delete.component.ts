import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Livro } from '../livro-read-all/livro.model';
import { LivroService } from '../livro.service';

@Component({
    selector: 'app-livro-delete',
    templateUrl: './livro-delete.component.html',
    styleUrls: ['./livro-delete.component.css']
})

export class LivroDeleteComponent implements OnInit {

    id_categoria: String = '';

    livro: Livro = {
        id_livro: '',
        titulo: '',
        nome_autor: '',
        texto: ''
    }

    constructor(
        private livroService: LivroService
        , private route: ActivatedRoute
        , private router: Router
    ) { }

    ngOnInit(): void {
        this.id_categoria = this.route.snapshot.paramMap.get('id_categoria')!;
        this.livro.id_livro = this.route.snapshot.paramMap.get('id_livro')!;
        this.findById();
    }

    create(): void {
        this.livroService.create(this.livro, this.id_categoria).subscribe((resposta) => {
            this.router.navigate([`categorias/${this.id_categoria}/livros`]);
            this.livroService.mensagem('Livro criado com sucesso!');
        }, err => {
            this.router.navigate([`categorias/${this.id_categoria}/livros`]);
            this.livroService.mensagem('Erro na criação do Livro!');
        });
    }

    cancel(): void {
        this.router.navigate([`categorias/${this.id_categoria}/livros`]);
    }

    findById(): void {
        this.livroService.findById(this.livro.id_livro!).subscribe((resposta) => {
            this.livro = resposta;
        });
    }

    delete(): void {
        this.livroService.delete(this.livro.id_livro!).subscribe((resposta) => {
            this.router.navigate([`categorias/${this.id_categoria}/livros`]);
            this.livroService.mensagem('Livro apagado com sucesso!');
        }, err => {
            this.router.navigate([`categorias/${this.id_categoria}/livros`]);
            this.livroService.mensagem('Falha ao apagar o Livro!');
        })
    }

}
