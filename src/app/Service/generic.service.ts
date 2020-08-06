import { BaseResponseDTO } from './../ChecklistLED/Dto';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private http: HttpClient) { }

  verificaSeSinalizadorLuxaForEstaRodando (ip: string): Observable<any> {
    const url = 'http://' + ip + ':8181/clique-retire-sinalizador/actuator/health';
    return this.http.get<any>(url);
  }

  reiniciarServicoSinalizadorLuxaFor(ip: string) {
    const url = 'http://' + ip + ':8181/clique-retire-sinalizador/restart';
    return this.http.post(url, null);
  }

  enviarSinalLEDServidor (cor: string, idFilial: number): Observable<any> {
    const url = `${environment.cliqueRetireSchedleEndponit}/test/atualizar-cor-sinalizador?corHexadecimal=` + cor + '&filial=' + idFilial;
    const options = this.getHttpHeaderOptions();

    return this.http.get<BaseResponseDTO>(url, options);
  }

  obterFilial(ip: string): Observable<any> {
    const url = `${environment.cliqueRetireEndpoint}` + '/login/buscar-filial-ip?ip=' + ip;
    const options = this.getHttpHeaderOptions();

    return this.http.get<BaseResponseDTO>(url, options);
  }

  getHttpHeaderOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
                                'IP': `${sessionStorage.getItem('LOCAL_IP')}`})
                               };
    return { headers: httpOptions.headers };
  }

}
