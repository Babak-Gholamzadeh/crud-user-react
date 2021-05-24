import { useState } from 'react';
import axios from 'axios';

const useApi = makeReqOptions => {
  const [state, setState] = useState({
    loading: false
  });

  const callApi = async (...args) => {
    setState({
      loading: true,
    });

    try {
      const data = await axios(makeReqOptions(...args)).then(({data}) => data);
      setState({
        loading: false,
        data,
      });
    } catch(error) {
      setState({
        loading: false,
        error,
      });
    }
  };

  return [state, callApi];
};

export default useApi;
