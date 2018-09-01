# Custom Fields

O módulo de campos customizados da senior trabalha em conjunto com o [serviço de customização](http://git.senior.com.br/arquitetura/customization-management) e com as primitivas geradas pela [SDL](http://git.senior.com.br/arquitetura/sdl) no serviço ao qual a entidade pertence.

O objetivo deste módulo é prover um frontend padronizado para exibição e edição de campos customizados.

## Features

*   Montagem do formulário dinamicamente
*   Inputs conforme tipo do campo
*   Validação dos campos de acordo com os dados customizados
*   Mensagens de erro

## Dependências

*   [RxJS](https://www.npmjs.com/package/rxjs)
*   [PrimeNG](https://www.npmjs.com/package/primeng)
*   [CurrencyMask](https://www.npmjs.com/package/ng2-currency-mask)
*   [Senior Platform Data](https://www.npmjs.com/package/@seniorsistemas/senior-platform-data)

## Configuração dos metadados

Tendo em vista que o componente utiliza os [metadados cadastrados no serviço de customização](http://git.senior.com.br/arquitetura/customization-management/wikis/Campos%20customizados), algumas configurações básicas de máscaras e expressões regulares são suportados, de acordo com a tabela:

| Tipo     | Descrição                                                                                      | Máscara Default | Base de Máscaras | Valida Expressão Regular |
| :------- | :--------------------------------------------------------------------------------------------- | :-------------- | :--------------- | :----------------------- |
| String   | Campo do tipo texto. Máscara aplicada no input. Valores gravados com a máscara digitada.       | Nenhuma         | [PrimeNG]        | Sim                      |
| Boolean  | Campo do tipo booleano. Valores gravados como verdadeiro ou falso. Exibe um checkbox no input. | N/A             | N/A              | Não                      |
| Integer  | Campo do tipo numérico inteiro. Valores gravados como digitados.                               | Nenhuma         | [PrimeNG]        | Sim                      |
| Double   | Campo do tipo numérico com ponto flutuante. Valores gravados como double, sem a máscara.       | Nenhuma         | [PrimeNG]        | Sim                      |
| Money    | Campo do tipo monetário. Valores gravados como double, sem a máscara.                          | Conforme locale | [CurrencyMask]   | Não                      |
| Date     | Campo do tipo data. Valores gravados como ISODate.                                             | Conforme locale | [PrimeNG]        | Não                      |
| DateTime | Campo do tipo data com hora. Valores gravados como ISODate.                                    | Conforme locale | [PrimeNG]        | Não                      |
| Time     | Campo do tipo hora. Valores gravados como Time.                                                | Conforme locale | [PrimeNG]        | Não                      |

[currencymask]: https://github.com/cesarrew/ng2-currency-mask/blob/master/src/currency-mask.config.ts
[primeng]: https://www.primefaces.org/primeng/#/inputmask

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/custom-fields-showcase)

*   **Módulo**: `CustomFieldsModule`
*   **Componente**: `CustomFieldsComponent`
*   **Seletor**: `s-custom-fields`

### Import

```typescript
import { CustomFieldsModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        CustomFieldsModule,
    ],
})
export class MyModule {
    /* ... */
}
```

### HTML

```html
<s-custom-fields domain="kickoff" service="manufatura" entity="sku" formControlName="custom" [invalidErrorLabel]="'error_invalid' | translate"></s-custom-fields>
```

### Inputs

| Nome              | Tipo     | Valor Padrão | Obrigatório | Descrição                                       |
| :---------------- | :------- | :----------- | :---------- | :---------------------------------------------- |
| domain            | `string` | N/A          | Sim         | Nome do Domínio                                 |
| service           | `string` | N/A          | Sim         | Nome do Serviço                                 |
| entity            | `string` | N/A          | Sim         | Nome da Entidade                                |
| invalidErrorLabel | `string` | N/A          | Não         | Texto de erro para campos com valores inválidos |
