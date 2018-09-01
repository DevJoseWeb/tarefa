# Loader

O objetivo deste módulo é prover um componente e uma diretiva para exibir o estado de carregamento de componentes/páginas.

## Features

*   Animação de loading
*   Bloqueio de interface
*   Tratamento automático de sobreposição de múltiplos loading states

## Dependências

*   [primeng](https://www.npmjs.com/package/primeng)
*   [@seniorsistemas/primeng-theme](https://www.npmjs.com/package/@seniorsistemas/primeng-theme)

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/loading-state-showcase)

*   **Módulo**: `LoadingStateModule`
*   **Componente**: `LoadingStateComponent`
*   **Seletor do Componente**: `s-loading-state`
*   **Diretiva**: `LoadingStateDirective`
*   **Seletor da Diretiva**: `*sLoadingState`

### Import

```typescript
import { LoadingStateModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        LoadingStateModule,
    ],
})
export class MyModule {
    /* ... */
}
```

## Exemplo de utilização

### Diretiva

Pode ser utilizada para bloquear qualquer elemento.

```html
<div *sLoadingState="isLoading">
    /* ... */
</div>
```

**Atenção:** Por ser uma diretiva estrutural, _template references_ (#) não funcionarão quando apontarem elementos envolvidas por ela. Nesses casos, utilize o componente.

### Componente

Pode ser utilizada para bloquear qualquer elemento, opcionalmente bloqueando a tela inteira.

```html
<s-loading-state [loading]="isLoading" [blockWindow]="true">
    <div>
        /* ... */
    </div>
</s-loading-state>
```

### Inputs

| Nome        | Tipo      | Valor Padrão                  | Obrigatório | Descrição                                                               |
| :---------- | :-------- | :---------------------------- | :---------- | :---------------------------------------------------------------------- |
| id          | `string`  | `s-loading-state-${nextId++}` | Não         | Id do componente. Utilizado como prefixo para id dos elementos internos |
| loading     | `boolean` | `false`                       | Sim         | Indica de o conteúdo envolto pelo componente está carregando            |
| blockWindow | `boolean` | `false`                       | Não         | Indica se o overlay de carregamento ocupará a janela inteira            |
