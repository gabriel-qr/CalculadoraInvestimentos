# Calculadora de Investimentos

Uma aplicação web interativa para calcular e visualizar a progressão de investimentos com juros compostos, aportes periódicos e imposto sobre ganhos.

## Descrição do Projeto

Ferramenta full-stack JavaScript que permite simular diferentes cenários de investimento, visualizando resultados através de gráficos dinâmicos e tabelas detalhadas.

## Tecnologias Utilizadas

- **JavaScript ES6+** - Módulos nativos, arrow functions, template literals
- **HTML5** - Semântica e estrutura acessível
- **Tailwind CSS v4** - Framework utilitário para estilização responsiva
- **PostCSS** - Processamento de CSS
- **Vite** - Build tool com Hot Module Replacement
- **Chart.js** - Visualização de dados (gráficos Doughnut e Bar)
- **Node.js** - Gerenciador de dependências

## Conhecimentos Técnicos Aplicados

- Arquitetura modular com ES6 (separação de responsabilidades)
- Manipulação avançada do DOM (criação dinâmica, eventos, seletores CSS)
- Cálculos financeiros complexos (juros compostos, conversão de períodos)
- Estruturas de dados com arrays de objetos
- Validação de dados com HTML5 e JavaScript
- Formatação e localização para português brasileiro
- Visualização de dados com Chart.js
- Interface responsiva com CSS Grid e Flexbox
- Carousel/Slider com navegação entre abas
- Gerenciamento de estado e eventos de formulário

## Estrutura de Arquivos

```
CalculadoraInvestimentos/
├── index.html
├── main.js
├── package.json
├── postcss.config.mjs
├── src/
│   ├── auxiliar.js           # Funções utilitárias
│   ├── investmentGoals.js    # Lógica financeira
│   ├── table.js              # Renderização de tabelas
│   └── style.css
└── README.md
```

## Como Executar

### Pré-requisitos

- Node.js 16+

### Instalação

```bash
npm install
npm run dev        # Servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview da build
```

## Melhorias Futuras

- Persistência de dados com LocalStorage
- Exportação de resultados em PDF
- Comparação entre múltiplos cenários
- TypeScript para type safety
- Testes unitários com Jest/Vitest

---

Desenvolvido como parte do aprendizado em desenvolvimento full-stack JavaScript.
