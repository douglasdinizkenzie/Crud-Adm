import { app } from "./app";
import { conectDataBase } from "./database/connection";

app.listen(3000, async () => {
  await conectDataBase();
  console.log("Server is running on PORT 3000");
});
