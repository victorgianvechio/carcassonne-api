import {
  setMatchDate,
  getInterfaceFile,
  setInterfaceFile,
  getDataFile,
  setDataFile,
} from '../../utils/match';

import { INTERFACE } from '../../types/interface';
import { PLAYERS } from '../../types/player';
import { FEATURES } from '../../types/feature';
import { MEEPLES } from '../../types/meeple';

class MatchService {
  async getInterface() {
    const INTERFACE_FILE = getInterfaceFile();
    return INTERFACE_FILE;
  }

  async newMatch(date, match_number) {
    setMatchDate(date);

    const rawDate = date.split('-');
    const day = rawDate[0];
    const month = rawDate[1];
    const year = rawDate[2];

    const formattedDate = `${day}/${month}/${year}`;

    INTERFACE.DATE = formattedDate;
    INTERFACE.MATCH = match_number;
    INTERFACE.ROUND = 1;
    INTERFACE.TURN = 0;

    try {
      setInterfaceFile(INTERFACE);
      setDataFile({ DATA: [] });
      return { success: true, message: 'Sucefully created a match' };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  async endTurn(POINTS) {
    const DATA_FILE = getDataFile();
    const INTERFACE_FILE = getInterfaceFile();

    await updatePoints(POINTS, INTERFACE_FILE);

    if (POINTS.FEATURE === FEATURES.CITY)
      await updateKingCity(POINTS, INTERFACE_FILE);

    if (POINTS.FEATURE === FEATURES.ROAD)
      await updateKingRoad(POINTS, INTERFACE_FILE);

    // MEEPLES (NORMAL, PRIEST)
    if (POINTS.MEEPLE !== MEEPLES.GHOST) {
      INTERFACE_FILE.TURN += 1;
      POINTS.TURN = INTERFACE_FILE.TURN;

      if (POINTS.MEEPLE === MEEPLES.PRIEST) {
        if (POINTS.PLAYER === PLAYERS.VICTOR) {
          INTERFACE_FILE.VICTOR_PRIEST += 1;
          INTERFACE_FILE.VICTOR_POINTS_PRIEST += POINTS.TOTAL_POINTS;
        }

        if (POINTS.PLAYER === PLAYERS.SHINDI) {
          INTERFACE_FILE.SHINDI_PRIEST += 1;
          INTERFACE_FILE.SHINDI_POINTS_PRIEST += POINTS.TOTAL_POINTS;
        }

        if (POINTS.PLAYER === PLAYERS.RENAN) {
          INTERFACE_FILE.RENAN_PRIEST += 1;
          INTERFACE_FILE.RENAN_POINTS_PRIEST += POINTS.TOTAL_POINTS;
        }
      }
      // GHOST
    } else {
      POINTS.TURN = INTERFACE_FILE.TURN;

      if (POINTS.PLAYER === PLAYERS.VICTOR) {
        INTERFACE_FILE.VICTOR_GHOST += 1;
        INTERFACE_FILE.VICTOR_POINTS_GHOST += POINTS.TOTAL_POINTS;
      }

      if (POINTS.PLAYER === PLAYERS.SHINDI) {
        INTERFACE_FILE.SHINDI_GHOST += 1;
        INTERFACE_FILE.SHINDI_POINTS_GHOST += POINTS.TOTAL_POINTS;
      }

      if (POINTS.PLAYER === PLAYERS.RENAN) {
        INTERFACE_FILE.RENAN_GHOST += 1;
        INTERFACE_FILE.RENAN_POINTS_GHOST += POINTS.TOTAL_POINTS;
      }
    }

    DATA_FILE.DATA.push(POINTS);
    setDataFile(DATA_FILE);
    setInterfaceFile(INTERFACE_FILE);
  }

  async endRound() {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.ROUND += 1;
    setInterfaceFile(INTERFACE_FILE);
  }

  async moveFairy(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.FAIRY_OWNER = PLAYER;
    setInterfaceFile(INTERFACE_FILE);
  }

  async addFairyPoint(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_POINTS += 1;
      INTERFACE_FILE.VICTOR_FAIRY_ROUND += 1;
    }

    if (PLAYER === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_POINTS += 1;
      INTERFACE_FILE.SHINDI_FAIRY_ROUND += 1;
    }

    if (PLAYER === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_POINTS += 1;
      INTERFACE_FILE.RENAN_FAIRY_ROUND += 1;
    }
    setInterfaceFile(INTERFACE_FILE);
  }

  async removeFairyPoint(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_POINTS -= 1;
      INTERFACE_FILE.VICTOR_FAIRY_ROUND -= 1;
    }

    if (PLAYER === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_POINTS -= 1;
      INTERFACE_FILE.SHINDI_FAIRY_ROUND -= 1;
    }

    if (PLAYER === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_POINTS -= 1;
      INTERFACE_FILE.RENAN_FAIRY_ROUND -= 1;
    }
    setInterfaceFile(INTERFACE_FILE);
  }

