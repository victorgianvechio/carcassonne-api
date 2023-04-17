import MatchService from './MatchService';

import { FEATURES } from '../../types/feature';

class FarmService {
  async addFarm(obj) {
    const POINTS = {
      TURN: 0,
      PLAYER: obj.player,
      FEATURE: FEATURES.FARM,
      MEEPLE: obj.meeple,
      FAIRY: obj.fairy,
      COMPLETED_CITIES: obj.completed_cities,
      CASTLES: obj.castles,
      PIG: obj.pig,
      FEATURE_POINTS: 0,
      TOTAL_POINTS: 0,
    };

    if (!POINTS.PIG) {
      POINTS.FEATURE_POINTS = POINTS.COMPLETED_CITIES * 3 + POINTS.CASTLES * 4;
    } else {
      POINTS.FEATURE_POINTS = POINTS.COMPLETED_CITIES * 4 + POINTS.CASTLES * 5;
    }

    if (POINTS.FAIRY) {
      POINTS.TOTAL_POINTS += 3;
    }

    POINTS.TOTAL_POINTS += POINTS.FEATURE_POINTS;

    MatchService.endTurn(POINTS);
  }

  async addMamada(obj) {
    const POINTS = {
      TURN: 0,
      PLAYER: obj.player,
      FEATURE: FEATURES.MAMADA,
      MEEPLE: obj.meeple,
      FAIRY: obj.fairy,
      COMPLETED_CITIES: obj.completed_cities,
      CASTLES: obj.castles,
      PIG: obj.pig,
      FEATURE_POINTS: 0,
      TOTAL_POINTS: 0,
    };

    if (!POINTS.PIG) {
      POINTS.FEATURE_POINTS = POINTS.COMPLETED_CITIES * 1 + POINTS.CASTLES * 2;
    } else {
      POINTS.FEATURE_POINTS = POINTS.COMPLETED_CITIES * 2 + POINTS.CASTLES * 3;
    }

    if (POINTS.FAIRY) {
      POINTS.TOTAL_POINTS += 3;
    }

    POINTS.TOTAL_POINTS += POINTS.FEATURE_POINTS;

    MatchService.endTurn(POINTS);
  }

  async addBarn(obj) {
    const POINTS = {
      TURN: 0,
      PLAYER: obj.player,
      FEATURE: FEATURES.BARN,
      COMPLETED_CITIES: obj.completed_cities,
      CASTLES: obj.castles,
      FEATURE_POINTS: 0,
      TOTAL_POINTS: 0,
    };

    POINTS.FEATURE_POINTS = POINTS.COMPLETED_CITIES * 4 + POINTS.CASTLES * 5;

    POINTS.TOTAL_POINTS += POINTS.FEATURE_POINTS;

    InterfaceService.endTurn(POINTS);
  }
}

export default new FarmService();
