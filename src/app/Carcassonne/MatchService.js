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

  async getData() {
    const DATA_FILE = getDataFile();
    return DATA_FILE;
  }

  async buyOrSellPoints(obj) {
    const INTERFACE_FILE = getInterfaceFile();

    const FEATURE = obj.feature;
    const BUYER_PLAYER = obj.buyer_player;
    const SELLER_PLAYER = obj.seller_player;
    const POINTS = obj.points;

    // BUY OR SELL MEEPLE
    if (FEATURES.BUY_OR_SELL_MEEPLE === FEATURE) {
      if (PLAYERS.NONE === BUYER_PLAYER) {
        if (PLAYERS.VICTOR === SELLER_PLAYER) {
          INTERFACE_FILE.VICTOR_SELL += 1;
          INTERFACE_FILE.VICTOR_SELL_POINTS += POINTS;
          INTERFACE_FILE.VICTOR_POINTS += POINTS;
        }

        if (PLAYERS.SHINDI === SELLER_PLAYER) {
          INTERFACE_FILE.SHINDI_SELL += 1;
          INTERFACE_FILE.SHINDI_SELL_POINTS += POINTS;
          INTERFACE_FILE.SHINDI_POINTS += POINTS;
        }

        if (PLAYERS.RENAN === SELLER_PLAYER) {
          INTERFACE_FILE.RENAN_SELL += 1;
          INTERFACE_FILE.RENAN_SELL_POINTS += POINTS;
          INTERFACE_FILE.RENAN_POINTS += POINTS;
        }
      }

      if (PLAYERS.VICTOR === BUYER_PLAYER) {
        INTERFACE_FILE.VICTOR_BUY += 1;
        INTERFACE_FILE.VICTOR_BUY_POINTS -= POINTS;
        INTERFACE_FILE.VICTOR_POINTS -= POINTS;

        if (PLAYERS.SHINDI === SELLER_PLAYER) {
          INTERFACE_FILE.SHINDI_SELL += 1;
          INTERFACE_FILE.SHINDI_SELL_POINTS += POINTS;
          INTERFACE_FILE.SHINDI_POINTS += POINTS;
        }

        if (PLAYERS.RENAN === SELLER_PLAYER) {
          INTERFACE_FILE.RENAN_SELL += 1;
          INTERFACE_FILE.RENAN_SELL_POINTS += POINTS;
          INTERFACE_FILE.RENAN_POINTS += POINTS;
        }
      }

      if (PLAYERS.SHINDI === BUYER_PLAYER) {
        INTERFACE_FILE.SHINDI_BUY += 1;
        INTERFACE_FILE.SHINDI_BUY_POINTS -= POINTS;
        INTERFACE_FILE.SHINDI_POINTS -= POINTS;

        if (PLAYERS.VICTOR === SELLER_PLAYER) {
          INTERFACE_FILE.VICTOR_SELL += 1;
          INTERFACE_FILE.VICTOR_SELL_POINTS += POINTS;
          INTERFACE_FILE.VICTOR_POINTS += POINTS;
        }

        if (PLAYERS.RENAN === SELLER_PLAYER) {
          INTERFACE_FILE.RENAN_SELL += 1;
          INTERFACE_FILE.RENAN_SELL_POINTS += POINTS;
          INTERFACE_FILE.RENAN_POINTS += POINTS;
        }
      }

      if (PLAYERS.RENAN === BUYER_PLAYER) {
        INTERFACE_FILE.RENAN_BUY += 1;
        INTERFACE_FILE.RENAN_BUY_POINTS -= POINTS;
        INTERFACE_FILE.RENAN_POINTS -= POINTS;

        if (PLAYERS.SHINDI === SELLER_PLAYER) {
          INTERFACE_FILE.SHINDI_SELL += 1;
          INTERFACE_FILE.SHINDI_SELL_POINTS += POINTS;
          INTERFACE_FILE.SHINDI_POINTS += POINTS;
        }

        if (PLAYERS.VICTOR === SELLER_PLAYER) {
          INTERFACE_FILE.VICTOR_SELL += 1;
          INTERFACE_FILE.VICTOR_SELL_POINTS += POINTS;
          INTERFACE_FILE.VICTOR_POINTS += POINTS;
        }
      }
    }

    // BAZAAR
    if (FEATURES.BAZAAR === FEATURE) {
      if (PLAYERS.NONE === BUYER_PLAYER) {
        if (PLAYERS.VICTOR === SELLER_PLAYER) {
          INTERFACE_FILE.VICTOR_BAZAAR += POINTS;
          INTERFACE_FILE.VICTOR_POINTS += POINTS;
        }

        if (PLAYERS.SHINDI === SELLER_PLAYER) {
          INTERFACE_FILE.SHINDI_BAZAAR += POINTS;
          INTERFACE_FILE.SHINDI_POINTS += POINTS;
        }

        if (PLAYERS.RENAN === SELLER_PLAYER) {
          INTERFACE_FILE.RENAN_BAZAAR += POINTS;
          INTERFACE_FILE.RENAN_POINTS += POINTS;
        }
      }

      if (PLAYERS.VICTOR === BUYER_PLAYER) {
        INTERFACE_FILE.VICTOR_BAZAAR -= POINTS;
        INTERFACE_FILE.VICTOR_POINTS -= POINTS;

        if (PLAYERS.SHINDI === SELLER_PLAYER) {
          INTERFACE_FILE.SHINDI_BAZAAR += POINTS;
          INTERFACE_FILE.SHINDI_POINTS += POINTS;
        }

        if (PLAYERS.RENAN === SELLER_PLAYER) {
          INTERFACE_FILE.RENAN_BAZAAR += POINTS;
          INTERFACE_FILE.RENAN_POINTS += POINTS;
        }
      }

      if (PLAYERS.SHINDI === BUYER_PLAYER) {
        INTERFACE_FILE.SHINDI_BAZAAR -= POINTS;
        INTERFACE_FILE.SHINDI_POINTS -= POINTS;

        if (PLAYERS.VICTOR === SELLER_PLAYER) {
          INTERFACE_FILE.VICTOR_BAZAAR += POINTS;
          INTERFACE_FILE.VICTOR_POINTS += POINTS;
        }

        if (PLAYERS.RENAN === SELLER_PLAYER) {
          INTERFACE_FILE.RENAN_BAZAAR += POINTS;
          INTERFACE_FILE.RENAN_POINTS += POINTS;
        }
      }

      if (PLAYERS.RENAN === BUYER_PLAYER) {
        INTERFACE_FILE.RENAN_BAZAAR -= POINTS;
        INTERFACE_FILE.RENAN_POINTS -= POINTS;

        if (PLAYERS.SHINDI === SELLER_PLAYER) {
          INTERFACE_FILE.SHINDI_BAZAAR += POINTS;
          INTERFACE_FILE.SHINDI_POINTS += POINTS;
        }

        if (PLAYERS.VICTOR === SELLER_PLAYER) {
          INTERFACE_FILE.VICTOR_BAZAAR += POINTS;
          INTERFACE_FILE.VICTOR_POINTS += POINTS;
        }
      }
    }

    setInterfaceFile(INTERFACE_FILE);
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

  async loadMatch(date) {
    setMatchDate(date);
    return { success: true, message: 'match loaded' };
  }

  async endTurn(POINTS) {
    const DATA_FILE = getDataFile();
    const INTERFACE_FILE = getInterfaceFile();

    INTERFACE_FILE.TURN += 1;
    POINTS.TURN = INTERFACE_FILE.TURN;

    console.log(POINTS);

    await updatePoints(POINTS, INTERFACE_FILE);

    if (POINTS.FEATURE === FEATURES.CITY)
      await updateKingCity(POINTS, INTERFACE_FILE);

    if (POINTS.FEATURE === FEATURES.ROAD)
      await updateKingRoad(POINTS, INTERFACE_FILE);

    if (POINTS.FEATURE === FEATURES.CASTLE)
      await countCastle(POINTS, INTERFACE_FILE);

    if (POINTS.MEEPLE === MEEPLES.GHOST)
      await countGhost(POINTS, INTERFACE_FILE);

    if (POINTS.MEEPLE === MEEPLES.PRIEST)
      await countPriest(POINTS, INTERFACE_FILE);

    DATA_FILE.DATA.push(POINTS);

    // VERIFICAR SE MAIS ALGUEM GANHOU PONTO JUNTO
    // FAZER UM FOR NA LISTA DE QUEM GANHA TMB
    // APENAS CIDADE E RUA
    // for playerList
    // if(POINTS.FEATURE === FEATURES.CITY || POINTS.FEATURE === FEATURES.ROAD)
    // POINTS.PLAYER = playerList[i]
    // POINTS.FAIRY = false
    // DATA_FILE.DATA.push(POINTS);
    // await updatePoints(POINTS, INTERFACE_FILE);

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

  async setKingCity(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.KING_CITY = PLAYER;
    setInterfaceFile(INTERFACE_FILE);
  }

  async setKingRoad(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.KING_ROAD = PLAYER;
    setInterfaceFile(INTERFACE_FILE);
  }

  async addConstructor(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) INTERFACE_FILE.VICTOR_CONSTRUCTOR += 1;
    if (PLAYER === PLAYERS.SHINDI) INTERFACE_FILE.SHINDI_CONSTRUCTOR += 1;
    if (PLAYER === PLAYERS.RENAN) INTERFACE_FILE.RENAN_CONSTRUCTOR += 1;
    setInterfaceFile(INTERFACE_FILE);
  }

  async removeConstructor(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) INTERFACE_FILE.VICTOR_CONSTRUCTOR -= 1;
    if (PLAYER === PLAYERS.SHINDI) INTERFACE_FILE.SHINDI_CONSTRUCTOR -= 1;
    if (PLAYER === PLAYERS.RENAN) INTERFACE_FILE.RENAN_CONSTRUCTOR -= 1;
    setInterfaceFile(INTERFACE_FILE);
  }

  async addCity() {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.CITIES += 1;

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

    setInterfaceFile(INTERFACE_FILE);
  }

  async removeCity() {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.CITIES -= 1;

    if (INTERFACE_FILE.KING_CITY === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_POINTS -= 1;
      INTERFACE_FILE.VICTOR_POINTS_KING_CITY -= 1;
    }

    if (INTERFACE_FILE.KING_CITY === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_POINTS -= 1;
      INTERFACE_FILE.SHINDI_POINTS_KING_CITY -= 1;
    }

    if (INTERFACE_FILE.KING_CITY === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_POINTS -= 1;
      INTERFACE_FILE.RENAN_POINTS_KING_CITY -= 1;
    }

    setInterfaceFile(INTERFACE_FILE);
  }

  async addRoad() {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.ROADS += 1;

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

    setInterfaceFile(INTERFACE_FILE);
  }

  async removeRoad() {
    const INTERFACE_FILE = getInterfaceFile();
    INTERFACE_FILE.ROADS -= 1;

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_POINTS -= 1;
      INTERFACE_FILE.VICTOR_POINTS_KING_ROAD -= 1;
    }

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_POINTS -= 1;
      INTERFACE_FILE.SHINDI_POINTS_KING_ROAD -= 1;
    }

    if (INTERFACE_FILE.KING_ROAD === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_POINTS -= 1;
      INTERFACE_FILE.RENAN_POINTS_KING_ROAD -= 1;
    }

    setInterfaceFile(INTERFACE_FILE);
  }
}

