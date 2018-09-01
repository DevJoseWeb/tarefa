# Empty State

O objetivo deste módulo é prover um componente para exibição padronizada de mensagens de estado vazio.

## Features

*   Ícone customizável
*   Labels customizáveis

## Dependências

*   [PrimeNG](https://www.npmjs.com/package/primeng)

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/empty-state-showcase)

*   **Módulo**: `EmptyStateModule`
*   **Componente**: `EmptyStateComponent`
*   **Seletor**: `s-empty-state`

### Import

```typescript
import { EmptyStateModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        EmptyStateModule,
    ],
})
export class MyModule {
    /* ... */
}
```

### Exemplo de utilização simples

```html
<s-empty-state id="my-empty-state" *ngIf="!myList.length" iconClass="fa fa-inbox" title="Nenhum registro encontrado" [showPrimaryAction]="permissions.incluir"  
    primaryActionLabel="Adicionar" secondaryActionLabel="Cancelar" (primaryAction)="insertData()" (secondaryAction)="cancel()"
    description="Nenhum cadastro foi encontrado. Clique no botão abaixo para adicionar um novo registro">
</s-empty-state>
```

### Exemplo de utilização com tradução

```html
<s-empty-state id="my-empty-state" *ngIf="!myList.length" [title]="'title' | translate" [primaryActionLabel]="'add' | translate"
        (primaryAction)="insertData()" [description]="'list_empty_state' | translate">
</s-empty-state>
```

### Inputs

| Nome                 | Tipo      | Valor Padrão    | Obrigatório | Descrição                                                                                                  |
| :------------------- | :-------- | :-------------- | :---------- | :--------------------------------------------------------------------------------------------------------- |
| id                   | `string`  | `"empty-state"` | Sim         | Id do componente. Utilizado como prefixo para id dos elementos internos.                                   |
| title                | `string`  | N/A             | Sim         | Título do componente                                                                                       |
| description          | `string`  | N/A             | Não         | Descrição para o estado vazio                                                                              |
| iconClass            | `string`  | `"fa fa-inbox"` | Não         | Ícone que será exibido acima do título                                                                     |
| showPrimaryAction    | `boolean` | `true`          | Não         | Define se o botão de ação primária será exibido. Necessário fornecer o atributo `primaryActionLabel`       |
| showSecondaryAction  | `boolean` | `true`          | Não         | Define se o botão de ação primária será exibido. Necessário fornecer o atributo `secondaryActionLabel`\*\* |
| primaryActionLabel   | `string`  | N/A             | Não         | Label que será exibido no botão de ação primária                                                           |
| secondaryActionLabel | `string`  | N/A             | Não         | Label que será exibido no botão de ação secundária                                                         |

\*\* O botão de ação secundária nunca será exibido sem o botão de ação primária.

### Outputs

| Nome            | Tipo           | Retorno | Descrição                                              |
| :-------------- | :------------- | :------ | :----------------------------------------------------- |
| primaryAction   | `EventEmitter` | N/A     | Evento disparado ao clicar no botão de ação primária   |
| secondaryAction | `EventEmitter` | N/A     | Evento disparado ao clicar no botão de ação secundária |
