const BASE_URL = process.env.REACT_APP_SERVER_URL;

const APIs = {
  CREATE_ONE_USER(data) {
    return {
      baseURL: BASE_URL,
      method: 'POST',
      url: '/users',
      data,
    };
  },
  GET_ALL_USERS(params) {
    return {
      baseURL: BASE_URL,
      method: 'GET',
      url: '/users',
      params,
    };
  },
  GET_ONE_USER(userId) {
    return {
      baseURL: BASE_URL,
      method: 'GET',
      url: 'users/' + userId,
    };
  },
  UPDATE_ONE_USER(userId, data) {
    return {
      baseURL: BASE_URL,
      method: 'PUT',
      url: 'users/' + userId,
      data,
    };
  },
  DELETE_ONE_USER(userId) {
    return {
      baseURL: BASE_URL,
      method: 'DELETE',
      url: 'users/' + userId,
    };
  },
};

export default APIs;
