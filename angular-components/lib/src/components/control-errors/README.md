# Control Errors

O objetivo deste módulo é prover um componente para exibição padronizada de mensagens de erro de validação para campos de formulário.

## Features

*   Mensagens de erro para campos de formulário

## Dependências

*   [PrimeNG](https://www.npmjs.com/package/primeng)

## Utilização

:star2: [**Exemplo completo de implementação**](../../../../src/app/components/control-errors-showcase)

*   **Módulo**: `ControlErrorsModule`
*   **Componente**: `ControlErrorsComponent`
*   **Seletor**: `s-control-errors`

### Import

```typescript
import { ControlErrorsModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        ControlErrorsModule,
    ],
})
export class MyModule {
    /* ... */
}
```

### Exemplo de utilização simples

```html
<form [formGroup]="formGroup" novalidate>
    <input type="number" id="classification" name="classification" pInputText formControlName="classification" autocomplete="off"/>
    <s-control-errors [control]="formGroup.controls['classification']" [errorMessages]="{
        required: 'Por favor, sua idade é muito importante para nós',
        min: 'Esse cadastro é apenas para maiores de idade',
        max: 'A medicina ainda não nos permite viver tanto!'
    }"></s-control-errors>
</form>
```

### Exemplo de utilização com tradução

```html
<form [formGroup]="formGroup" novalidate>
    <input type="number" id="classification" name="classification" pInputText formControlName="classification" autocomplete="off"/>
    <s-control-errors [control]="formGroup.controls['classification']" [errorMessages]="{
        required: ('error_required' | translate),
        min: ('error_min_value' | translate: {value: 0}),
        max: ('error_max_value' | translate: {value: 5})
    }"></s-control-errors>
</form>
```

### Inputs

| Nome          | Tipo          | Valor Padrão                   | Obrigatório | Descrição                                                               |
| :------------ | :------------ | :----------------------------- | :---------- | :---------------------------------------------------------------------- |
| id            | `string`      | `s-control-errors-${nextId++}` | Não         | Id do componente. Utilizado como prefixo para id dos elementos internos |
| control       | `FormControl` | N/A                            | Sim         | Controlador do qual se obterão os erros                                 |
| errorMessages | `object`      | `{}`                           | Sim         | Objeto com chave de erro e mensagem que deverá ser exibida              |
