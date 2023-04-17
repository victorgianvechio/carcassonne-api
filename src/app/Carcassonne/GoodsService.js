import { getInterfaceFile, setInterfaceFile } from '../../utils/match';

import { PLAYERS } from '../../types/player';
import { GOODS } from '../../types/goods';

class GoodsService {
  async addBarrel(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_BARREL += 1;
    }
    if (PLAYER === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_BARREL += 1;
    }
    if (PLAYER === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_BARREL += 1;
    }
    setKingOfGoods(INTERFACE_FILE, GOODS.BARREL);
    setInterfaceFile(INTERFACE_FILE);
  }

  async addWheat(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_WHEAT += 1;
    }
    if (PLAYER === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_WHEAT += 1;
    }
    if (PLAYER === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_WHEAT += 1;
    }
    setKingOfGoods(INTERFACE_FILE, GOODS.WHEAT);
    setInterfaceFile(INTERFACE_FILE);
  }

  async addSilk(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_SILK += 1;
    }
    if (PLAYER === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_SILK += 1;
    }
    if (PLAYER === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_SILK += 1;
    }
    setKingOfGoods(INTERFACE_FILE, GOODS.SILK);
    setInterfaceFile(INTERFACE_FILE);
  }

  async removeBarrel(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_BARREL -= 1;
    }
    if (PLAYER === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_BARREL -= 1;
    }
    if (PLAYER === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_BARREL -= 1;
    }
    setKingOfGoods(INTERFACE_FILE, GOODS.BARREL);
    setInterfaceFile(INTERFACE_FILE);
  }

  async removeWheat(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_WHEAT -= 1;
    }
    if (PLAYER === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_WHEAT -= 1;
    }
    if (PLAYER === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_WHEAT -= 1;
    }
    setKingOfGoods(INTERFACE_FILE, GOODS.WHEAT);
    setInterfaceFile(INTERFACE_FILE);
  }

  async removeSilk(PLAYER) {
    const INTERFACE_FILE = getInterfaceFile();
    if (PLAYER === PLAYERS.VICTOR) {
      INTERFACE_FILE.VICTOR_SILK -= 1;
    }
    if (PLAYER === PLAYERS.SHINDI) {
      INTERFACE_FILE.SHINDI_SILK -= 1;
    }
    if (PLAYER === PLAYERS.RENAN) {
      INTERFACE_FILE.RENAN_SILK -= 1;
    }
    setKingOfGoods(INTERFACE_FILE, GOODS.SILK);
    setInterfaceFile(INTERFACE_FILE);
  }
}

async function setKingOfGoods(INTERFACE_FILE, GOOD) {
  if (GOOD === GOODS.BARREL) {
    const max = Math.max(
      INTERFACE_FILE.VICTOR_BARREL,
      INTERFACE_FILE.SHINDI_BARREL,
      INTERFACE_FILE.RENAN_BARREL
    );

    if (INTERFACE_FILE.VICTOR_BARREL === max) {
      INTERFACE_FILE.VICTOR_BARREL_POINTS = 10;
    } else {
      INTERFACE_FILE.VICTOR_BARREL_POINTS = 0;
    }

    if (INTERFACE_FILE.SHINDI_BARREL === max) {
      INTERFACE_FILE.SHINDI_BARREL_POINTS = 10;
    } else {
      INTERFACE_FILE.SHINDI_BARREL_POINTS = 0;
    }

    if (INTERFACE_FILE.RENAN_BARREL === max) {
      INTERFACE_FILE.RENAN_BARREL_POINTS = 10;
    } else {
      INTERFACE_FILE.RENAN_BARREL_POINTS = 0;
    }
  }

  if (GOOD === GOODS.WHEAT) {
    const max = Math.max(
      INTERFACE_FILE.VICTOR_WHEAT,
      INTERFACE_FILE.SHINDI_WHEAT,
      INTERFACE_FILE.RENAN_WHEAT
    );

    if (INTERFACE_FILE.VICTOR_WHEAT === max) {
      INTERFACE_FILE.VICTOR_WHEAT_POINTS = 10;
    } else {
      INTERFACE_FILE.VICTOR_WHEAT_POINTS = 0;
    }

    if (INTERFACE_FILE.SHINDI_WHEAT === max) {
      INTERFACE_FILE.SHINDI_WHEAT_POINTS = 10;
    } else {
      INTERFACE_FILE.SHINDI_WHEAT_POINTS = 0;
    }

    if (INTERFACE_FILE.RENAN_WHEAT === max) {
      INTERFACE_FILE.RENAN_WHEAT_POINTS = 10;
    } else {
      INTERFACE_FILE.RENAN_WHEAT_POINTS = 0;
    }
  }

  if (GOOD === GOODS.SILK) {
    const max = Math.max(
      INTERFACE_FILE.VICTOR_SILK,
      INTERFACE_FILE.SHINDI_SILK,
      INTERFACE_FILE.RENAN_SILK
    );

    if (INTERFACE_FILE.VICTOR_SILK === max) {
      INTERFACE_FILE.VICTOR_SILK_POINTS = 10;
    } else {
      INTERFACE_FILE.VICTOR_SILK_POINTS = 0;
    }

    if (INTERFACE_FILE.SHINDI_SILK === max) {
      INTERFACE_FILE.SHINDI_SILK_POINTS = 10;
    } else {
      INTERFACE_FILE.SHINDI_SILK_POINTS = 0;
    }

    if (INTERFACE_FILE.RENAN_SILK === max) {
      INTERFACE_FILE.RENAN_SILK_POINTS = 10;
    } else {
      INTERFACE_FILE.RENAN_SILK_POINTS = 0;
    }
  }
}

export default new GoodsService();
