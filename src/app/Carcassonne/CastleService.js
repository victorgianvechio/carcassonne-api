import MatchService from './MatchService';

import { FEATURES } from '../../types/feature';

class CastleService {
  async addCastle(obj) {
    const POINTS = {
      TURN: 0,
      PLAYER: obj.player,
      FEATURE: FEATURES.CASTLE,
      MEEPLE: obj.meeple,
      TOTAL_POINTS: obj.total_points,
    };

    MatchService.endTurn(POINTS);
  }
}

export default new CastleService();
