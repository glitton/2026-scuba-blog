import { FC } from 'react'

const YouTube: FC<{ embedId: string }> = ({ embedId }) => {
  return (
    <div>
      <iframe
        width="100%"
        height="450"
        src={'https://www.youtube.com/embed/' + embedId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  )
}
export default YouTube
