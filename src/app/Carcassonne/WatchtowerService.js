import { WATCHTOWER } from '../../types/watchtower';

class WatchtowerService {
  WATCHTOWER_POINTS = 0;

  async calc(WATCHTOWER_FEATURE, QUANTITY) {
    if (
      WATCHTOWER_FEATURE === WATCHTOWER.CITY ||
      WATCHTOWER_FEATURE === WATCHTOWER.ROAD
    ) {
      this.WATCHTOWER_POINTS = QUANTITY;
      return this.WATCHTOWER_POINTS;
    }

    if (WATCHTOWER_FEATURE === WATCHTOWER.MONASTERY) {
      this.WATCHTOWER_POINTS = QUANTITY * 3;
      return this.WATCHTOWER_POINTS;
    }

    if (WATCHTOWER_FEATURE === WATCHTOWER.MEEPLE) {
      this.WATCHTOWER_POINTS = QUANTITY * 2;
      return this.WATCHTOWER_POINTS;
    }
  }
}

export default new WatchtowerService();
