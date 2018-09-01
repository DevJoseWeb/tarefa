# tcr-baixa-frontend

Projeto de frontend para o serviço erp_fin/tcr_baixa. Gerado através do senior-frontend-generator 9.0.0.

Ao clonar o projeto, execute o comando `npm install` para instalar as dependências do mesmo.

## Ambiente de desenvolvimento

Execute `npm start` para executar o projeto em modo de desenvolvimento. O app abrirá a tela inicial em uma nova aba no navegador, tendo como host o nome da máquina, e recarregará automaticamente a cada atualização efetuada no código.

Para que o frontend saiba resolver automaticamente o endereço da bridge, é necessário estar logado na plataforma.

### Ignorando permissões

Consulte: [Desabilitando a verificação de permissões](http://git.senior.com.br/arquitetura/frontend-generator/wikis/projeto-gerado/desenvolvendo-no-projeto-gerado#desabilitando-a-verifica%C3%A7%C3%A3o-de-permiss%C3%B5es).

### Backend local

Consulte: [Utilizando um endereço de backend customizado](http://git.senior.com.br/arquitetura/frontend-generator/wikis/projeto-gerado/desenvolvendo-no-projeto-gerado#utilizando-um-endere%C3%A7o-de-backend-customizado).

## Produção

Para construir os arquivos que serão disponibilizados para produção, deve-se executar o comando `npm run build`. Os arquivos serão compilados, minificados e gerados dentro da pasta `/dist`.
