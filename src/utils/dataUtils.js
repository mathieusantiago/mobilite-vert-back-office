import axios from "axios";

const _get = async (method, url, data, _id, subId) => {
  return axios({
    method: method,
    url: `${process.env.REACT_APP_API_URL}${url}/${_id}${
      subId ? `/${subId}` : ""
    }`,
    data: data,
    withCredentials: true,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default _get;
