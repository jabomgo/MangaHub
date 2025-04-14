import axios from 'axios'

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

export default apiMangaDex
