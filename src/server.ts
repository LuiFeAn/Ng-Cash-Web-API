import { app } from ".";

app.listen( process.env.API_PORT, () => (
    console.log(` Server Started At ${process.env.API_PORT} 🔥👨‍💻`)
));
