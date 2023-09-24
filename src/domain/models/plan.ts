export namespace Plan {
  export interface Common {
    idCliente: string
    idProduto: string
    aporte: number
    dataDaContratacao: Date
    idadeDeAposentadoria: number
    createdAt: Date
    updatedAt: Date
  }

  export interface WithId extends Common {
    id: string
  }
}
