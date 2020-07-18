import axios from 'axios';
import { TOKEN_IN_STORAGE } from './App.js';

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class JoblyApi {

  static async request(endpoint, params = {}, verb = "get"){
    let _token = localStorage.getItem(TOKEN_IN_STORAGE);
    // Only for test purpose: hard coded token for a test user"
    // params._token = ( 
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvZyIsImlzX2FkbWluIjpmYWxzZ"+
    // "SwiaWF0IjoxNTk0OTQ1NTY4fQ.KJ6CKLgPc6jbXQX3nSwiIZFmfKXncDhFKm-U3iDK9og");

    console.debug("API call:", endpoint, params, verb);

    let req;
    if (verb === "get"){
      req = axios.get(`${BASE_URL}/${endpoint}`, { params: {_token, ...params}});
    } else if (verb === "post"){
      req = axios.post(`${BASE_URL}/${endpoint}`, {_token, ...params});
    } else if (verb === "patch"){
      req = axios.patch(`${BASE_URL}/${endpoint}`, {_token, ...params});
    }

    try {
      return (await req).data;
    } catch (err) {
      console.error("API communication error: ", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  
  static async register(data){
    let response = await this.request(`users`, data, "post");
    return response.token;
  }

  static async login(data){
    let response = await this.request(`login`, data, "post");
    return response.token;
  }

  static async updateUser(username, data){
    let response = await this.request(`users/${username}`, data, "patch");
    return response.user;
  }

  static async getCurrentUser(username){
    let response = await this.request(`users/${username}`);
    return response.user;
  }

  static async getCompanies(search){
    let response = await this.request(`companies`, { search });
    return response.companies;
  }
  
  static async getCompany(handle){
    let response = await this.request(`companies/${handle}`);
    return response.company;
  }

  static async getJobs(search){
    let response = await this.request(`jobs`, { search });
    return response.jobs;
  }

  static async applyToJob(id){
    let response = await this.request(`jobs/${id}/apply`, {}, "post");
    return response.message;
  }
}

export default JoblyApi;