  async countConstructor(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) INTERFACE_FILE.VICTOR_CONSTRUCTOR += 1;
    if (PLAYER === PLAYERS.SHINDI) INTERFACE_FILE.SHINDI_CONSTRUCTOR += 1;
    if (PLAYER === PLAYERS.RENAN) INTERFACE_FILE.RENAN_CONSTRUCTOR += 1;
    setInterfaceFile(INTERFACE_FILE);
  }

  async addCity() {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.CITIES += 1;

    if (INTERFACE_FILE.KING_CITY === PLAYERS.VICTOR)
      INTERFACE_FILE.VICTOR_POINTS += 1;

    if (INTERFACE_FILE.KING_CITY === PLAYERS.SHINDI)
      INTERFACE_FILE.SHINDI_POINTS += 1;

    if (INTERFACE_FILE.KING_CITY === PLAYERS.RENAN)
      INTERFACE_FILE.RENAN_POINTS += 1;

    setInterfaceFile(INTERFACE_FILE);
  }

  async removeCity() {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.CITIES -= 1;

    if (INTERFACE_FILE.KING_CITY === PLAYERS.VICTOR)
      INTERFACE_FILE.VICTOR_POINTS -= 1;

    if (INTERFACE_FILE.KING_CITY === PLAYERS.SHINDI)
      INTERFACE_FILE.SHINDI_POINTS -= 1;

    if (INTERFACE_FILE.KING_CITY === PLAYERS.RENAN)
      INTERFACE_FILE.RENAN_POINTS -= 1;

    setInterfaceFile(INTERFACE_FILE);
  }

  async addRoad() {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.ROADS += 1;

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.VICTOR)
      INTERFACE_FILE.VICTOR_POINTS += 1;

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.SHINDI)
      INTERFACE_FILE.SHINDI_POINTS += 1;

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.RENAN)
      INTERFACE_FILE.RENAN_POINTS += 1;

    setInterfaceFile(INTERFACE_FILE);
  }

  async removeRoad() {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.ROADS -= 1;

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.VICTOR)
      INTERFACE_FILE.VICTOR_POINTS -= 1;

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.SHINDI)
      INTERFACE_FILE.SHINDI_POINTS -= 1;

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.RENAN)
      INTERFACE_FILE.RENAN_POINTS -= 1;

    setInterfaceFile(INTERFACE_FILE);
  }
}

async function updatePoints(POINTS, INTERFACE_FILE) {
  if (POINTS.PLAYER === PLAYERS.VICTOR) {
    INTERFACE_FILE.VICTOR_POINTS += POINTS.TOTAL_POINTS;
    if (POINTS.FAIRY) {
      INTERFACE_FILE.VICTOR_FAIRY_FEATURE += 3;
    }
  }

  if (POINTS.PLAYER === PLAYERS.SHINDI) {
    INTERFACE_FILE.SHINDI_POINTS += POINTS.TOTAL_POINTS;
    if (POINTS.FAIRY) {
      INTERFACE_FILE.SHINDI_FAIRY_FEATURE += 3;
    }
  }

  if (POINTS.PLAYER === PLAYERS.RENAN) {
    INTERFACE_FILE.RENAN_POINTS += POINTS.TOTAL_POINTS;
    if (POINTS.FAIRY) {
      INTERFACE_FILE.RENAN_FAIRY_FEATURE += 3;
    }
  }
}

