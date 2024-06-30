import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContext } from "react"
import { SprManagerContext } from "./context/SprManagerContext"
import { Input } from "@/components/ui/input"
import { Icon } from "@iconify/react/dist/iconify.js";
import { optionsButtons } from "./optionsButtons"
import { onImportProps } from "./interfaces"
import { TooltipComingSoon } from "@/components/global/TooltipComingSoon"


interface Props {
  onImport: (props: onImportProps) => void
}

export const SprManagerOptions = ({ onImport }: Props) => {
  const { state: { namesWorksheets, indexCurrentWorksheet, rows, columns }, dispatch } = useContext(SprManagerContext);

  const handleClickImport = () => {
    onImport?.({
      columns,
      rows
    });
  }
  return (
    <CardContent className="border-t pt-2 lg:flex gap-4">
      <div className="lg:w-3/5 mb-2">
        <div className="flex mb-2">
          <Select disabled={rows[0].length === 0} value={indexCurrentWorksheet?.toString()}>
            <SelectTrigger className="w-72">
              <SelectValue placeholder="Select worksheet" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  namesWorksheets.length > 0
                    ?
                    namesWorksheets.map((ws, index) => (
                      <SelectItem key={index} value={index.toString()}>{ws}</SelectItem>
                    ))
                    :
                    <SelectLabel>no worksheet found</SelectLabel>
                }

              </SelectGroup>
            </SelectContent>
          </Select>
          <TooltipComingSoon>
            <Input disabled={true || rows[0].length === 0} placeholder="Search column" type="search" />
          </TooltipComingSoon>
        </div>
        <div className="grid grid-cols-3 md:flex md:flex-nowrap gap-2">
          {
            optionsButtons.map(({ title, icon, action }, index) => (
              title == 'Uppercase' || title == 'LoweCase' ?
                <Button
                  key={index}
                  disabled={rows[0].length === 0}
                  // Apuntes
                  className="h-20 w-full flex-grow hover:bg-foreground flex flex-col" size="icon"
                  onClick={() => dispatch(action)}
                >
                  <Icon className="text-2xl" icon={icon} /> {title}
                </Button>
                : <TooltipComingSoon>
                  <span className=" w-full">
                    <Button
                      key={index}
                      disabled={true}
                      // Apuntes
                      className="h-20 w-full flex-grow hover:bg-foreground flex flex-col" size="icon"
                      onClick={() => dispatch(action)}
                    >
                      <Icon className="text-2xl" icon={icon} /> {title}
                    </Button>
                  </span>
                </TooltipComingSoon>
            ))
          }
        </div>
      </div>
      <div className="lg:w-2/5">
        <div className="mb-2">
          <Button
            disabled={rows[0].length === 0}
            className="w-full hover:bg-foreground"
            onClick={handleClickImport}
          >
            Import rows and columns
          </Button>

        </div>
        <div className="flex gap-2">
          <TooltipComingSoon>
            <Input disabled={true || rows[0].length === 0} type="text" placeholder="Replace" />
          </TooltipComingSoon>
          <TooltipComingSoon>
            <Input disabled={true || rows[0].length === 0} type="text" placeholder="Substitution" />
          </TooltipComingSoon>
        </div>
        <TooltipComingSoon>
          <span className="w-full">
            <Button
              disabled={true || rows[0].length === 0}
              className="w-full"
              variant="outline"

            >
              Replace All
            </Button>
          </span>
        </TooltipComingSoon>

      </div>
    </CardContent>
  )
}
