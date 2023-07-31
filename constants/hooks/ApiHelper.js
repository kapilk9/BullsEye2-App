import axios from 'axios';

// Make a GET request
export const getData = async url => {

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getData2 = async url => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Make a POST request
export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log("check res",response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postData2 = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const postData3 = async (url, data, header) => {
  try {
    const response = await axios.post(url, data,header);
    console.log("check res",response)
    return response;
  } catch (error) {
    console.error(error);
  }
};