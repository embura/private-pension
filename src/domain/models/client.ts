export namespace Client {
  export interface Common {
    cpf: string
    nome: string
    email: string
    dataDeNascimento: Date
    genero: string
    rendaMensal: number
  }

  export interface WithId extends Common {
    id: string
  }
}
