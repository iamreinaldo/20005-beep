# 20-005 Beep

> Listening to the signals of your infrastructure.

## Sobre o projeto

20-005 Beep é um portal pessoal desenvolvido para centralizar o acesso, monitoramento e gerenciamento de serviços self-hosted.

O nome é uma referência direta ao Sputnik 1, o primeiro satélite artificial colocado em órbita pela União Soviética em 1957. O satélite transmitia sinais de rádio periódicos ("beep-beep") que podiam ser captados por estações ao redor do mundo.

Uma das frequências utilizadas pelo Sputnik era aproximadamente 20,005 MHz, dando origem ao nome deste projeto.

Assim como o Sputnik emitia sinais para informar sua presença e estado em órbita, o 20-005 Beep tem como objetivo reunir e apresentar os sinais da infraestrutura pessoal do usuário, funcionando como uma central de controle para todos os serviços executados em seus servidores.

---

## Objetivo

O principal objetivo do projeto é eliminar a necessidade de memorizar URLs, portas, domínios e informações dispersas dos serviços hospedados.

O sistema atuará como um ponto central de acesso, oferecendo:

- Catálogo de serviços disponíveis
- Organização por categorias
- Informações de status e disponibilidade
- Acesso rápido através de links centralizados
- Futuras funcionalidades de monitoramento e telemetria

---

## Arquitetura

O projeto será dividido em duas aplicações principais.

### Frontend

Responsável pela interface do usuário.

Tecnologias

- Next.js
- TypeScript
- TailwindCSS
- Shadcn/UI

Funcionalidades previstas:

- Dashboard principal
- Pesquisa de serviços
- Agrupamento por categorias
- Visualização de status
- Interface responsiva

---

### Backend

Responsável pelo gerenciamento e monitoramento dos serviços cadastrados.

Tecnologias

- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL

Funcionalidades previstas:

- Cadastro de serviços
- Atualização e remoção de serviços
- Verificação de disponibilidade
- APIs para consumo do frontend
- Coleta de métricas e telemetria

---

## Deploy

Toda a infraestrutura será distribuída através de containers.

Tecnologias

- Docker
- Docker Compose


---
