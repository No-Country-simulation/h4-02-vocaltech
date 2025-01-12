import server from "./server";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
