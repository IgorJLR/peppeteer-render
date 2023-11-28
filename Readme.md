# Peppeteer-Render (Parte do Projeto Meu IFC)
Este repositório faz parte de um projeto maior chamado "Meu IFC". Esta é a primeira parte do projeto, focada na captura automatizada de informações atualizadas do site de horários do Instituto. O "Meu IFC" é composto por outros dois repositórios:

[Mbtiles Server](https://github.com/Lucas-Vicenzzo/mbtiles-server): Responsável por disponibilizar os mapas para o front-end.

[Meu IFC](https://github.com/Lucas-Vicenzzo/meuifc): Front-end do projeto, contendo as APIs que puxam informações dos outros dois repositórios.

## Descrição

Este repositório contém um script que utiliza a biblioteca Puppeteer para extrair informações úteis, como turma, horário de aula, disciplina, professor, sala e dia da semana, a partir do site de horários do [Instituto](https://ifc-camboriu.edupage.org/timetable/?). O script é projetado para facilitar a obtenção de dados atualizados de forma automatizada.

## Pré-requisitos

Antes de executar o script, certifique-se de ter as seguintes dependências instaladas em sua máquina:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm: Geralmente é instalado automaticamente com o Node.js

## Instalação

1. Clone o repositório para a sua máquina local. É importante que seja na máquina local:

```bash
git clone https://github.com/IgorJLR/peppeteer-render.git
```

2. Navegue até o diretório do projeto:

```bash
cd peppeteer-render
```

3. Instale as dependências necessárias:

```bash
npm install
```

## Uso

1. Execute o script utilizando o seguinte comando:

```bash
npm run start
```

2. Acesse o endpoint `/scrap` para iniciar o processo de busca de informações atualizadas no site de horários do Instituto.

```bash
http://localhost:3000/scrap
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novos recursos. Abra uma _issue_ para discutir suas ideias ou envie um _pull request_.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.