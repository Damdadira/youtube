import axios from 'axios';

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: import.meta.env.VITE_SOME_KEY }
    })
  }

  async search (keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  // 앞에 #붙이면 private 함수
  async #searchByKeyword(keyword){
    return this.httpClient
      .get('search', { 
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          q: keyword
        }
      })
      .then(res => res.data.items)
      .then(items => items.map(item => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular(){
    return this.httpClient
      .get('videos', { 
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular'
        }
      })
      .then(res => res.data.items);
  }
}