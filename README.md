# BPOOL Assignment
<div style="text-align: right"><sub>by Edgar Damasceno</sub></div>

[Descrição do desafio](./doc/teste.md)

> Este é um monorepo; back-end, front-end, scripts, configurações e tudo que for necessário para a execução e deploy da aplicação em um só lugar.

## Implementação
- API em [NodeJS](https://nodejs.org/en/) utilizando o framework [NestJS](https://nestjs.com/).
- SPA utilizando [ReactJS](https://reactjs.org/) e design system utilizando [Ant Design](https://ant.design/).

## Pré-Requisitos
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Executando

### Ambiente de Desenvolvimento
Para executar a aplicação em ambiente de desenvolvimento com recurso de hot reload (front-end e back-end) utilize os seguintes comandos:

```console
$ docker-compose -f docker-compose.dev.yml down
$ docker-compose -f docker-compose.dev.yml up --build
```

ou execute o script `run-app-deploy.sh` passando `--dev` como parâmetro:

```console
$ ./run-app-deploy.sh --dev
```

> OBS: Será necessário re-executar o comando acima aṕos a instalação de pacotes no front-end ou back-end para que as alterações surtam efeito.


## TODO

- [x] Criar boilerplate (front-end e back-end)
- [x] Containerizar ambiente de desenvolvimento
- [x] Implementar front-end
- [ ] Implementar back-end
- [ ] Integrar front-end e back-end
- [ ] Containerizar ambiente de produção

## Caputuras de tela

### Lista de Contatos
![main](doc/images/main.png "Tabela")

### Adicionar Contato
![add](doc/images/add.png "Adicionar")

### Editar Contato
![edit](doc/images/edit.png "Editar")

### Visualizar Contato
![view](doc/images/add.png "Visualizar")

### Remover Contato (confirmação)
![delete](doc/images/delete.png "Remover")
