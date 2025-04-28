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
    try {
      await this.apiJsonDb.post("/users", dados);
    } catch (error) {
      console.error(error);
    }
  }

  async getByEmail(email) {
    try {
      const response = await this.apiJsonDb.get(`/users?email=${email}`);

      if (response.data.length === 0) {
        console.error("Usuário não encontrado");
        return null;
      }
      return response.data[0];
    } catch (error) {
      console.error(error);
    }
  }

  async postFavoritoManga(dados) {
    try {
      await this.apiJsonDb.post("/users", dados);
    } catch (error) {
      console.error(error);
    }
  }

  async DeletFavorito(email, mangaId) {
    try {
      const response = await this.apiJsonDb.get(`/users?email=${email}&mangaId=${mangaId}`);
      const data = response.data;
      if (data.length === 0) {
        console.error("favorito não encontrado");
        return null;
      }
      const idFav = data[1];
      const id = idFav.id;
      console.log(id);
      await this.apiJsonDb.delete(`/users/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async getMangaByEmail(email) {
    try {
      const response = await this.apiJsonDb.get(`/users?email=${email}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new axiosDB();
