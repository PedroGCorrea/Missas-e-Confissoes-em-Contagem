# Criador 👨‍💻<br>

**Desenvolvido por Pedro Guimarães de Deus Corrêa.**

**Que este projeto possa ajudar muitos fiéis a estarem mais próximos da vida sacramental em nossa cidade.**

# Missas e Confissões em Contagem ⛪

Este projeto é uma ferramenta desenvolvida para centralizar e facilitar a consulta de horários de missas e confissões nas paróquias da cidade de Contagem, Minas Gerais. 

O objetivo é servir à comunidade católica local, oferecendo uma interface simples, rápida e com filtros precisos para que ninguém perca a oportunidade de participar da Eucaristia ou do Sacramento da Reconciliação por falta de informação.

## 🚀 Funcionalidades

- **Busca por Nome:** Encontre sua paróquia favorita rapidamente.
- **Filtro por Bairro:** Seleção dinâmica baseada nas paróquias cadastradas.
- **Filtro por Dia da Semana:** Seletores específicos para dias de Missa e dias de Confissão.
- **Filtro por Horário:** Campo de busca textual para horários específicos (ex: "19h").
- **Design Responsivo:** Consulta fácil tanto pelo computador quanto pelo celular.

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3:** Estrutura e estilização moderna.
- **JavaScript (ES6+):** Lógica de filtragem dinâmica e manipulação do DOM.
- **JSON:** Base de dados desacoplada para facilitar a manutenção e escalabilidade.
- **Vercel:** Hospedagem e deploy contínuo.

## 📂 Como Contribuir com Dados

O projeto é alimentado de forma colaborativa. Para manter a precisão dos filtros, seguimos um padrão rigoroso no arquivo `paroquias.json`.

Se desejar sugerir uma atualização, certifique-se de que os dias da semana estejam escritos por extenso (ex: "Segunda, Terça, Quarta") para que o motor de busca consiga identificar os horários corretamente.

### Exemplo de Formatação:
```json
{
    "nome": "Exemplo de Paróquia",
    "bairro": "Centro",
    "missas": ["Sábado: 18h", "Domingo: 08h, 10h"],
    "confissoes": ["Terça, Quarta, Quinta: 14h às 17h"]
}

