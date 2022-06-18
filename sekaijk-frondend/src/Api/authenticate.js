import axios from 'axios'
import enviroment from '../env'

export default {
    login: async (body)=>{
        return await axios.post(`${enviroment.url}/login`, body)
    }
}