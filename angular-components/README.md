# Senior Components

Projeto onde se encontram os componentes Senior para o framework Angular. Criado com o [Angular CLI](https://github.com/angular/angular-cli).

Ao clonar o projeto, execute `npm install` para instalar as dependências do mesmo.

# Utilização

Disponibilizado como um pacote npm, para utilizar a biblioteca no seu projeto é necessário apenas executar `npm install --save @seniorsistemas/angular-components`.

## Development server

Execute `npm start -- --host <nome do computador (ex.: pcbnu00010107.interno.senior.com.br)>` para executar o showcase dos componentes. O app recarregará automaticamente a cada atualização efetuada no código.

## Criação de componentes

Novos componentes devem ser criados com a respectiva documentação na pasta [components](lib/src/components/) e demonstração na pasta [showcase](src/app/). Para novos componentes, execute os passos:

*   Execute `ng generate module components/<nome do componente>`
*   Execute `ng generate component components/<nome do componente>`
*   Modifique os arquivos criados conforme o necessário
*   Crie o showcase de demonstração do componente
*   Adicione os exports necessários no arquivo [public_api.ts](public_api.ts)
*   Modifique o arquivo CHANGELOG.md com as alterações feitas
*   Crie o MR com todas essas modificações
