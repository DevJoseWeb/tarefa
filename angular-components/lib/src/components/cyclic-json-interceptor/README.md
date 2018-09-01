# Cyclic Json Interceptor

Quando importado no projeto, esse módulo faz com que, por padrão, todas as requisições e respostas que contenham objetos JSON com referências cíclicas sejam modificados para compatibilidade com os serviços Senior.

## Dependências

*   [RxJS](https://www.npmjs.com/package/rxjs)
*   [Senior Platform Data](https://www.npmjs.com/package/@seniorsistemas/senior-platform-data)

## Utilização

Para que as requisições sejam modificadas, basta apenas importar o módulo.

```typescript
import { CyclicJsonInterceptorModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        CyclicJsonInterceptorModule,
    ],
})
export class MyModule {
    /* ... */
}
```
