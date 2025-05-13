import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Comments({ videoId }) {
  const { youtube } = useYoutubeApi();
  const { isLoading, error, data: comments } = useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => youtube.getComments(videoId),
    staleTime: 1000 * 60 * 5
  });

  return (
    <section className='mt-4'>
      <h3 className='font-bold text-lg mb-2'>댓글</h3>
      {isLoading && <p>Loading comments...</p>}
      {error && <p>Failed to load comments 😢</p>}
      <ul className='space-y-4'>
        {comments.map(item => {
        const comment = item.snippet.topLevelComment.snippet;
        return (
          <li key={item.id}>
            <p>{comment.authorDisplayName}: {comment.textDisplay}</p>
            {item.replies?.comments && (
              <ul className='ml-4 border-l pl-2'>
                {item.replies.comments.map(reply => (
                  <li key={reply.id}>
                    <p>{reply.snippet.authorDisplayName}: {reply.snippet.textDisplay}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
      </ul>
    </section>
  )
}