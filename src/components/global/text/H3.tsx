interface Props {
    className: string;
  }
  export const H3 = ({className}: Props) => {
    return (
      <h3 className={`text-primary ${className}`}></h3>
    )
  }
  