async function updateKingCity(POINTS, INTERFACE_FILE) {
  INTERFACE_FILE.CITIES += 1;

  if (POINTS.TILES >= INTERFACE_FILE.BIGGEST_CITY) {
    if (INTERFACE_FILE.KING_CITY === POINTS.PLAYER) {
      if (POINTS.PLAYER === PLAYERS.VICTOR) {
        INTERFACE_FILE.VICTOR_POINTS += 1;
        INTERFACE_FILE.VICTOR_POINTS_KING_CITY += 1;
      }

      if (POINTS.PLAYER === PLAYERS.SHINDI) {
        INTERFACE_FILE.SHINDI_POINTS += 1;
        INTERFACE_FILE.SHINDI_POINTS_KING_CITY += 1;
      }

      if (POINTS.PLAYER === PLAYERS.RENAN) {
        INTERFACE_FILE.RENAN_POINTS += 1;
        INTERFACE_FILE.RENAN_POINTS_KING_CITY += 1;
      }
    }

    INTERFACE_FILE.KING_CITY = POINTS.PLAYER;
    INTERFACE_FILE.BIGGEST_CITY = POINTS.TILES;
  } else {
    if (INTERFACE_FILE.KING_CITY === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_POINTS += 1;
      INTERFACE_FILE.VICTOR_POINTS_KING_CITY += 1;
    }

    if (INTERFACE_FILE.KING_CITY === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_POINTS += 1;
      INTERFACE_FILE.SHINDI_POINTS_KING_CITY += 1;
    }

    if (INTERFACE_FILE.KING_CITY === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_POINTS += 1;
      INTERFACE_FILE.RENAN_POINTS_KING_CITY += 1;
    }
  }
}

async function updateKingRoad(POINTS, INTERFACE_FILE) {
  INTERFACE_FILE.ROADS += 1;

  if (POINTS.TILES >= INTERFACE_FILE.BIGGEST_ROAD) {
    if (INTERFACE_FILE.KING_ROAD === POINTS.PLAYER) {
      if (POINTS.PLAYER === PLAYERS.VICTOR) {
        INTERFACE_FILE.VICTOR_POINTS += 1;
        INTERFACE_FILE.VICTOR_POINTS_KING_ROAD += 1;
      }

      if (POINTS.PLAYER === PLAYERS.SHINDI) {
        INTERFACE_FILE.SHINDI_POINTS += 1;
        INTERFACE_FILE.SHINDI_POINTS_KING_ROAD += 1;
      }

      if (POINTS.PLAYER === PLAYERS.RENAN) {
        INTERFACE_FILE.RENAN_POINTS += 1;
        INTERFACE_FILE.RENAN_POINTS_KING_ROAD += 1;
      }
    }

    INTERFACE_FILE.KING_ROAD = POINTS.PLAYER;
    INTERFACE_FILE.BIGGEST_ROAD = POINTS.TILES;
  } else {
    if (INTERFACE_FILE.KING_ROAD === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_POINTS += 1;
      INTERFACE_FILE.VICTOR_POINTS_KING_ROAD += 1;
    }

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_POINTS += 1;
      INTERFACE_FILE.SHINDI_POINTS_KING_ROAD += 1;
    }

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_POINTS += 1;
      INTERFACE_FILE.RENAN_POINTS_KING_ROAD += 1;
    }
  }
}

async function countGhost(POINTS, INTERFACE_FILE) {}

async function countPriest(POINTS, INTERFACE_FILE) {}

export default new MatchService();
