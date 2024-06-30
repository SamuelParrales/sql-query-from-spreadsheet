import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const TooltipComingSoon = ({ children }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p> Not yet available, coming soon</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
