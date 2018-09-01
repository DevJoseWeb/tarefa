# Sidebar

O objetivo deste módulo é prover um componente para exibição de um sidebar.

## Features

*   Responsivo
*   Scroll automático do conteúdo

## Dependências

*   [primeng](https://www.npmjs.com/package/primeng)
*   [@seniorsistemas/primeng-theme](https://www.npmjs.com/package/@seniorsistemas/primeng-theme)

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/sidebar-showcase)

*   **Módulo**: `SidebarModule`
*   **Componente**: `SidebarComponent`
*   **Seletor do Componente**: `s-sidebar`

### Import

```typescript
import { SidebarModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        SidebarModule,
    ],
})
export class MyModule {
    /* ... */
}
```

## Exemplo de utilização

```html
<s-sidebar [(visible)]="visible" header="Título">

    Conteúdo do Sidebar

    <s-footer>
        <s-button label="Fechar" (onClick)="visible = false"></s-button>
    </s-footer>
</s-sidebar>
```

### Inputs

| Nome        | Tipo      | Valor Padrão            | Obrigatório | Descrição                                                                                                   |
| :---------- | :-------- | :---------------------- | :---------- | :---------------------------------------------------------------------------------------------------------- |
| id          | `string`  | `s-sidebar-${nextId++}` | Não         | Id do componente. Utilizado como prefixo para id dos elementos internos                                     |
| header      | `string`  | N/A                     | Não         | Título do sidebar. Para headers customizados, pode-se utilizar o elemento `s-header` no corpo do componente |
| visible     | `boolean` | `false`                 | Não         | Determina se o sidebar está visível                                                                         |
| blockScroll | `boolean` | `false`                 | Não         | Determina se o sidebar bloqueará o scroll da página                                                         |