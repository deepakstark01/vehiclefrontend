const midRoute = "/api/v1";


let baseURL = '';
// if (window.location.href.includes('')) {

//   } else {
    baseURL = import.meta.env.VITE_REACT_APP_API_SERVER_PRODUCTION;
//   }
const allUrl = {
    baseURL: `${baseURL}${midRoute}`,
    mainUrl: baseURL,
  };
  
  export default allUrl;