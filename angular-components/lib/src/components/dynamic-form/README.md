# Dynamic Form

O objetivo deste módulo é prover um meio de criar formulários dinâmicos com campos criados a partir dos objetos passados como parâmetro.

<span style="color:red;font-size:1.5em">**ESSE COMPONENTE É APENAS UM UTILITÁRIO PARA OUTROS COMPONENTES E GERADOR DE TELAS. SEU USO NÃO É RECOMENDADO E SUA API PODE SER QUEBRADA SEM AVISO PRÉVIO.**</span>

## Features

*   Montagem do formulário dinamicamente
*   Inputs conforme tipo do campo
*   Mensagens de erro

## Dependências

*   [PrimeNG](https://www.npmjs.com/package/primeng)
*   [CurrencyMask](https://www.npmjs.com/package/ng2-currency-mask)

## Tipos suportados

Os tipos suportados são detalhados na tabela abaixo. Cada tipo suporta algumas configurações básicas de máscaras e expressões regulares.

| Tipo         | Descrição                                                                                            | Máscara configurável                                                                             | Base de Máscaras |
| :----------- | :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- | :--------------- |
| String       | Campo do tipo texto.                                                                                 | De acordo com a propriedade `mask` do [`Field`](form-field.ts)                                   | [PrimeNG]        |
| Boolean      | Campo do tipo booleano.                                                                              | Não                                                                                              | N/A              |
| Enum         | Campo do tipo enumeração. Recebe na propriedade `options` um array de objetos com `label` e `value`. | Não                                                                                              | N/A              |
| Integer      | Campo do tipo numérico inteiro.                                                                      | De acordo com a propriedade `mask` do [`Field`](form-field.ts)                                   | [PrimeNG]        |
| Double       | Campo do tipo numérico com ponto flutuante.                                                          | De acordo com a propriedade `mask` do [`Field`](form-field.ts)                                   | [PrimeNG]        |
| Money        | Campo do tipo monetário.                                                                             | De acordo com a propriedade [`currencyOptions`](../locale/locale.ts) do [`Field`](form-field.ts) | [CurrencyMask]   |
| Date         | Campo do tipo data.                                                                                  | De acordo com a propriedade [`calendarOptions`](../locale/locale.ts) do [`Field`](form-field.ts) | [PrimeNG]        |
| DateTime     | Campo do tipo data com hora.                                                                         | De acordo com a propriedade [`calendarOptions`](../locale/locale.ts) do [`Field`](form-field.ts) | [PrimeNG]        |
| Time         | Campo do tipo hora.                                                                                  | De acordo com a propriedade [`calendarOptions`](../locale/locale.ts) do [`Field`](form-field.ts) | [PrimeNG]        |
| Autocomplete | Campo do tipo autocomplete.                                                                          | Não                                                                                              | N/A              |
[currencymask]: https://github.com/cesarrew/ng2-currency-mask/blob/master/src/currency-mask.config.ts
[primeng]: https://www.primefaces.org/primeng/#/inputmask

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/dynamic-form-showcase)

*   **Módulo**: `DynamicFormModule`
*   **Componente**: `DynamicFormComponent`
*   **Seletor**: `s-dynamic-form`

**O componente serve apenas para montar a estrutura de campos na tela. A criação dos controladores para cada campo fica a cargo do utilizador.**

### Import

```typescript
import { DynamicFormModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        DynamicFormModule,
    ],
})
export class MyModule {
    /* ... */
}
```

### HTML

```html
<s-dynamic-form [fields]="fields" [form]="formGroup" [errorMessages]="{pattern: 'Valor inválido', required: 'Campo obrigatório'}"></s-dynamic-form>
```

### Inputs

| Nome          | Tipo                       | Valor Padrão | Obrigatório | Descrição                                                                      |
| :------------ | :------------------------- | :----------- | :---------- | :----------------------------------------------------------------------------- |
| fields        | [`Field[]`](form-field.ts) | N/A          | Sim         | `Array` com objetos de configuração para cada um dos campos que serão exibidos |
| formGroup     | `FormGroup`                | N/A          | Sim         | `FormGroup` dos quais os campos do formulário dinâmico farão parte             |
| errorMessages | `object`                   | `{}`         | Não         | Objeto com chave de erro e mensagem que deverá ser exibida                     |
