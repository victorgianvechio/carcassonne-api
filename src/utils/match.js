import path from 'path';
import fs from 'fs';

import { MATCH_PATH, SCORES_PATH } from './paths';

// RECUPERA A DATA DO ARQUIVO MATCH
export function getMatchDate() {
  const matchDate = fs.readFileSync(MATCH_PATH, {
    encoding: 'utf8',
    flag: 'r',
  });

  return matchDate;
}

// SETA UMA NOVA DATA NO ARQUIVO MATCH
export function setMatchDate(date) {
  fs.writeFileSync(MATCH_PATH, date);
}

export function getInterfaceFile() {
  const date = getMatchDate();
  const INTERFACE_FILE = require(path.resolve(
    SCORES_PATH,
    `${date}-interface.json`
  ));

  return INTERFACE_FILE;
}

export function setInterfaceFile(INTERFACE_FILE) {
  const date = getMatchDate();
  fs.writeFileSync(
    path.resolve(SCORES_PATH, `${date}-interface.json`),
    JSON.stringify(INTERFACE_FILE, null, 4)
  );
}

export function getDataFile() {
  const date = getMatchDate();
  const DATA_FILE = require(path.resolve(SCORES_PATH, `${date}-data.json`));

  return DATA_FILE;
}

export function setDataFile(DATA_FILE) {
  const date = getMatchDate();
  fs.writeFileSync(
    path.resolve(SCORES_PATH, `${date}-data.json`),
    JSON.stringify(DATA_FILE, null, 4)
  );
}
