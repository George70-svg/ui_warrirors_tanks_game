import { useParams } from 'react-router-dom'

export function ForumTopicPage() {
  const params = useParams()
  return <div>ForumTopicPage: {params.topicId}</div>
}
