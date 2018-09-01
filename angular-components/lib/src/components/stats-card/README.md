# Stats Card

O objetivo deste módulo é prover um componente para exibição de totalizadores/estatísticas.

## Features

*   Responsivo
*   Animação automática de contagem nos números
*   Parametrização de ícone e cor

## Dependências

*   [primeng](https://www.npmjs.com/package/primeng)
*   [@seniorsistemas/primeng-theme](https://www.npmjs.com/package/@seniorsistemas/primeng-theme)

**Atenção:** Para que o componente funcione corretamente no IE10, é necessário que o projeto possua o polyfill do ES7 para strings

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/stats-card-showcase)

*   **Módulo**: `StatsCardModule`
*   **Componente**: `StatsCardComponent`
*   **Seletor do Componente**: `s-stats-card`

### Import

```typescript
import { StatsCardModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        StatsCardModule,
    ],
})
export class MyModule {
    /* ... */
}
```

## Exemplo de utilização

```html
    // Normal (variação "light")
    <s-stats-card color="#6DA300" iconClass="fa fa-dollar" label="Massa salarial" value="R$ 15.120.000,50"></s-stats-card>

    // Colorido (variação "color")
    <s-stats-card color="#063951" [lightMode]="false" iconClass="fa fa-bar-chart" label="Índice de atraso geral (IAG)" value="7.89%"></s-stats-card>
```

### Inputs

| Nome      | Tipo      | Valor Padrão               | Obrigatório | Descrição                                                               |
| :-------- | :-------- | :------------------------- | :---------- | :---------------------------------------------------------------------- |
| id        | `string`  | `s-stats-card-${nextId++}` | Não         | Id do componente. Utilizado como prefixo para id dos elementos internos |
| label     | `string`  | N/A                        | Sim         | Label do stats card                                                     |
| color     | `string`  | `#339966`                  | Não         | Cor principal do stats card                                             |
| iconClass | `string`  | `fa fa-bar-chart`          | Não         | Ícone do stats card                                                     |
| lightMode | `boolean` | `true`                     | Não         | Define se o stats card terá fundo branco                                |
