# Steps

O objetivo deste módulo é prover um componente para exibição e navegação entre etapas.

## Features

*   Responsivo
*   Animação de progresso

## Dependências

*   [primeng](https://www.npmjs.com/package/primeng)
*   [@seniorsistemas/primeng-theme](https://www.npmjs.com/package/@seniorsistemas/primeng-theme)
*   [font-awesome](https://fontawesome.com/v4.7.0/)

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/steps-showcase)

*   **Módulo**: `StepsModule`
*   **Componente**: `StepsComponent`
*   **Seletor do Componente**: `s-steps`

### Import

```typescript
import { StepsModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        StepsModule,
    ],
})
export class MyModule {
    /* ... */
}
```

## Exemplo de utilização

```html
    <s-steps [steps]="steps" [activeIndex]="activeIndex" (stepSelected)="stepSelected($event)"></s-steps>
```

```typescript
import { Component } from "@angular/core";
import { Step, StepState, StepSelectionEvent } from "@seniorsistemas/angular-components";

@Component({
    templateUrl: "./my-component.html",
})
export class MyComponent {
    public activeIndex = 3;

    public steps: Step[] = [
        {
            id: "1",
            label: "Step 1",
            description: "Descrição detalhada do Step 1",
            disabled: false,
            state: StepState.Success,
        },
        {
            id: "2",
            label: "Step 2",
            description: "Descrição detalhada do Step 2",
            disabled: false,
            state: StepState.Warning,
        },
        {
            id: "3",
            label: "Step 3",
            description: "Descrição detalhada do Step 3",
            disabled: false,
        },
        {
            id: "4",
            label: "Step 4",
            description: "Descrição detalhada do Step 4",
            disabled: true,
        },
        {
            id: "5",
            label: "Step 5",
            description: "Descrição detalhada do Step 5",
            disabled: true,
        },
    ];

    public stepSelected(event: StepSelectionEvent) {
        this.activeIndex = event.index;
    }
}
```

### Inputs

| Nome        | Tipo     | Valor Padrão          | Obrigatório | Descrição                                                               |
| :---------- | :------- | :-------------------- | :---------- | :---------------------------------------------------------------------- |
| id          | `string` | `s-steps-${nextId++}` | Não         | Id do componente. Utilizado como prefixo para id dos elementos internos |
| steps       | `Step[]` | N/A                   | Sim         | Steps para exibição                                                     |
| activeIndex | `number` | `0`                   | Sim         | Index do step ativo                                                     |

### Outputs

| Nome         | Tipo                 | Descrição                                         |
| :----------- | :------------------- | :------------------------------------------------ |
| stepSelected | `StepSelectionEvent` | Evento disparado ao selecionar um step habilitado |

### Step

| Nome        | Tipo        | Valor Padrão        | Obrigatório | Descrição                                            |
| :---------- | :---------- | :------------------ | :---------- | :--------------------------------------------------- |
| id          | `string`    | N/A                 | Não         | Id do step                                           |
| label       | `string`    | N/A                 | Sim         | Label do step                                        |
| description | `string`    | N/A                 | Não         | Descrição do step                                    |
| state       | `StepState` | `StepState.Default` | Não         | Estado do step (`default`, `success` ou `warning`)   |
| disabled    | `boolean`   | `false`             | Não         | Determina se o step está desabilitado (não clicável) |
