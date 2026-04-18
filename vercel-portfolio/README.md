# Vercel Portfolio

Este diretório contém um segundo portfólio, separado do GitHub Pages que continua na raiz do repositório.

## Como publicar no Vercel

1. Importe o repositório `MaiconKevyn/MaiconKevyn.github.io` no Vercel.
2. Em `Project Settings`, configure `Root Directory` como `vercel-portfolio`.
3. Use `Framework Preset: Other`.
4. Como o site é estático, o Vercel pode publicar os arquivos deste diretório sem build complexo.

## Estrutura

- `index.html`: markup principal
- `styles.css`: layout, animações, responsividade e o visual do hero
- `script.js`: typewriter, troca de projetos, progress bar e microinterações
- `vercel.json`: ajustes simples de entrega

## Convivência com o GitHub Pages

- O portfólio do GitHub Pages permanece na raiz do repositório.
- O portfólio do Vercel fica isolado aqui.
- Os dois podem coexistir no mesmo `main`, cada um apontando para um diretório diferente.
