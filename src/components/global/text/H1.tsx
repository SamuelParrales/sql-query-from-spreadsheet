interface Props {
  className: string;
}
export const H1 = ({className}: Props) => {
  return (
    <h1 className={`text-primary ${className}`}></h1>
  )
}
