import MatchService from './MatchService';

import { FEATURES } from '../../types/feature';

class MonasteryService {
  async addMonastery(obj) {
    const POINTS = {
      TURN: 0,
      PLAYER: obj.player,
      FEATURE: FEATURES.MONASTERY,
      MEEPLE: obj.meeple,
      FAIRY: obj.fairy,
      TILES: obj.tiles,
      FEATURE_POINTS: 0,
      TOTAL_POINTS: 0,
    };

    POINTS.FEATURE_POINTS += POINTS.TILES;

    if (POINTS.FAIRY) {
      POINTS.TOTAL_POINTS += 3;
    }

    POINTS.TOTAL_POINTS += POINTS.FEATURE_POINTS;

    MatchService.endTurn(POINTS);
  }

  async addGarden(obj) {
    const POINTS = {
      TURN: 0,
      PLAYER: obj.player,
      FEATURE: FEATURES.GARDEN,
      MEEPLE: obj.meeple,
      FAIRY: obj.fairy,
      TILES: obj.tiles,
      FEATURE_POINTS: 0,
      TOTAL_POINTS: 0,
    };

    POINTS.FEATURE_POINTS += POINTS.TILES;

    if (POINTS.FAIRY) {
      POINTS.TOTAL_POINTS += 3;
    }

    POINTS.TOTAL_POINTS += POINTS.FEATURE_POINTS;

    MatchService.endTurn(POINTS);
  }
}

export default new MonasteryService();
