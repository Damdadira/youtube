export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  // 공개 함수
  async search (keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    return this.apiClient.channels({ 
      params: { part: 'snippet', id }})
      .then(res => res.data.items[0].snippet.thumbnails.default.url);
  }

  async searchByChannelId(channelId) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet', 
          channelId, 
          maxResults: 25, 
          order: 'date', 
          type: 'video'
        }
      })
      .then(res => res.data.items)
      .then(items => items.map(item => ({ ...item, id: item.id.videoId })));
  }

  async getComments(videoId) {
    return this.apiClient
      .commentThreads({
        params: {
          part: 'snippet,replies',
          videoId,
          maxResults: 20,
          order: 'relevance',
        }
      })
      .then(res => res.data.items);
  }

  // 앞에 #붙이면 private 함수(비공개 함수)
  async #searchByKeyword(keyword){
    return this.apiClient
      .search({
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
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular'
        }
      })
      .then(res => res.data.items);
  }
}