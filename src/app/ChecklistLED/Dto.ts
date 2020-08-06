
export interface RequestDto  {
  idFilial: number;
  cor: string;
}


export interface BaseResponseDTO {
  code: number;
  status?: any;
  message: string;
  data: object;
}
