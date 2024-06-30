interface Props {
    className: string;
  }
  export const H2 = ({className}: Props) => {
    return (
      <h2 className={`text-primary ${className}`}></h2>
    )
  }
  