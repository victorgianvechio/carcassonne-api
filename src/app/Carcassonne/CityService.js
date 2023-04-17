import WatchtowerServce from './WatchtowerService';
import MatchService from './MatchService';

import { FEATURES } from '../../types/feature';

class CityService {
  async addCity(obj) {
    const POINTS = {
      TURN: 0,
      PLAYER: obj.player,
      FEATURE: FEATURES.CITY,
      MEEPLE: obj.meeple,
      FAIRY: obj.fairy,
      WITCH: obj.witch,
      MAGE: obj.mage,
      TILES: obj.tiles,
      SHIELDS: obj.shields,
      CATHEDRAL: obj.cathedral,
      WATCHTOWER_FEATURE: obj.watchtower_feature,
      WATCHTOWER_QUANTITY: obj.watchtower_quantity,
      FEATURE_POINTS: 0,
      WATCHTOWER_POINTS: 0,
      TOTAL_POINTS: 0,
    };

    if (!POINTS.CATHEDRAL) {
      POINTS.FEATURE_POINTS = (POINTS.TILES + POINTS.SHIELDS) * 2;
    } else {
      POINTS.FEATURE_POINTS = (POINTS.TILES + POINTS.SHIELDS) * 3;
    }

    if (POINTS.MAGE) {
      POINTS.FEATURE_POINTS += POINTS.TILES;
    }

    if (POINTS.WITCH) {
      POINTS.FEATURE_POINTS /= 2;
      POINTS.FEATURE_POINTS = Math.floor(POINTS.FEATURE_POINTS);
    }

    if (POINTS.WATCHTOWER_FEATURE) {
      POINTS.WATCHTOWER_POINTS = await WatchtowerServce.calc(
        POINTS.WATCHTOWER_FEATURE,
        POINTS.WATCHTOWER_QUANTITY
      );
    }

    if (POINTS.FAIRY) {
      POINTS.TOTAL_POINTS += 3;
    }

    POINTS.TOTAL_POINTS += POINTS.FEATURE_POINTS + POINTS.WATCHTOWER_POINTS;

    MatchService.endTurn(POINTS);
  }
}

export default new CityService();
