import { resolve } from 'path';
import fs from 'fs';

export const ROOT_PATH = resolve(__dirname, '..', '..');
export const SCORES_PATH = resolve(ROOT_PATH, 'scores');
export const MATCH_PATH = resolve(ROOT_PATH, 'MATCH');

export function createScoresDir() {
  if (!fs.existsSync(SCORES_PATH)) {
    fs.mkdirSync(SCORES_PATH);
  }
}
