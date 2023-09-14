## Considere o seguinte resgate hipotético de plano de previdência privada.

### Seu desafio é construir uma API REST, que possibilite executar as seguintes ações:
    • Cadastro de cliente
    • Cadastro de produto
    • Contratação de plano
    • Resgate de plano
    • Aporte extra

### O desafio é que o entrevistado implemente uma API aonde seja possível cadastrar clientes,
- cadastro de produtos, contratação de planos, realizar um aporte extra no plano e depois resgatar, seguindo as regras do produto.

- Para o cliente contratar um plano, é necessário que esteja dentro do período de venda e acima do aporte mínimo do produto.
- Para realizar o resgate, é necessário que o cliente atenda as regras de resgate
definidas no produto.
-Um plano sem saldo estará automaticamente cancelado, não podendo mais haver
nenhuma operação no mesmo.
- Para realizar um aporte extra, é necessário que o cliente atenda as regras definidas no
produto.

## Nossas Expectativas

* Esperamos que a sua solução seja simples, de fácil entendimento/manutenção. Com
instruções de como executar o código e com documentações onde você̂julgar necessário.
Além das nossas expectativas
Testes de unidade e integração de qualidade, dockerização da aplicação e documentação da
API(OpenAPI/Swagger).
Mandatório
Você deve entregar o código fonte de sua solução para nós em um arquivo comprimido
(zip)contendo o código e toda documentação possível. Favor não incluir arquivos
desnecessários como binários, compilados, bibliotecas, etc.;
Não faça o upload da sua solução em nenhum repositório público como GitHub, BitBucket,
etc.;
#
Cadastro de cliente
```json 
Request:
{
    "cpf":"45645645600",
    "nome":"José da Silva",
    "email":"jose@cliente.com",
    "dataDeNascimento":"2010-08-24T12:00:00.000Z",
    "genero":"Masculino",
    "rendaMensal":2899.5
}

Response:
{
    "id":"7e468f2e-11b6-41d1-b9f9-ca46dd9f5d8e"
}
```
#
Cadastro de produto
```json 
Request:
{
    "nome":"Brasilprev Longo Prazo",
    "susep":"15414900840201817",
    "expiracaoDeVenda":"2021-01-01T12:00:00.000Z",
    "valorMinimoAporteInicial":1000.0, // valor mínimo de aporte no momento da contração
    "valorMinimoAporteExtra":100.0,// valor mínimo do aporte extra
    "idadeDeEntrada":18,// idade mínima para comprar o produto
    "idadeDeSaida":60,// idade máxima para começar a usufruir do benefício
    "carenciaInicialDeResgate":60,// em dias - carência para realizar o primeiro resgate
    "carenciaEntreResgates":30// em dias - carência para realizar outro resgate após
}
Response:
{
"id":"04aac243-be46-4a72-830f-3f3d72f6082e"
}
```

# 
Contratação de plano
Regras:
Não será possível contratar um produto com prazo de venda expirado.
As regras da contratação como valor de aporte, idade mínima de entrada e saída etc.,devem
ser levadas em consideração.
```json 
Request:
{
    "idCliente":"18dfeb91-459a-4bc7-9cdd-d93b41f7bf62",
    "idProduto":"30f6b23f-c93d-4cf9-8916-bcdb9fac83df",
    "aporte":2000.00,
    "dataDaContratacao":"2022-04-05T12:00:00.000Z",
    "idadeDeAposentadoria":60
}
Response:
{
"id":"f3f4e1ee-e310-41c4-8ba7-23e4e414b396"
}
```
#
Aporte Extra
Regras:
Deve ser validado o valor mínimo de aporte do produto.
```json 
Request:
{
    "idCliente":"77a819c5-bb2f-4ade-84a2-a81dfc67428b",
    "idPlano":"24fb6c42-6234-402e-ac84-2306d8c16137",
    "valorAporte":100.00
}
Response:
{
    "id":"ad1c4905-7f1f-4ed6-bb33-ed0cb553f934"
}
```

#
Resgate
Regras:
Devem ser validados os prazos de carência para resgate.
Deve ser validado o saldo do plano em relação ao valor resgatado.
```json 

Request:
{
    "idPlano":"98add7e5-1475-4af0-8478-8a94965e7000",
    "valorResgate":1000.00
}
Response:
{
    "id":"a483d56e-8f9e-43c4-a268-0affcdbd9ea2"
}
```

