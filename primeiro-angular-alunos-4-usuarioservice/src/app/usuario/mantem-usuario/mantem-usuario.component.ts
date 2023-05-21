import { UsuarioService } from './../../shared/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-mantem-usuario',
  templateUrl: './mantem-usuario.component.html',
  styleUrls: ['./mantem-usuario.component.css']
})
export class MantemUsuarioComponent implements OnInit{

  usuarioDeManutencao: Usuario;
  estahCadastrando = true;
  nomeBotaoManutencao = 'Cadastrar';

  usuarios: Usuario[] = [];

  constructor(private rotaAtual: ActivatedRoute, private roteador: Router, private usuarioService: UsuarioService) {
    this.usuarioDeManutencao = new Usuario();
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuariosRetornados =>
        this.usuarios = usuariosRetornados
    );

    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      this.usuarioService.pesquisarPorId(parseInt(idParaEdicao)).subscribe(
        usuarioPesquisado=> {
          this.estahCadastrando = false;
          this.nomeBotaoManutencao = 'Salvar';
          this.usuarioDeManutencao = usuarioPesquisado;
        }
      )
    } else {
      this.nomeBotaoManutencao = 'Cadastrar';
    }
  }

  manter(): void {
    if (this.estahCadastrando && this.usuarioDeManutencao) {
      this.usuarioService.inserir(this.usuarioDeManutencao).subscribe(
        novoUsuario =>
        this.usuarios.push(novoUsuario)
    )} else {
      this.usuarioService.atualizar(this.usuarioDeManutencao).subscribe(
        usuarioAtualizado =>
        usuarioAtualizado = this.usuarioDeManutencao
      )
    }

    this.usuarioDeManutencao = new Usuario();
    this.nomeBotaoManutencao = 'Cadastrar';
    this.roteador.navigate(['listagemusuarios']);
  }
}
