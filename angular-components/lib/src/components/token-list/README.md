# Token List

O objetivo deste módulo é prover um componente para exibição padronizada de tokens.

## Features

*   Labels personalizados
*   Ação de seleção personalizada
*   Ação de remoção personalizada

## Dependências

*   [PrimeNG](https://www.npmjs.com/package/primeng)

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/token-list-showcase)

*   **Módulo**: `TokenListModule`
*   **Componente**: `TokenListComponent`
*   **Seletor**: `s-token-list`

### Import

```typescript
import { TokenListModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        TokenListModule,
    ],
})
export class MyModule {
    /* ... */
}
```

### Exemplo de utilização

```html
<s-token-list [tokens]="tokens" (tokenSelected)="select($event)" (tokenRemoved)="remove($event)" [removableTokens]="true"></s-token-list>
```

```typescript
import { Component, OnInit } from "@angular/core";
import { IToken } from "@seniorsistemas/angular-components";

@Component({
    templateUrl: "./my-component.html",
})
export class MyComponent implements OnInit {
    public tokens = IToken[];

    public ngOnInit() {
        this.tokens = [
            { id: "1", label: "Token 1" },
            { id: "2", label: "Token 2" },
            { id: "3", label: "Token 3" },
            { id: "4", label: "Token 4" },
            { id: "5", label: "Token 5" },
        ];
    }
}
```

### Inputs

| Nome            | Tipo       | Valor Padrão               | Obrigatório | Descrição                                                |
| :-------------- | :--------- | :------------------------- | :---------- | :------------------------------------------------------- |
| id              | `string`   | `s-token-list-${nextId++}` | Não         | Id que será prefixado a todos os elementos do componente |
| tokens          | `IToken[]` | `undefined`                | Sim         | Tokens que serão exibidos                                |
| removableTokens | `boolean`  | `false`                    | Não         | Define se os tokens possuirão o ícone de remoção (x)     |

### Outputs

| Nome          | Tipo           | Retorno  | Descrição                                                  |
| :------------ | :------------- | :------- | :--------------------------------------------------------- |
| tokenSelected | `EventEmitter` | `IToken` | Evento disparado ao selecionar um token                    |
| tokenRemoved  | `EventEmitter` | `IToken` | Evento disparado ao clicar no ícone de remoção de um token |
