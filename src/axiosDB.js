import axios from "axios";

class axiosDB {
  constructor() {
    this.apiJsonDb = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async postUser(dados) {
    try{
      await this.apiJsonDb.post("/users",dados)
    }catch(error){
      console.error(error)
    }
  }

  async getByEmail(email) {
    try{
      const response = await this.apiJsonDb.get(`/users?email=${email}`)

      if (response.data.length === 0){
        console.error("Usuário não encontrado")
        return null
      }
      return response.data[0]
    }catch(error) {
      console.error(error)
    }
  }
}

export default new axiosDB();
