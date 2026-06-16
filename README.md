# 📚 BOOKGRAPH

Projeto desenvolvido para a segunda unidade da disciplina de Teoria de Grafos. O nome "BOOKGRAPH" é um trocadilho que une o tema do projeto com a estrutura de dados utilizada.

**Proposta do Projeto ✏️:** A ideia principal é realizar a recomendação eficiente de livros baseada na similaridade de gostos entre uma teia de usuários. O motor do projeto funciona utilizando grafos para mapear essas relações e gerar as recomendações.

<div align="center">
  <img height="400" src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg" />
</div>

## 👥 Membros da Equipe

<div align="center" style="display: flex; justify-content: center; gap: 10px;">
    <img height="150" src="https://cdn-icons-png.flaticon.com/128/5042/5042347.png" alt="Alawander" /> 
    <img height="150" src="https://cdn-icons-png.flaticon.com/128/9850/9850774.png" alt="Dereck" /> 
    <img height="150" src="https://cdn-icons-png.flaticon.com/128/6007/6007875.png" alt="Matheus" /> 
</div>

- **Alawander Fernandes:** Responsável pelo Front-End
- **Dereck Patrick:** Responsável pelo Banco de Dados
- **Matheus Mendes:** Responsável pelo Back-End

## 🛠️ Tecnologias e Ferramentas

### Linguagens 🗒️

<div align="left">
  <img src="https://cdn.simpleicons.org/javascript/F7DF1E" height="30" alt="JavaScript logo" />
  <img width="12" />
  <img src="https://cdn.simpleicons.org/typescript/3178C6" height="30" alt="TypeScript logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=java" height="30" alt="Java logo" />
  <img width="12" />
  <img src="https://raw.githubusercontent.com/I0HuKc/cypher/main/assets/cypher_logo.png" height="30" alt="Cypher logo" />
</div>

### Tecnologias 🖥️

<div align="left">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png" height="30" alt="React logo" />
  <img width="12" />
  <img src="https://cdn.iconscout.com/icon/free/png-256/free-node-js-icon-svg-download-png-1174925.png?f=webp" height="30" alt="Node.js logo" />
  <img width="12" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/3840px-Vitejs-logo.svg.png" height="30" alt="Vitejs logo" />
</div>

### Controle de Versão ⚙️

<div align="left">
  <img src="https://skillicons.dev/icons?i=github" height="30" alt="GitHub logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="30" alt="Git logo" />
</div>

### Ferramentas 🔧

<div align="left">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/960px-Visual_Studio_Code_1.35_icon.svg.png" height="30" alt="VS Code logo" />
  <img width="12" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/IntelliJ_IDEA_Icon.svg/960px-IntelliJ_IDEA_Icon.svg.png" height="30" alt="IntelliJ IDEA logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/neo4j.png" height="30" alt="Neo4j logo" />
</div>

## 🚀 Como Executar o Projeto

### Front-End

1. Navegue até a pasta do front-end:

```bash
cd Front
```

2. Instale as dependências:

```bash
npm install
```

3. Execute em modo de desenvolvimento:

```bash
npm run dev
```

4. Para criar o build de produção:

```bash
npm run build
```

### Back-End

> O backend é tratado por outra pessoa; esta documentação indica apenas como iniciar o serviço se ele estiver disponível.

1. Verifique se o Java 21 está instalado e o `JAVA_HOME` está configurado.
2. Navegue até a pasta do backend:

```bash
cd Back
```

3. Execute a aplicação Spring Boot:

```bash
./mvnw spring-boot:run
```

### Front-End e Conexão com Backend

- O front-end foi finalizado e pode rodar de forma independente com autenticação demonstrativa.
- Em desenvolvimento, o Vite está configurado para encaminhar chamadas de `/api` para `http://localhost:8080`.
- A integração final com o backend deverá ser feita pela próxima pessoa responsável pelo `Back`.

### Banco de Dados

O projeto usa Neo4j para armazenamento e recomendações. Configure o Neo4j localmente ou via Docker antes de iniciar o backend.

Se necessário, ajuste as credenciais e a URL de conexão no arquivo de configuração do Spring Boot.
