# Http Interceptor

Quando importado no projeto, esse módulo faz com que, por padrão, todas as requisições que não contenham "://" sejam prefixadas com o endereço da bridge e possuam o header de autenticação com o token do usuário logado.

## Dependências

* [RxJS](https://www.npmjs.com/package/rxjs)
* [Senior Platform Data](https://www.npmjs.com/package/@seniorsistemas/senior-platform-data)

## Utilização

Para que as requisições sejam modificadas, basta apenas importar o módulo.

```typescript
import { HttpInterceptorModule } from "@seniorsistemas/angular-components";

@NgModule({
    imports: [
        /* ... */
        HttpInterceptorModule,
    ],
})
export class MyModule {
    /* ... */
}
```

### Exemplo 1:

```typescript
import { HttpParams, HttpClient } from "@angular/common/http";

import { Employee } from "../employee";

@Injectable()
export class MyService {
    constructor(private http: HttpClient) {}

    public get(id: string) {
        return this.http.get<Employee>(`generator/telas/entities/company/${id}`);
    }
}
```

**URL Original** : `generator/telas/entities/company/`  
**URL Final** : `https://arq.senior.com.br:8243/t/senior.com.br/platform/1.0/rest/generator/telas/entities/company/`  

**Header Original** : `{ }`  
**Header Final** : `{ Authorization: "Bearer af1d255d8f5fb5a2625ecf4ead09c8f4" }`

### Exemplo 2:

```typescript
import { HttpParams, HttpClient } from "@angular/common/http";

@Injectable()
export class MyOtherService {
    constructor(private http: HttpClient) {}

    public getMyIp() {
        return this.http.get<any>(`https://httpbin.org/ip`);
    }
}
```

**URL Original** : `https://httpbin.org/ip`  
**URL Final** : `https://httpbin.org/ip`  

**Header Original** : `{ }`  
**Header Final** : `{ }`