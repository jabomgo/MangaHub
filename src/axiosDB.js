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

  async getByEmail(email, senha) {
    try{
      const response = await this.apiJsonDb.get(`/users?email=${email}`)
      const data = response.data[0]

      if (response.data.length === 0){
        console.error("Usuário não encontrado")
        return null
      }

      if(data.senha === senha){
        console.log("sucesso no login")
        return data
      }

      console.log("Email ou senha errados")
      return null
    }catch(error) {
      console.error(error)
    }
  }
}

export default new axiosDB();