async function updatePoints(POINTS, INTERFACE_FILE) {
  if (POINTS.PLAYER === PLAYERS.VICTOR) {
    INTERFACE_FILE.VICTOR_POINTS += POINTS.TOTAL_POINTS;

    if (POINTS.FEATURE === FEATURES.CITY) {
      INTERFACE_FILE.VICTOR_POINTS_CITIES += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.VICTOR_CITIES += 1;
    }

    if (POINTS.FEATURE === FEATURES.ROAD) {
      INTERFACE_FILE.VICTOR_POINTS_ROADS += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.VICTOR_ROADS += 1;
    }

    if (POINTS.FEATURE === FEATURES.MONASTERY) {
      INTERFACE_FILE.VICTOR_POINTS_MONASTERIES += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.VICTOR_MONASTERIES += 1;
    }

    if (POINTS.FEATURE === FEATURES.GARDEN) {
      INTERFACE_FILE.VICTOR_POINTS_GARDENS += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.VICTOR_GARDENS += 1;
    }

    if (POINTS.FAIRY) {
      INTERFACE_FILE.VICTOR_FAIRY_FEATURE += 3;
    }
  }

  if (POINTS.PLAYER === PLAYERS.SHINDI) {
    INTERFACE_FILE.SHINDI_POINTS += POINTS.TOTAL_POINTS;

    if (POINTS.FEATURE === FEATURES.CITY) {
      INTERFACE_FILE.SHINDI_POINTS_CITIES += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.SHINDI_CITIES += 1;
    }

    if (POINTS.FEATURE === FEATURES.ROAD) {
      INTERFACE_FILE.SHINDI_POINTS_ROADS += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.SHINDI_ROADS += 1;
    }

    if (POINTS.FEATURE === FEATURES.MONASTERY) {
      INTERFACE_FILE.SHINDI_POINTS_MONASTERIES += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.SHINDI_MONASTERIES += 1;
    }

    if (POINTS.FEATURE === FEATURES.GARDEN) {
      INTERFACE_FILE.SHINDI_POINTS_GARDENS += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.SHINDI_GARDENS += 1;
    }

    if (POINTS.FAIRY) {
      INTERFACE_FILE.SHINDI_FAIRY_FEATURE += 3;
    }
  }

  if (POINTS.PLAYER === PLAYERS.RENAN) {
    INTERFACE_FILE.RENAN_POINTS += POINTS.TOTAL_POINTS;

    if (POINTS.FEATURE === FEATURES.CITY) {
      INTERFACE_FILE.RENAN_POINTS_CITIES += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.RENAN_CITIES += 1;
    }

    if (POINTS.FEATURE === FEATURES.ROAD) {
      INTERFACE_FILE.RENAN_POINTS_ROADS += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.RENAN_ROADS += 1;
    }

    if (POINTS.FEATURE === FEATURES.MONASTERY) {
      INTERFACE_FILE.RENAN_POINTS_MONASTERIES += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.RENAN_MONASTERIES += 1;
    }

    if (POINTS.FEATURE === FEATURES.GARDEN) {
      INTERFACE_FILE.RENAN_POINTS_GARDENS += POINTS.FEATURE_POINTS;
      INTERFACE_FILE.RENAN_GARDENS += 1;
    }

    if (POINTS.FAIRY) {
      INTERFACE_FILE.RENAN_FAIRY_FEATURE += 3;
    }
  }
}

