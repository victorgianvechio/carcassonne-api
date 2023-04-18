import './config/dotenv';
import App from './App';
import { createScoresDir } from './utils/paths';

const port = process.env.APP_PORT || 6666;

createScoresDir();

App.listen(port, () => {
  console.log(`carcassonne-api is running on port ${port} - ${new Date()}`);
});
