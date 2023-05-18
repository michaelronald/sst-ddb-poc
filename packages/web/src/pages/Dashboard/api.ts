import axios from "axios";

export const getDashboardDetails = async () => {
  const { data: res } = await axios.get(
    import.meta.env.VITE_APP_API_URL + "/dashboard-details"
  );

  return res.data;
};
