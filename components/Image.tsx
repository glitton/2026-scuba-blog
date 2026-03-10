import NextImage, { ImageProps } from 'next/image'

const Image = ({ src, ...rest }: ImageProps) => {
  const s =
    typeof src === 'string'
      ? src.startsWith('http')
        ? src
        : src.startsWith('/')
          ? src
          : '/' + src
      : src
  return <NextImage src={s} {...rest} />
}

export default Image
