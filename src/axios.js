import axios from 'axios'

class axiosMangaDex {
  constructor() {
    this.uploadMangaDex = axios.create({
      baseURL: 'https://uploads.mangadex.org',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.apiMangaDex = axios.create({
      baseURL: 'https://api.mangadex.org',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async searchManga(title){
    try{
      const response = await this.apiMangaDex.get(`/manga?title=${title}`)
      return response.data
    } catch(error){
      console.error("Erro ao buscar manga:", error)
      throw error
    }
  }

  async getFileCover(coveId) {
    try{
      const response = await this.apiMangaDex.get(`/cover/${coveId}`)
      return response.data
    } catch(error){
      console.error("Erro ao obter coverID:", error)
      throw error
    }
  }

  async getCoverArt(mangaId, fileName) {
    try{
      const response = await this.uploadMangaDex.get(`/covers/${mangaId}/${fileName}`, {responseType: 'blob'})
      return response.data
    } catch(error){
      console.error("Erro ao obter imagem da capa:", error)
      throw error
    }
  }
}

export default new axiosMangaDex();
