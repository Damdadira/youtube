import axios from 'axios';

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: import.meta.env.VITE_SOME_KEY }
    })
  }

  async search(params) {
    return this.httpClient.get('search', params);
  }

  async videos(params) {
    return this.httpClient.get('videos', params);
  }

  async channels(params) {
    return this.httpClient.get('channels', params);
  }

  async commentThreads(params) {
    return this.httpClient.get('commentThreads', params);
  }
}