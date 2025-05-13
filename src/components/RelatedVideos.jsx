import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from './VideoCard';

export default function RelatedVideos({ channelId }) {
  const { youtube } = useYoutubeApi();
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['playlist', channelId],
    queryFn: () => youtube.searchByChannelId(channelId)
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong🤢</p>}
      {videos && (
        <ul>
          {videos.map(video => <VideoCard key={video.id} video={video} type='list' />)}
        </ul>
      )}
    </>
  )
}