async function updateKingCity(POINTS, INTERFACE_FILE) {
  INTERFACE_FILE.CITIES += 1;

  if (POINTS.TILES >= INTERFACE_FILE.BIGGEST_CITY) {
    INTERFACE_FILE.BIGGEST_CITY = POINTS.TILES;
    INTERFACE_FILE.KING_CITY = 'NONE';
  }

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

async function updateKingRoad(POINTS, INTERFACE_FILE) {
  INTERFACE_FILE.ROADS += 1;

  if (POINTS.TILES >= INTERFACE_FILE.BIGGEST_ROAD) {
    INTERFACE_FILE.BIGGEST_ROAD = POINTS.TILES;
    INTERFACE_FILE.KING_ROAD = 'NONE';
  }

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

async function countGhost(POINTS, INTERFACE_FILE) {
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

async function countPriest(POINTS, INTERFACE_FILE) {
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

async function countCastle(POINTS, INTERFACE_FILE) {
  if (POINTS.PLAYER === PLAYERS.VICTOR) {
    INTERFACE_FILE.VICTOR_CASTLE += 1;
    INTERFACE_FILE.VICTOR_POINTS_CASTLE += POINTS.TOTAL_POINTS;
  }

  if (POINTS.PLAYER === PLAYERS.SHINDI) {
    INTERFACE_FILE.SHINDI_CASTLE += 1;
    INTERFACE_FILE.SHINDI_POINTS_CASTLE += POINTS.TOTAL_POINTS;
  }

  if (POINTS.PLAYER === PLAYERS.RENAN) {
    INTERFACE_FILE.RENAN_CASTLE += 1;
    INTERFACE_FILE.RENAN_POINTS_CASTLE += POINTS.TOTAL_POINTS;
  }
}

export default new MatchService();
