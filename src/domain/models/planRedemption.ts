export namespace PlanRedemption {
  export interface Common {
    idPlano: string
    valorResgate: number
    createdAt: Date
  }

  export interface WithId extends Common {
    id: string
  }
}
