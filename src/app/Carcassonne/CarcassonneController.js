import MatchService from './MatchService';
import RoadService from './RoadService';
import CityService from './CityService';
import MonasteryService from './MonasteryService';
import FarmService from './FarmService';
import CastleService from './CastleService';
import GoldService from './GoldService';
import GoodsService from './GoodsService';

class CarcassonneController {
  async getInterface(req, res) {
    const INTERFACE_FILE = await MatchService.getInterface();
    res.status(200).json(INTERFACE_FILE);
  }

  async newMatch(req, res) {
    const { date, match_number } = req.body;

    if (!date || !match_number) {
      return res.status(422).json({
        success: false,
        message: 'missing "date" and "match_number" parameters',
      });
    }

    const result = await MatchService.newMatch(date, match_number);

    if (result.success) {
      return res.status(200).json({ success: true, message: result.message });
    }

    return res.status(400).json({ success: false, message: result.message });
  }

  async loadMatch(req, res) {
    const { date } = req.body;
    const result = await MatchService.loadMatch(date);
    return res.status(200).json(result);
  }

  async endRound(req, res) {
    await MatchService.endRound();
    res.status(200).json({ success: true, message: 'added +1 round' });
  }

  async road(req, res) {
    await RoadService.addRoad(req.body);
    return res.status(200).json({ success: true, message: 'added road' });
  }

  async city(req, res) {
    await CityService.addCity(req.body);
    return res.status(200).json({ success: true, message: 'added city' });
  }

  async farm(req, res) {
    await FarmService.addFarm(req.body);
    return res.status(200).json({ success: true, message: 'added farm' });
  }

  async mamada(req, res) {
    await FarmService.addMamada(req.body);
    return res.status(200).json({ success: true, message: 'added mamada' });
  }

  async barn(req, res) {
    await FarmService.addBarn(req.body);
    return res.status(200).json({ success: true, message: 'added barn' });
  }

  async monastery(req, res) {
    await MonasteryService.addMonastery(req.body);
    return res.status(200).json({ success: true, message: 'added monatery' });
  }

  async garden(req, res) {
    await MonasteryService.addGarden(req.body);
    return res.status(200).json({ success: true, message: 'added garden' });
  }

  async castle(req, res) {
    await CastleService.addCastle(req.body);
    return res.status(200).json({ success: true, message: 'added castle' });
  }

  async moveFairy(req, res) {
    await MatchService.moveFairy(req.body.player);
    return res
      .status(200)
      .json({ success: true, message: `fairy moved to ${req.body.player}` });
  }

  async countConstructor(req, res) {
    await MatchService.countConstructor(req.body.player);
    return res.status(200).json({
      success: true,
      message: `added +1 constructor to ${req.body.player}`,
    });
  }

  async addCity(req, res) {
    await MatchService.addCity();
    return res.status(200).json({
      success: true,
      message: 'added +1 city',
    });
  }

  async removeCity(req, res) {
    await MatchService.removeCity();
    return res.status(200).json({
      success: true,
      message: 'removed -1 city',
    });
  }

  async addRoad(req, res) {
    await MatchService.addRoad();
    return res.status(200).json({
      success: true,
      message: 'added +1 road',
    });
  }

  async removeRoad(req, res) {
    await MatchService.removeRoad();
    return res.status(200).json({
      success: true,
      message: 'removed -1 road',
    });
  }

  async addFairyPoint(req, res) {
    await MatchService.addFairyPoint(req.body.player);
    return res.status(200).json({
      success: true,
      message: `added +1 fairy point to ${req.body.player}`,
    });
  }

  async removeFairyPoint(req, res) {
    await MatchService.removeFairyPoint(req.body.player);
    return res.status(200).json({
      success: true,
      message: `removed -1 fairy point to ${req.body.player}`,
    });
  }

  async addGold(req, res) {
    await GoldService.addGold(req.body.player);
    return res.status(200).json({
      success: true,
      message: `added +1 gold to ${req.body.player}`,
    });
  }

  async removeGold(req, res) {
    await GoldService.removeGold(req.body.player);
    return res.status(200).json({
      success: true,
      message: `removed -1 gold to ${req.body.player}`,
    });
  }

  async addBarrel(req, res) {
    await GoodsService.addBarrel(req.body.player);
    return res.status(200).json({
      success: true,
      message: `added +1 barrel to ${req.body.player}`,
    });
  }

  async removeBarrel(req, res) {
    await GoodsService.removeBarrel(req.body.player);
    return res.status(200).json({
      success: true,
      message: `removed -1 barrel to ${req.body.player}`,
    });
  }

  async addWheat(req, res) {
    await GoodsService.addWheat(req.body.player);
    return res.status(200).json({
      success: true,
      message: `added +1 wheat to ${req.body.player}`,
    });
  }

  async removeWheat(req, res) {
    await GoodsService.removeWheat(req.body.player);
    return res.status(200).json({
      success: true,
      message: `removed -1 wheat to ${req.body.player}`,
    });
  }

  async addSilk(req, res) {
    await GoodsService.addSilk(req.body.player);
    return res.status(200).json({
      success: true,
      message: `added +1 silk to ${req.body.player}`,
    });
  }

  async removeSilk(req, res) {
    await GoodsService.removeSilk(req.body.player);
    return res.status(200).json({
      success: true,
      message: `removed -1 silk to ${req.body.player}`,
    });
  }
}

export default new CarcassonneController();
