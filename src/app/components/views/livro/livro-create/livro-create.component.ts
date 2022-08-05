import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Livro } from '../livro-read-all/livro.model';
import { LivroService } from '../livro.service';

@Component({
    selector: 'app-livro-create',
    templateUrl: './livro-create.component.html',
    styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

    id_categoria: String = '';

    livro: Livro = {
        id_livro: '',
        titulo: '',
        nome_autor: '',
        texto: ''
    }

    titulo = new FormControl('', [Validators.minLength(3)]);
    nome_autor = new FormControl('', [Validators.minLength(3)]);
    texto = new FormControl('', [Validators.minLength(10)]);

    constructor(
        private livroService: LivroService
        , private route: ActivatedRoute
        , private router: Router
    ) { }

    ngOnInit(): void {
        this.id_categoria = this.route.snapshot.paramMap.get('id_categoria')!;
    }

    create(): void {
        this.livroService.create(this.livro, this.id_categoria).subscribe((resposta) => {
            this.router.navigate([`categorias/${this.id_categoria}/livros`]);
            this.livroService.mensagem('Livro criado com sucesso!');
        }, err => {
            this.router.navigate([`categorias/${this.id_categoria}/livros`]);
            this.livroService.mensagem('Erro na criação do Livro!');
        }) ;
    }

    cancel(): void {
        this.router.navigate([`categorias/${this.id_categoria}/livros`]);
    }

    getMessage() {
        if(this.titulo.invalid) {
            return 'O campo TITULO deve conter entre 3 e 100 caracteres';
        }
        if(this.nome_autor.invalid) {
            return 'O campo Nome do Autor deve conter entre 3 e 100 caracteres';
        }
        if(this.texto.invalid) {
            return 'O campo Texto deve conter entre 10 e 2000000 caracteres';
        }
        return false;
    }

}
