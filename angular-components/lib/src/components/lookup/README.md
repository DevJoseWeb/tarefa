# Input Lookup

O módulo de input lookup tem como objetivo facilitar a busca ao usuário com filtro avançado.

## Features

*   Input auto complete
*   Modal com filtro avançado

## Dependências

*   [RxJS](https://www.npmjs.com/package/rxjs)
*   [PrimeNG](https://www.npmjs.com/package/primeng)
*   [font-awesome](https://fontawesome.com/v4.7.0/)

## Utilização

[**Exemplo completo de implementação**](../../../../src/app/components/lookup-showcase)

*   **Módulo**: `LookupModule`
*   **Componente**: `LookupComponent`
*   **Seletor**: `s-lookup`

Este componente implementa a interface `ControlValueAccessor`, possibilitando sua utilização tanto em formulários do tipo template quanto em formulários reativos.

### Import

```typescript
import { NgModule } from "@angular/core";
import { LookupModule } from "@seniorsistemas/angular-components";
@NgModule({
    imports: [
        /* ... */
        LookupModule,
    ],
})
export class MyModule {
    /* ... */
}
```

### HTML

```html
<s-lookup name="lookup"
                formControlName="lookup"
                [multiple]="true"
                dataKey="id"
                [lookupSuggestions]="lookupSuggestions"
                [searchGridData]="searchGridData"
                [searchFields]="searchFields"
                [searchTotalRecords]="searchTotalRecords"
                (onLookupRequest)="onLookupRequest($event)"
                (onSearchRequest)="onSearchRequest($event)"
></s-lookup>
```

### Controlador do formulário

```typescript
import { Component } from "@angular/core";
import { FieldType, FormField } from "@seniorsistemas/angular-components";

@Component({
    templateUrl: "./my-form.html",
})
export class MyFormComponent {
    public lookupSuggestions = [];
    public searchGridData = [];
    public searchTotalRecords;

    public searchFields: [
        new FormField({
            name: "name",
            label: "Nome",
            type: FieldType.STRING,
        }),
        new FormField({
            name: "code",
            label: "Código",
            type: FieldType.STRING,
        })
    ];

    public onLookupRequest(event) {
        const { query } = event;
        // ** Lógica para resgatar os registros ** //
        let response;
        this.lookupSuggestions = response.data;
    }

    public onSearchRequest(event) {
        const { first, rows, filterData, multiSortMeta } = event;
        // ** Lógica para resgatar os registros ** //
        let response;
        this.searchGridData = response.data;
        this.searchTotalRecords = response.totalRecords;
    }
}
```

### Inputs

| Nome                    | Tipo          | Valor Padrão                   | Obrigatório | Descrição                                                                                   |
| :---------------------- | :------------ | :----------------------------- | :---------- | :------------------------------------------------------------------------------------------ |
| id                      | `string`      | `s-lookup-${nextId++}`         | Não         | Id que será prefixado a todos os elementos do componente                                    |
| dataKey                 | `string`      | `undefined`                    | Sim         | Atributo identificador para as entidades repassadas ao componente                           |
| disabled                | `boolean`     | `false`                        | Não         | Flag para determinar se o componente aparece desabilitado                                   |
| required                | `boolean`     | `false`                        | Não         | Flag com atributo html para o componente ficar obrigatório em formulários do tipo template  |
| multiple                | `boolean`     | `false`                        | Não         | Habilita multiseleção                                                                       |
| lookupSuggestions       | `any[]`       | `undefined`                    | Sim         | Array com as entidades sugeridas no auto-complete                                           |
| lookupDisplayField      | `string`      | `undefined`                    | Sim         | Atributo das entidades sugeridas/selecionadas que será exibido no auto-complete             |
| lookupEmptyMessage      | `string`      | `undefined`                    | Não         | Mensagem que será exibida nas sugestões do auto-complete quando não houver nenhum resultado |
| showSearch              | `boolean`     | `true`                         | Não         | Determina se será exibido o botão para abrir o modal de busca avançada                      |
| searchGridData          | `any[]`       | `undefined`                    | Sim         | Array com as entidades exibidas na grid de busca avançada                                   |
| searchTotalRecords      | `number`      | `undefined`                    | Sim         | Quantidade total de registros para gerar a paginação da grid de busca avançada              |
| searchFields            | `FormField[]` | `[]`                           | Não         | Array com campos que serão exibidos no filtro da busca avançada                             |
| searchGridFields        | `FormField[]` | `searchFields`                 | Não         | Array com campos que serão exibidos na grid da busca avançada                               |
| searchTitle             | `string`      | `"Pesquisa Avançada"`          | Não         | Título apresentado no cabeçalho do modal de busca avançada                                  |
| searchEmptyTitle        | `string`      | `"Nenhum registro encontrado"` | Não         | Título apresentado no empty-state do modal de busca avançada                                |
| searchEmptyDescription  | `string`      | `undefined`                    | Não         | Descrição apresentada no empty-state do modal de busca avançada                             |
| filterLabel             | `string`      | `"Filtrar"`                    | Não         | Label do botão de filtro do modal de busca avançada                                         |
| clearLabel              | `string`      | `"Limpar"`                     | Não         | Label do botão de limpar filtro do modal de busca avançada                                  |
| cancelLabel             | `string`      | `"Cancelar"`                   | Não         | Label do botão de cancelar do modal de busca avançada                                       |
| selectLabel             | `string`      | `"Selecionar"`                 | Não         | Label do botão de selecionar do modal de busca avançada                                     |
| searchTotalRecordsLabel | `string`      | `"X registro(s)"`              | Não         | Label do totalizador de registros do modal de busca avançada                                |

### Outputs

| Nome            | Tipo           | Retorno                          | Descrição                                              |
| :-------------- | :------------- | :------------------------------- | :----------------------------------------------------- |
| onLookupRequest | `EventEmitter` | Valor digitado                   | Evento disparado ao digitar no auto-complete           |
| onSearchRequest | `EventEmitter` | `{ ..., filterValues: FILTERS }` | Evento disparado ao filtrar no modal de busca avançada |
| onFocus         | `EventEmitter` | `$event`                         | Evento disparado ao focar no auto-complete             |
| onBlur          | `EventEmitter` | `$event`                         | Evento disparado ao perder o foco do auto-complete     |
| onKeyUp         | `EventEmitter` | `$event`                         | Evento disparado ao pressionar teclas no auto-complete |
| onClear         | `EventEmitter` | `$event`                         | Evento disparado ao limpar o auto-complete             |
| onSelect        | `EventEmitter` | Objeto selecionado               | Evento disparado ao selecionar um valor                |
| onUnselect      | `EventEmitter` | Objeto desselecionado            | Evento disparado ao desselecionar um valor             |
