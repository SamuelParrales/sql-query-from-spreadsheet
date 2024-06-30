import { NavBar } from "@/components/layouts/NavBar";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar/>
      {
        children
      }
    </>

  )
}
