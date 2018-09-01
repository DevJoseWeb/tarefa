# 8.1.0

[17/08/2018]

### Novas funcionalidades

-   [DSN-605](http://jira.senior.com.br/browse/DSN-605) - Criado componente Sidebar

### Correções

-   [DSN-639](http://jira.senior.com.br/browse/DSN-639) - Corrigido tooltip indevido nos campos do Dynamic Form

### Alteração de dependências

-   **@seniorsistemas/primeng-theme**: 4.0.0 > 4.1.0

# 8.0.0

[10/08/2018]

### Melhorias

-   [DSN-603](http://jira.senior.com.br/browse/DSN-603) - Lookup passa a ter tamanhos pré-definidos conforme resolução, para solucionar problemas de posicionamento e tamanho

### Alteração de dependências

-   **primeng**: 5.2.5 > 6.1.2
-   **@seniorsistemas/primeng-theme**: 3.1.0 > 4.0.0
-   @seniorsistemas/senior-platform-data: 2.0.1 > 2.0.2,
-   @angular/\*: 6.0.3 > 6.1.2
-   core-js: 2.5.3 > 2.5.7
-   moment: 2.21.0 > 2.22.2
-   ng2-currency-mask: 5.0.0 > 5.3.1
-   rxjs: 6.2.0 > 6.2.2
-   rxjs-compat: 6.2.0 > 6.2.2
-   zone.js: 0.8.20 > 0.8.26

### Quebras de compatibilidade

-   Deixa de ser compatível com versões anteriores à 6.1.0 do PrimeNG

# 7.3.2

[03/08/2018]

### Correções

-   [DSN-595](http://jira.senior.com.br/browse/DSN-595) - Corrigido erro ao utilizar o componente Button no Firefox

# 7.3.1

[31/07/2018]

### Correções

-   Corrigido casos em que o overlay do componente Loading State impossibilitava a interação com elementos internos

# 7.3.0

[30/07/2018]

### Novas funcionalidades

-   [DSN-558](http://jira.senior.com.br/browse/DSN-558) - Criado componente Steps
-   [DSN-559](http://jira.senior.com.br/browse/DSN-559) - Criado showcase para o componente Steps
-   Adicionado output `onClick` para o componente Button, porque o binding no `click` não considera o estado desabilitado

### Correções

-   [DSN-277](http://jira.senior.com.br/browse/DSN-277) - Corrigido bug em que o Lookup multiseleção ultrapassava seu tamanho máximo em resoluções menores
-   Corrigido bug em que o `homeUrl` do Breadcrumb ficava desabilitado quando só havia uma rota

# 7.2.0

[24/07/2018]

### Novas funcionalidades

-   [DSN-554](http://jira.senior.com.br/browse/DSN-554) - Criado componente Stats Card
-   [DSN-553](http://jira.senior.com.br/browse/DSN-553) - Criado showcase para o componente Stats Card

### Melhorias

-   `LocaleModule.forRoot()` passa a prover os pipes para injection

### Correções

-   Corrigido tamanho do botão de pesquisa do Lookup no IE

# 7.1.0

[20/07/2018]

### Novas funcionalidades

-   Adicionada prop `dataKey` ao `AutocompleteField` do componente Dynamic Form
-   Adicionada prop `multiple` ao `AutocompleteField` do Dynamic Form
-   Adicionada prop `size` ao `Field` do Dynamic Form

### Melhorias

-   [DSN-552](http://jira.senior.com.br/browse/DSN-552) - Refatorado o componente Button, deixando de utilizar o componente do PrimeNG, para melhor responsividade
-   Tooltip dos campos no componente Dynamic Form passam a aparecer na posição superior por padrão
-   Ajustado layout do componente Button quando vazio ou com dois ícones simultâneos
-   Adicionado exemplo de tabelas aninhadas no showcase da Table
-   Adicionado totalizador de registros no showcase da Table

### Alteração de dependências

-   **@seniorsistemas/primeng-theme**: 3.0.2 > 3.1.0

# 7.0.0

[18/07/2018]

### Novas funcionalidades

-   [DSN-366](http://jira.senior.com.br/browse/DSN-366) - Criado o componente e a diretiva Loading State
-   Adicionada propriedade `tooltip` no componente Button

### Melhorias

-   [DSN-376](http://jira.senior.com.br/browse/DSN-376) - Passam a ser gerados ID's únicos sequenciais para os componentes Button, Control Errors, Empty State, Lookup e Token List
-   Adicionados caso de uso de tooltip nas colunas no showcase da Table
-   Ajustado estilo dos botões do componente Lookup
-   Ajustado campo Autocomplete do componente Dynamic Form para sempre mostrar o botão para abrir o dropdown
-   Adicionados os exports para os inputs do Dynamic Form

### Quebras de compatibilidade

-   [DSN-376](http://jira.senior.com.br/browse/DSN-376) - ID's dos componentes Button, Control Errors, Empty State, Lookup e Token List passam a ter um valor padrão diferente (consulte a documentação de cada componente)

### Alteração de dependências

-   **@seniorsistemas/primeng-theme**: 2.0.2 > 3.0.2

# 6.6.0

[06/07/2018]

### Novas funcionalidades

-   Adicionada flag `showSearch` no componente Lookup, permitindo que o mesmo seja exibido sem o botão de busca avançada

### Melhorias

-   Adicionados mais casos de uso no showcase da Table editável
-   Adicionados mais casos de uso no showcase do Lookup

### Correções

-   [DSN-278](http://jira.senior.com.br/browse/DSN-278) - Corrigido quebra de layout no componente Lookup de seleção múltipla
-   Corrigido formato do ano no componente Calendar no locale es-ES

### Alteração de dependências

-   **@seniorsistemas/primeng-theme**: 2.0.1 > 2.0.2

# 6.5.0

[04/07/2018]

### Novas funcionalidades

-   Adicionada possibilidade de inserir conteúdo customizado dentro do componente Button

### Melhorias

-   Diminuído o tamanho do Botão quando seu conteúdo for apenas ícone e não houver menu

### Correções

-   Correções diversas na aparência do componente Button

# 6.4.0

[03/07/2018]

### Novas funcionalidades

-   Incluída variação pequena do componente Button

### Correções

-   Correções diversas na aparência do componente Button

# 6.3.0

[02/07/2018]

### Novas funcionalidades

-   [DSN-314](http://jira.senior.com.br/browse/DSN-312) - Criado componente Button
-   Adicionado showcase para os componentes Tab e Table/List

### Alteração de dependências

-   **@seniorsistemas/primeng-theme**: 1.6.0 > 2.0.1

# 6.2.0

[21/06/2018]

### Novas funcionalidades

-   Adicionado suporte ao locale "es-ES"

### Melhorias

-   Adicionado prefixo `fa` em todos os ícones em preparação para a versão 6.0.0 do PrimeNG

# 6.1.0

[18/06/2018]

### Novas funcionalidades

-   [ARQPDT-608](http://jira.senior.com.br/browse/ARQPDT-608) - Adicionado campo do tipo `Autocomplete` ao componente Dynamic Form

### Melhorias

-   Criação de novas classes para cada um dos tipos de field utilizados no Dynamic Form

### Correções

-   Corrigido bug em que o componente Lookup não conseguia exibir colunas booleanas na grid da pesquisa avançada

# 6.0.0

[13/06/2018]

### Melhorias

-   LocaleModule passa a ter configuração para módulo principal (`.forRoot()`) e para módulos filhos (`.forChild()`), garantindo que apenas uma instância do serviço seja criada em aplicações com módulos _lazy loaded_

### Correções

-   LocaleService deixa de ser provido em `root` para manter a retrocompatibilidade com projetos Angular 5.x.x

### Quebras de compatibilidade

-   LocaleModule passa a ser importado através dos métodos `.forRoot()` e `.forChild()`. O import da forma anterior é equivalente ao `.forChild()` e não provê o serviço, apenas exporta os pipes de localização

# 5.1.0

[12/06/2018]

### Novas funcionalidades

-   [ARQPDT-659](http://jira.senior.com.br/browse/ARQPDT-659) - Criado novo interceptador CyclicJsonInterceptor para transformar automaticamente requisições e respostas contendo JSONs com referências cíclicas
-   Componente Breadcrumb passa a ter o input `homeUrl`, permitindo a customização do endereço da _home_

### Melhorias

-   Componente Breadcrumb não precisa mais ser colocado em todas as rotas, apenas no container da aplicação, obtendo automaticamente a lista de rotas ativas
-   LocaleService passa a ser provido em `root`
-   Ajustados imports da biblioteca RxJS

### Alteração de dependências

-   json-cycle: 1.3.0

# 5.0.0

[05/06/2018]

### Correções

-   [ARQPDT-650](http://jira.senior.com.br/browse/ARQPDT-650) - Corrigido caso em que o componente Lookup abria seu modal com um valor selecionado anteriormente apesar de não possuir nenhum

### Alteração de dependências

-   **@seniorsistemas/senior-platform-data**: 2.0.1 > 2.0.2

### Quebras de compatibilidade

-   Campos, pipes e demais configurações monetárias passam a ter 2 casas decimais por padrão ao invés de 3

# 4.0.1

[30/05/2018]

### Alteração de dependências

-   **@seniorsistemas/senior-platform-data**: 2.0.0 > 2.0.1

# 4.0.0

[30/05/2018]

### Alteração de dependências

-   **@angular/\***: 5.2.8 > 6.0.3
-   **@seniorsistemas/primeng-theme**: 1.5.0 > 1.6.0
-   **@seniorsistemas/senior-platform-data**: 1.1.3 > 2.0.0
-   **rxjs**: 5.5.10 > 6.2.0
-   **rxjs-compat**: 6.2.0
-   @angular/cli: 1.7.4 > 6.0.7
-   typescript: 2.5.3 > 2.7.2
-   ng-packagr: 3.0.0-rc.3 > 3.0.0

### Quebras de compatibilidade

-   [ARQPDT-493](http://jira.senior.com.br/browse/ARQPDT-493) - Atualizada a versão do Angular utilizada

# 3.3.0

[23/05/2018]

### Melhorias

-   [ARQPDT-357](http://jira.senior.com.br/browse/ARQPDT-357) - Componente Lookup passa a exibir totalizador de registros conforme SDS
-   Adicionada opção de limpar formulário no showcase do componente Lookup
-   Alterado favicon do projeto
-   Alterado tsconfig do projeto para não permitir `any` implícito

### Correções

-   Corrigida impossibilidade de reabilitar o componente Custom Fields
-   Corrigido placeholder dos enums no componente Dynamic Form

# 3.2.0

[07/05/2018]

### Melhorias

-   Automatização das liberações do projeto
-   Padronização do changelog
-   Removidas classes desnecessárias `.ui-fluid` e `.container` do autocomplete do componente Lookup

### Correções

-   [ARQPDT-487](http://jira.senior.com.br/browse/ARQPDT-487) - Corrigido erro de importação `undefined` nos módulos dos componentes quando a biblioteca era utilizada com AOT

### Alteração de dependências

-   ng-packagr: 2.4.2 > 3.0.0-rc.3

# 3.1.0

[03/05/2018]

### Novas funcionalidades

-   Adicionada propriedade `disabled` no componente Lookup
-   Adicionada propriedade `lookupEmptyMessage` no componente Lookup

### Correções

-   [ARQPDT-479](http://jira.senior.com.br/browse/ARQPDT-479) - Componente Lookup deixa de ficar dirty em momentos indevidos

# 3.0.1

[02/05/2018]

### Melhorias

-   Adicionados mais exemplos no showcase do componente Lookup

### Correções

-   [ARQPDT-479](http://jira.senior.com.br/browse/ARQPDT-479) - Componente Lookup deixa de vir dirty por padrão em formulários template

### Alteração de dependências

-   primeng: 5.2.4 > 5.2.5

# 3.0.0

[26/04/2018]

### Melhorias

-   [ARQPDT-465](http://jira.senior.com.br/browse/ARQPDT-465) - @seniorsistemas/primeng-theme passa a ser uma peerDependency
-   Adicionada documentação para tipo Enum no componente Dynamic Form

### Correções

-   [ARQPDT-488](http://jira.senior.com.br/browse/ARQPDT-488) - Dependências passam a ser corretamente listadas como peerDependencies
-   Arquivo `metadata.json` para AOT passa a ser gerado corretamente

### Alteração de dependências

-   @seniorsistemas/primeng-theme: 1.4.1 > 1.5.0

### Quebras de compatibilidade

-   Como todas as dependências passam a ser peerDependencies, a responsabilidade de instalação dessas dependências passa a ser do projeto que importa a biblioteca

# 2.0.4

[20/04/2018]

### Melhorias

-   Componente Lookup passa a ser exibido 30px abaixo do topo do `body`, conforme SDS

### Correções

-   [ARQPDT-468](http://jira.senior.com.br/browse/ARQPDT-468) - Corrigido erro em que o modal do componente Lookup ficava mudando de posição conforme seu tamanho era recalculado

# 2.0.3

[19/08/2018]

### Melhorias

-   Componente Lookup não exibe mais botões de filtro caso não hajam campos no filtro

# 2.0.2

[18/04/2018]

### Melhorias

-   [ARQPDT-464](http://jira.senior.com.br/browse/ARQPDT-464) - Componente Breadcrumb para de exibir rotas sem componente (o que poderia causar a navegação para uma rota que não exibe nada)

### Alteração de dependências

-   primeng: 5.2.3 > 5.2.4
-   Senior Theme: 1.3.7 > 1.4.1

# 2.0.1

[09/04/2018]

### Melhorias

-   Componente Dynamic Form passa a mostrar segundos nos campos DateTime, para ficar igual à SDL
-   Ajustado exemplo na documentação do componente ControlErrors

# 2.0.0

[06/04/2018]

### Novas funcionalidades

-   Criado componente TokenList

### Melhorias

-   Dynamic Form passa a mostrar campo de texto para tipo binário, evitando que apareça somente o label do campo em tela
-   Removidos imports não utilizados

### Quebras de compatibilidade

-   Removido do HttpInterceptor a responsabilidade de mostrar mensagens de erro

### Alteração de dependências

-   Senior Theme: 1.3.5 > 1.3.7
-   @seniorsistemas/senior-platform-data: 1.0.2 > 1.1.3

# 1.5.1

[03/04/2018]

### Correções

-   Corrigido bug em que o componente Lookup não habilitava/desabilitava corretamente

# 1.5.0

[27/03/2018]

### Novas funcionalidades

-   [ARQPDT-418](http://jira.senior.com.br/browse/ARQPDT-418) - Suporte a enums no formulário dinâmico
-   Suporte a placeholders no formulário dinâmico

# 1.4.0

[22/03/2018]

### Novas funcionalidades

-   [ARQPDT-398](http://jira.senior.com.br/browse/ARQPDT-398) - Adicionada propriedade `searchGridFields` no componente Lookup, para permitir customização de quais campos aparecerão na grid de pesquisa avançada

### Melhorias

-   Definido tamanho mínimo e redimensionamento para as colunas da grid de pesquisa avançada do componente Lookup
-   Componentes Lookup passa a usar Subject para controle de subscriptions

### Correções

-   Corrigidas situações em que o evento `onSearchRequest` do componente Lookup era incorretamente disparado duas vezes
-   Adicionada documentação faltante para a propriedade `searchTotalRecords` do componente Lookup
-   Corrigida largura do botão de pesquisa avançada do componente Lookup

# 1.3.1

[20/03/2018]

### Correções

-   Ajustado exports do componente lookup

# 1.3.0

[19/03/2018]

### Novas funcionalidades

-   [ARQPDT-300](http://jira.senior.com.br/browse/ARQPDT-300) - Criado componente Lookup
-   [ARQPDT-348](http://jira.senior.com.br/browse/ARQPDT-348) - Criado componente Dynamic Form (uso interno)

### Quebras de compatibilidade

-   Alterado componente de campos customizados para implementar corretamente as interfaces do Angular para inputs e validação

### Alteração de dependências

-   Senior Theme: 1.3.3 > 1.3.5

# 1.2.0

[12/03/2018]

### Novas funcionalidades

-   [ARQPDT-317](http://jira.senior.com.br/browse/ARQPDT-317) - Criado componente Breadcrumb
-   [ARQPDT-358](http://jira.senior.com.br/browse/ARQPDT-358) - Criado componente Control Errors
-   [ARQPDT-359](http://jira.senior.com.br/browse/ARQPDT-359) - Criado componente Empty State

### Melhorias

-   [ARQPDT-241](http://jira.senior.com.br/browse/ARQPDT-241) - Adicionada documentação do Http Interceptor
-   Adicionada documentação de uso

### Alteração de dependências

-   Angular: 5.2.0 > 5.2.8
-   Senior Theme: 1.3.1 > 1.3.3

# 1.1.1

[14/02/2018]

### Melhorias

-   Adicionadas informações de repositório no package.json

# 1.1.0

[07/02/2018]

### Novas funcionalidades

-   [ARQPDT-233](http://jira.senior.com.br/browse/ARQPDT-233) - Suporte à mascara em campos customizados
-   Adicionado serviço e pipes de localização

### Correções

-   Corrigida a forma como datas são salvas nos campos customizados

# 1.0.1

[02/02/2018]

### Melhorias

-   [ARQPDT-224](http://jira.senior.com.br/browse/ARQPDT-224) - Documentação do componente de campos customizados

### Correções

-   Removida obrigatoriedade dos campos customizados

# 1.0.0

[01/02/2018]

### Novas funcionalidades

-   [ARQPDT-209](http://jira.senior.com.br/browse/ARQPDT-209) - Criação do componente de campos customizados

# 0.0.1

[31/01/2018]

-   [ARQPDT-214](http://jira.senior.com.br/browse/ARQPDT-214) - Criação do projeto
