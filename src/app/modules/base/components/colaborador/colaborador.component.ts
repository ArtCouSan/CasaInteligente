import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface Colaborador {
  cpf: string;
  nome: string;
  departamento: string;
  acoes: string
}

const ELEMENT_DATA: Colaborador[] = [
  {cpf: "433.966.222-98", nome: 'Arthur Coutinho', departamento: "TI", acoes: "Editar"},
  {cpf: "212.345.678-90", nome: 'Beatriz Souza', departamento: "RH", acoes: "Editar"},
  {cpf: "567.890.123-45", nome: 'Carlos Almeida', departamento: "Financeiro", acoes: "Editar"},
  {cpf: "789.012.345-67", nome: 'Daniela Lima', departamento: "Marketing", acoes: "Editar"},
  {cpf: "890.123.456-78", nome: 'Eduardo Silva', departamento: "TI", acoes: "Editar"},
  {cpf: "901.234.567-89", nome: 'Fernanda Costa', departamento: "Vendas", acoes: "Editar"},
  {cpf: "234.567.890-12", nome: 'Gabriel Moreira', departamento: "Logística", acoes: "Editar"},
  {cpf: "345.678.901-23", nome: 'Helena Ferreira', departamento: "TI", acoes: "Editar"},
  {cpf: "456.789.012-34", nome: 'Isabela Martins', departamento: "Jurídico", acoes: "Editar"},
  {cpf: "567.890.123-45", nome: 'João Pereira', departamento: "RH", acoes: "Editar"},
  {cpf: "678.901.234-56", nome: 'Larissa Mendes', departamento: "TI", acoes: "Editar"},
  {cpf: "789.012.345-67", nome: 'Marcos Oliveira', departamento: "Financeiro", acoes: "Editar"},
  {cpf: "890.123.456-78", nome: 'Natalia Ribeiro', departamento: "Marketing", acoes: "Editar"},
  {cpf: "901.234.567-89", nome: 'Otávio Fonseca', departamento: "Vendas", acoes: "Editar"},
  {cpf: "234.567.890-12", nome: 'Paula Gomes', departamento: "Logística", acoes: "Editar"}
];


@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrl: './colaborador.component.scss'
})
export class ColaboradorComponent {
  displayedColumns: string[] = ['cpf', 'nome', 'departamento', 'acoes'];
  dataSource = new MatTableDataSource<Colaborador>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(library: FaIconLibrary) {
    library.addIcons(faPen);
    library.addIcons(faTrash);
  }
}
