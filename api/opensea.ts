import axios from "axios";

const apiKey = process.env.OPENSEA_API_KEY;

export async function getCollections() {
  const res = await axios.get(
    "https://api.opensea.io/api/v2/collections?chain_identifier=ethereum&limit=16",
    {
      headers: {
        Accept: "application/json",
        "X-Api-Key": "77b3d0e57b5e40cfadec9911b8b870fd",
      },
    }
  );

  return res.data.collections;
}
