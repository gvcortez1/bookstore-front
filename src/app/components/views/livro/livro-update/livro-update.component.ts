import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Livro } from '../livro-read-all/livro.model';
import { LivroService } from '../livro.service';


@Component({
    selector: 'app-livro-update',
    templateUrl: './livro-update.component.html',
    styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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

    update(): void {
        this.livroService.update(this.livro).subscribe((resposta) => {
            this.router.navigate([`categorias/${this.id_categoria}/livros`]);
            this.livroService.mensagem('Livro atualizado com sucesso!');
        }, err => {
            this.router.navigate([`categorias/${this.id_categoria}/livros`]);
            this.livroService.mensagem('Falha ao atualizar o Livro!');
        })
    }

    getMessage() {
        if (this.titulo.invalid) { return 'O campo TITULO deve conter entre 3 e 100 caracteres'; }
        if (this.nome_autor.invalid) { return 'O campo Nome do Autor deve conter entre 3 e 100 caracteres'; }
        if (this.texto.invalid) { return 'O campo Texto deve conter entre 10 e 2000000 caracteres'; }
        return false;
    }

}
