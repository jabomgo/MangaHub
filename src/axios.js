import axios from "axios";

class axiosMangaDex {
  constructor() {
    this.uploadMangaDex = axios.create({
      baseURL: "https://uploads.mangadex.org",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.apiMangaDex = axios.create({
      baseURL: "https://api.mangadex.org",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Requisição que retorna mangás pesquisados pelo título.
   * @param {string} title - O título do mangá a ser buscado.
   * @param {float} [limite=10] - Limite de quantos serão pesquisados (valor padrão é 10).
   * @param {number} [offset=0] - O número de páginas a ser usado para controle de offset de páginação (valor padrão é 0).
   * @returns {Promise<Object>} Os dados do mangá retornados pela API.
   */
  async searchManga(title, limite = 10, offset = 0) {
    try {
      const response = await this.apiMangaDex.get(`/manga?title=${title}`, {
        params: { limit: limite, offset: offset },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar manga:", error);
      throw error;
    }
  }

  /**
   * Requisição para pegar os dados de um cover usando seu ID.
   * @param {string} coveId - O ID do cover do mangá.
   * @returns {Promise<Object>} Os dados do cover retornados pela API.
   */
  async getFileCover(coveId) {
    try {
      const response = await this.apiMangaDex.get(`/cover/${coveId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter coverID:", error);
      throw error;
    }
  }

  /**
   * Requisição para pegar a imagem da capa do mangá.
   * @param {string} mangaId - O ID do mangá.
   * @param {string} fileName - O nome do arquivo da capa.
   * @returns {Promise<string>} A URL temporária da imagem da capa.
   */
  async getCoverArt(mangaId, fileName, width) {
    try {
      const response = await this.uploadMangaDex.get(
        `/covers/${mangaId}/${fileName}.${width}.jpg`,
        {
          responseType: "blob",
        },
      );
      const coverUrl = URL.createObjectURL(response.data);
      return coverUrl;
    } catch (error) {
      console.error("Erro ao obter imagem da capa:", error);
      throw error;
    }
  }

  /**
   * Requisição para pegar todos os IDs dos volumes e capítulos disponíveis.
   * Obs: Nem todos podem estar traduzidos para o português.
   * @param {string} mangaId - O ID do mangá.
   * @returns {Promise<Object>} Dados agregados dos volumes e capítulos.
   */
  async getCapterVolume(mangaId) {
    try {
      const response = await this.apiMangaDex.get(`/manga/${mangaId}/aggregate`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter os volumes e capítulos do manga: ", error);
      throw error;
    }
  }

  /**
   * Requisição para pegar as URLs das páginas do capítulo escolhido.
   * @param {string} capterId - O ID do capítulo.
   * @returns {Promise<Object>} Dados do servidor com as páginas do capítulo.
   */
  async getCapterPage(capterId) {
    try {
      const response = await this.apiMangaDex.get(`/at-home/server/${capterId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter dados das páginas: ", error);
      throw error;
    }
  }

  /**
   * Requisição para pegar a imagem de uma página do capítulo.
   * @param {string} pageId - O nome do arquivo da página.
   * @param {string} hashId - O hash do capítulo.
   * @returns {Promise<string>} A URL temporária da imagem da página.
   */
  async getImagePage(pageId, hashId) {
    try {
      const response = await this.uploadMangaDex.get(`/data/${hashId}/${pageId}`, {
        responseType: "blob",
      });
      const pageData = URL.createObjectURL(response.data);
      return pageData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Requisição para pegar os volumes e capítulos em uma língua específica.
   * @param {string} mangaId - O ID do mangá.
   * @param {string} idioma - O código da língua (ex: 'pt-br').
   * @returns {Promise<Object>} Feed com os capítulos traduzidos na língua escolhida.
   */
  async getCapterVolumeForLangage(mangaId, idioma) {
    try {
      const response = await this.apiMangaDex.get(
        `/manga/${mangaId}/feed?translatedLanguage[]=${idioma}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new axiosMangaDex();
