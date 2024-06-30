import { Button, ButtonProps } from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { dicDataType } from "@/data/dictionaries/dicDataType"


interface Props extends ButtonProps {
    dataType: number,
    nullable: boolean,
}
export function BtnDataType({ nullable, dataType, children, ...props }: Props) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    {...props}
                >
                    {children}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Data type</h4>
                        <p className="text-sm text-muted-foreground">
                            {`${dicDataType[dataType] || ''} ${nullable ? 'NULL' : 'NOT NULL'}`}
                        </p>
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    )
}
