export default class Youtube {
  constructor(apiClient) {
    console.log(apiClient)
    this.apiClient = apiClient;
  }

  // 공개 함수
  async search (keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
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