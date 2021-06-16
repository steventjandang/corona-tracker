import axios from "axios";

const URL = "https://apicovid19indonesia-v2.vercel.app/api/indonesia";

export const fetchData = async () => {
  try {
    const {
      data: {
        positif: confirmed,
        sembuh: recovered,
        meninggal: deaths,
        lastUpdate,
      },
    } = await axios.get(URL);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${URL}/harian`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.positif,
      deaths: dailyData.meninggal,
      recovered: dailyData.sembuh,
      date: dailyData.tanggal,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProvinceData = async (province) => {
  try {
    const { data } = await axios.get(`${URL}/provinsi/more`);
    for (const {
      provinsi: name,
      kasus: confirmed,
      sembuh: recovered,
      meninggal: deaths,
      last_death: lastUpdate,
    } of data) {
      if (name === province) {
        return { confirmed, recovered, deaths, lastUpdate };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchProvinceName = async () => {
  try {
    const { data } = await axios.get(`${URL}/provinsi`);
    return data.map((datum) => datum.provinsi).sort();
  } catch (error) {
    console.log(error);
  }
};
