# Breadcrumb

O objetivo deste módulo é prover um componente para exibição padronizada de títulos de rota e breadcrumb de navegação.

## Features

*   Personalização de título por rota
*   Construção automática com base nas rotas

## Dependências

*   [PrimeNG](https://www.npmjs.com/package/primeng)
*   [font-awesome](https://fontawesome.com/v4.7.0/)

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/breadcrumb-showcase)

*   **Módulo**: `BreadcrumbModule`
*   **Componente**: `BreadcrumbComponent`
*   **Seletor**: `s-breadcrumb`

### Import

```typescript
import { BreadcrumbModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        BreadcrumbModule,
    ],
})
export class MyModule {
    /* ... */
}
```

### Exemplo de utilização

```html
<s-breadcrumb></s-breadcrumb>
```

```html
<s-breadcrumb homeUrl="http://google.com"></s-breadcrumb>
```

### Configuração de rotas

O título que será exibido para a rota é definido através do parâmetro `routeTitle`. Esse valor pode ser passado diretamente no parâmetro `data` ou dentro do parâmetro `resolve` caso o título seja internacionalizável, por exemplo.

__Para que o breadcrumb seja exibido para a rota, é necessário que a mesma possua um `path` e um `component`. Caso uma rota atenda a esses requisitos e não possua um título, será lançado um erro.__

```typescript
const routes: Routes = [
    {
        path: "my-first-route",
        component: MyComponent,
        data: {
            routeTitle: "Rota Principal",
        },
        children: [
            {
                path: "my-second-route",
                component: MySecondComponent,
                data: {
                    routeTitle: "Rota Filha",
                },
            },
        ],
    },
];
```

### Inputs

| Nome    | Tipo     | Valor Padrão | Obrigatório | Descrição                                           |
| :------ | :------- | :----------- | :---------- | :-------------------------------------------------- |
| homeUrl | `string` | `undefined`  | Não         | Url que deve ser exibida como _home_ no breadcrumb. |