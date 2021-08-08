const app = require("./src/app")
const port = 5000;

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});