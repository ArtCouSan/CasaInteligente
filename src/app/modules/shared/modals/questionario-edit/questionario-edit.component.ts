import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatInput } from '@angular/material/input';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheck, faAngleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { Pesquisa } from '../../../../core/dto/pesquisa';
import { Pergunta } from '../../../../core/dto/pergunta';
import { PesquisaService } from '../../../../service/pesquisa.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RespostasComponent } from '../respostas/respostas.component';

@Component({
  selector: 'app-questionario-edit',
  templateUrl: './questionario-edit.component.html',
  styleUrl: './questionario-edit.component.scss'
})
export class QuestionarioEditComponent implements AfterViewInit, OnInit {

  @Input() pesquisa!: Pesquisa;
  @Output() salvar = new EventEmitter<Pesquisa>();
  @Output() voltar = new EventEmitter<void>();

  perguntas: Pergunta[] = [];  // Lista de perguntas carregadas do serviço
  displayedColumns: string[] = ['selecionada', 'texto', 'opcoes_resposta'];
  dataSource = new MatTableDataSource<Pergunta>(this.perguntas);  // Fonte de dados da tabela
  perguntaSelecionada!: Pergunta;

  @ViewChild('filterInput') filterInput!: MatInput;  // Para acessar o input de filtro

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    library: FaIconLibrary,
    private pesquisaService: PesquisaService,
    private dialog: MatDialog
  ) {
    library.addIcons(faCheck, faEye, faAngleLeft);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.carregarPerguntas();  // Carrega as perguntas quando o componente é iniciado
  }

  carregarPerguntas(): void {
    this.pesquisaService.getPerguntas().subscribe({
      next: (perguntas) => {
        // Verificar se a pesquisa tem perguntas associadas
        const perguntasPesquisa = this.pesquisa.perguntas || [];  // Garantir que não seja undefined

        // Verificar se a pergunta está na lista de perguntas da pesquisa atual
        this.perguntas = perguntas.map(pergunta => ({
          ...pergunta,
          selecionada: perguntasPesquisa.some(p => p.id === pergunta.id)  // Verifica se a pergunta está na pesquisa
        }));

        // Atualiza a tabela com os dados
        this.dataSource.data = this.perguntas;
      },
      error: (err) => console.error('Erro ao carregar perguntas:', err)
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onVoltar(): void {
    this.voltar.emit();
  }

  onSalvar(): void {
    const perguntasSelecionadas = this.perguntas
      .filter(pergunta => pergunta.selecionada)
      .map(pergunta => ({
        ...pergunta,  // Mantém as propriedades adicionais da Pergunta (como acoes, selecionada)
        id: pergunta.id,
        texto: pergunta.texto,
        opcoes_resposta: pergunta.opcoes_resposta
      }));

    const pesquisaFinalizada = {
      ...this.pesquisa,
      perguntas: perguntasSelecionadas  // Inclui as perguntas selecionadas na pesquisa
    };

    this.salvar.emit(pesquisaFinalizada);
  }


  abrirModal(pergunta: Pergunta): void {
    this.perguntaSelecionada = pergunta;
    this.dialog.open(RespostasComponent, {
      data: pergunta
    });
  }
}
