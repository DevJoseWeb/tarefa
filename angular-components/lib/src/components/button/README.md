# Button

O objetivo deste módulo é prover um componente para exibir um menu de ações para o usuário.

## Features

*   Ícone customizável
*   Label customizável
*   Ações customizáveis

## Dependências

*   [primeng](https://www.npmjs.com/package/primeng)
*   [@seniorsistemas/primeng-theme](https://www.npmjs.com/package/@seniorsistemas/primeng-theme)
*   [font-awesome](https://fontawesome.com/v4.7.0/)

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/button-showcase)

*   **Módulo**: `ButtonModule`
*   **Componente**: `ButtonComponent`
*   **Seletor**: `s-button`

### Import

```typescript
import { ButtonModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        ButtonModule,
    ],
})
export class MyModule {
    /* ... */
}
```

## Exemplo de utilização

### HTML

```html
// Botão normal primário
<s-button id="my-button" [label]="'add' | translate" (click)="add()"></s-button>

// Botão normal secundário
<s-button id="my-button" priority="secondary" [label]="'edit' | translate" (click)="edit()"></s-button>

// Botão de Ações padrão
<s-button id="my-button" priority="default" [label]="'actions' | translate" [model]="getActions(DATA)" [auxiliary]="true"></s-button>

// Botão de Ações primário
<s-button id="my-button" [label]="'actions' | translate" [model]="getActions(DATA)" [auxiliary]="true"></s-button>

// Botão com ícone
<s-button id="my-button" priority="default" iconClass="fa fa-fw fa-fh" [label]="'analytics' | translate" [model]="getActions(DATA)" [auxiliary]="true"></s-button>

// Botão de ações de header de painel
<s-button id="my-button" priority="default" size="small" [label]="'actions' | translate" [model]="getActions(DATA)" [auxiliary]="true"></s-button>
```

### Controlador

```typescript
import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
    templateUrl: "./my-component.html",
})
export class MyComponent {
    
    public getActions(rowData: any): MenuItem[] {
        return [
            {
                id: "edit",
                label: "Editar",
                command: () => {
                    /* ... */
                },
            },
            { separator: true },
            {
                id: "delete",
                label: "Deletar",
                command: () => {
                    /* ... */
                },
            },
        ];
    }

}
```

### Inputs

| Nome       | Tipo             | Valor Padrão             | Obrigatório | Descrição                                                               |
| :--------- | :--------------- | :----------------------- | :---------- | :---------------------------------------------------------------------- |
| id         | `string`         | `s-button-${nextId++}`   | Não         | Id do componente. Utilizado como prefixo para id dos elementos internos |
| label      | `string`         | N/A                      | Não         | Label do botão                                                          |
| tooltip    | `string`         | `label`                  | Não         | Tooltip do botão                                                        |
| iconClass  | `string`         | N/A                      | Não         | Ícone que será exibido à esquerda do label                              |
| styleClass | `string`         | N/A                      | Não         | Classes que o botão possuirá                                            |
| model      | `MenuItem[]`     | N/A                      | Não         | Itens que serão exibidos no menu do botão (MenuAPI do PrimeNG)          |
| disabled   | `boolean`        | `false`                  | Não         | Define se o botão está desabilitado                                     |
| type       | `string`         | `button`                 | Não         | Tipo do botão (`button` ou `submit`)                                    |
| auxiliary  | `boolean`        | `false`                  | Não         | Define se o botão aparecerá como um auxiliar (bordas arredondadas)      |
| priority   | `ButtonPriority` | `ButtonPriority.Primary` | Não         | Prioridade do botão (`primary`, `secondary`, `default` ou `link`)       |
| size       | `ButtonSize`     | `ButtonSize.Default`     | Não         | Tamanho do botão (`default` ou `small`)                                 |
