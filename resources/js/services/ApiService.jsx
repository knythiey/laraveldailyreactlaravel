import axios from "axios";

const BASE_URL = 'http://laravel9react18.test/';
// const ACCESS_TOKEN = 'access_token';

//default axios configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Accept'
  },
  withCredentials: true
});

export const get = async (url, data) => {
  try {
    // let access_token = localStorage.getItem(is_company ? COMPANY_REGISTRATION_TOKEN : ACCESS_TOKEN);
    let access_token = false;
    let headers = {};

    if (access_token) {
      headers["Authorization"] = `Bearer ${access_token}`;
    }

    let response = await axiosInstance({
      'method': 'GET',
      'url': url,
      'headers': headers,
      'params': data
    });

    return Promise.resolve(response);

  } catch (err) {
    return Promise.reject(err);
  }
}

export const post = async (url, data) => {
  try {
    // let access_token = localStorage.getItem(is_company ? COMPANY_REGISTRATION_TOKEN : ACCESS_TOKEN);
    let access_token = false,
      headers = {};
    if (access_token) {
      headers["Authorization"] = `Bearer ${access_token}`;
    }

    let response = await axiosInstance({
      'method': 'POST',
      'url': url,
      'headers': headers,
      'data': data
    });

    return Promise.resolve(response);

  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export const patch = async (url, data) => {
  try {
    // let access_token = localStorage.getItem(is_company ? COMPANY_REGISTRATION_TOKEN : ACCESS_TOKEN);
    let access_token = false,
      headers = {};
    if (access_token) {
      headers["Authorization"] = `Bearer ${access_token}`;
    }

    let response = await axiosInstance({
      'method': 'PATCH',
      'url': url,
      'headers': headers,
      'data': data
    });

    return Promise.resolve(response);

  } catch (err) {
    return Promise.reject(err);
  }
}

export const destroy = async (url, data) => {
  try {
    // let access_token = localStorage.getItem(ACCESS_TOKEN);
    let access_token = false,
      headers = {};

    if (access_token) {
      headers["Authorization"] = "Bearer " + access_token;
    }

    let response = await axiosInstance({
      'method': 'DELETE',
      'url': url,
      'headers': headers,
      'data': data
    });

    return Promise.resolve(response);

  } catch (err) {
    return Promise.reject(err);
  }
}