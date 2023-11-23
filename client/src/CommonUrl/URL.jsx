import axios from "axios";

const instance =  axios.create({baseURL:"https://gathwal-memories-2.onrender.com/memories/"})
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
instance.defaults.withCredentials = true;

export default instance;


