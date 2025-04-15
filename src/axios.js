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

  // Requisisão que retorna mangas pesquisado pelo capítulo
  async searchManga(title) {
    try {
      const response = await this.apiMangaDex.get(`/manga?title=${title}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar manga:', error)
      throw error
    }
  }

  // Requisição para pegar fileName do manga
  async getFileCover(coveId) {
    try {
      const response = await this.apiMangaDex.get(`/cover/${coveId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao obter coverID:', error)
      throw error
    }
  }

  // Requisição para pegar imagem de capa do manga
  async getCoverArt(mangaId, fileName) {
    try {
      const response = await this.uploadMangaDex.get(`/covers/${mangaId}/${fileName}`, {
        responseType: 'blob',
      })
      const coverUrl = URL.createObjectURL(response.data)
      return coverUrl
    } catch (error) {
      console.error('Erro ao obter imagem da capa:', error)
      throw error
    }
  }

  // Requisição para pegar todos ids dos volumes e capítulos disponíveis. Obs: Não necessáriamente em Pt-br
  async getCapterVolume(mangaId) {
    try {
      const response = await this.apiMangaDex.get(`/manga/${mangaId}/aggregate`)
      return response.data
    } catch (error) {
      console.error('Erro ao obter os volumes e capítulos do manga: ', error)
      throw error
    }
  }

  // Requisição para pegar as URLs das páginas de capítulo escolhido
  async getCapterPage(capterId) {
    try {
      const response = await this.apiMangaDex.get(`/at-home/server/${capterId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao obter dados das páginas: ', error)
      throw error
    }
  }

  // Requisição para pegar imagem do capítulo do manga
  async getImagePage(pageId, hashId) {
    try {
      const response = await this.uploadMangaDex.get(`/data/${hashId}/${pageId}`, {
        responseType: 'blob',
      })
      const pageData = URL.createObjectURL(response.data)
      return pageData
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  // Requisição para pegar os volumes e capitulos em uma língua especifica
  async getCapterVolumeForLangage(mangaId, idioma) {
    try {
      const response = await this.apiMangaDex.get(
        `/manga/${mangaId}//feed?translatedLanguage[]=${idioma}`,
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default new axiosMangaDex()
