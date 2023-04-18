const API_BASE_URL = 'http://168.138.141.170:6060/api/v1/carcassonne';

(async function () {
  console.log('Executou');
  await getInterface();

})();



async function getInterface() {
  try {
    const response = await axios.post(API_BASE_URL + '/interface', {});
    // const response = await axios.get('http://localhost:6060/api/v1');

    // PONTOS
    $("#total_points_victor").val(response.data.VICTOR_POINTS);
    $("#total_points_shindi").val(response.data.SHINDI_POINTS);
    $("#total_points_renan").val(response.data.RENAN_POINTS);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // NUMERO DE CASTELOS E CIDADES
    $("#city_points").text('Cidades: ' + response.data.CITIES);
    $("#road_points").text('Ruas: ' + response.data.ROADS);
    $("#biggest_city").text(response.data.BIGGEST_CITY + ' tiles');
    $("#biggest_road").text(response.data.BIGGEST_ROAD + ' tiles');
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // OURO E ESPECIARIAS
    $("#ouro-victor").text('Ouro: ' + response.data.VICTOR_GOLD + ' ~ ' + response.data.VICTOR_GOLD_POINTS + ' pts');
    $("#barril-victor").text('Barril: ' + response.data.VICTOR_BARREL + ' ~ ' + response.data.VICTOR_BARREL_POINTS + ' pts');
    $("#trigo-victor").text('Trigo: ' + response.data.VICTOR_WHEAT + ' ~ ' + response.data.VICTOR_WHEAT_POINTS + ' pts');
    $("#seda-victor").text('Seda: ' + response.data.VICTOR_SILK + ' ~ ' + response.data.VICTOR_SILK_POINTS + ' pts');

    $("#ouro-shindi").text('Ouro: ' + response.data.SHINDI_GOLD + ' ~ ' + response.data.SHINDI_GOLD_POINTS + ' pts');
    $("#barril-shindi").text('Barril: ' + response.data.SHINDI_BARREL + ' ~ ' + response.data.SHINDI_BARREL_POINTS + ' pts');
    $("#trigo-shindi").text('Trigo: ' + response.data.SHINDI_WHEAT + ' ~ ' + response.data.SHINDI_WHEAT_POINTS + ' pts');
    $("#seda-shindi").text('Seda: ' + response.data.SHINDI_SILK + ' ~ ' + response.data.SHINDI_SILK_POINTS + ' pts');

    $("#ouro-renan").text('Ouro: ' + response.data.RENAN_GOLD + ' ~ ' + response.data.RENAN_GOLD_POINTS + ' pts');
    $("#barril-renan").text('Barril: ' + response.data.RENAN_BARREL + ' ~ ' + response.data.RENAN_BARREL_POINTS + ' pts');
    $("#trigo-renan").text('Trigo: ' + response.data.RENAN_WHEAT + ' ~ ' + response.data.RENAN_WHEAT_POINTS + ' pts');
    $("#seda-renan").text('Seda: ' + response.data.RENAN_SILK + ' ~ ' + response.data.RENAN_SILK_POINTS + ' pts');

    // FADA
    $("#fada-victor").text('Fada: ' + response.data.VICTOR_FAIRY_ROUND + ' ~ ' + response.data.VICTOR_FAIRY_FEATURE + ' pts');
    $("#fada-shindi").text('Fada: ' + response.data.SHINDI_FAIRY_ROUND + ' ~ ' + response.data.SHINDI_FAIRY_FEATURE + ' pts');
    $("#fada-renan").text('Fada: ' + response.data.RENAN_FAIRY_ROUND + ' ~ ' + response.data.RENAN_FAIRY_FEATURE + ' pts');
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function addCity() {
  try {
    await axios.post(API_BASE_URL + '/addCity', {});
    await getInterface();   
  } catch (error) {
    console.error(error);
  }
}

async function removeCity() {
  try {
    await axios.post(API_BASE_URL + '/removeCity', {});
    await getInterface();   
  } catch (error) {
    console.error(error);
  }
}

async function addRoad() {
  try {
    await axios.post(API_BASE_URL + '/addRoad', {});
    await getInterface();   
  } catch (error) {
    console.error(error);
  }
}

async function removeRoad() {
  try {
    await axios.post(API_BASE_URL + '/removeRoad', {});
    await getInterface();   
  } catch (error) {
    console.error(error);
  }
}

async function addFairy(player) {
  try {
    await axios.post(API_BASE_URL + '/addFairyPoint', {player});
    await getInterface();   
  } catch (error) {
    console.error(error);
  }
}

async function removeFairy(player) {
  try {
    await axios.post(API_BASE_URL + '/removeFairyPoint', {player});
    await getInterface();   
  } catch (error) {
    console.error(error);
  }
}