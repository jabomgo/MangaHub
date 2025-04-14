import axios from 'axios'

const uploadMangaDex = axios.create({
  baseURL: 'https://uploads.mangadex.org',
  headers: {
    'Content-Type': 'application/json',
  },
})

const apiMangaDex = axios.create({
  baseURL: 'https://api.mangadex.org',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiMangaDex.getHomeTitles = async function () {
  const response = await this.get('/manga')
  return response.data
}

apiMangaDex.SearchManga = async function (title) {
  const response = await this.get(`/manga?title=${title}`)
  return response.data
}

apiMangaDex.getFileCover = async function (coverId) {
  const response = await this.get(`/cover/${coverId}`)
  return response.data
}

uploadMangaDex.getCoverArt = async function (idManga, fileName) {
  const response = await this.get(`/covers/${idManga}/${fileName}`)
  return response.data
}

export default {apiMangaDex, uploadMangaDex}
