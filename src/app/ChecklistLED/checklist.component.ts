import { GenericService } from '../Service/generic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  ip = '';
  statusServicoSinalizadorLuxaFor = '';
  cor = '';

  filial = {
    id: 0,
    nomeFantasia : 'INDEFINIDO'
  };

  constructor(private genericService: GenericService) { }

  ngOnInit() {

  }

  pesquisar() {
    this.cor = '';
    this.genericService.obterFilial(this.ip).subscribe(
      retorno => {
        this.filial = retorno.data


        this.genericService.verificaSeSinalizadorLuxaForEstaRodando(this.ip).subscribe(
          res => {
            this.statusServicoSinalizadorLuxaFor = 'LIGADO';
            this.cor = 'retangulo verde';
          },
          err => {
            this.statusServicoSinalizadorLuxaFor = 'DESLIGADO';
            this.cor = 'retangulo vermelho';
          }
        );

      },
      err => {
        this.filial.id = 0;
        this.filial.nomeFantasia = 'INDEFINIDO'
        alert('Filial não encontrada!')
      }
      )
  }

  reiniciarServicoSinalizadorLuxaFor() {
    if (this.filialValida()) {
      this.genericService.reiniciarServicoSinalizadorLuxaFor(this.ip).subscribe(
        res => {alert('Serviço reiniciado com Sucesso!')},
        err => {alert('Não foi possível reiniciar o serviço!')}
      );
    }

  }

  enviarSinalLEDServidor (cor: string) {
    if (this.filialValida()) {
      this.genericService.enviarSinalLEDServidor(cor, this.filial.id).subscribe();
    }
  }


  filialValida() {
    if (this.filial.id === 0) {
      alert('Filial INDEFINIDA!!')
      return false;
    }
    return true;
  }


}
