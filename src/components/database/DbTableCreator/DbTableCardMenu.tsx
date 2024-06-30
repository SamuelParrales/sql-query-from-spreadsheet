import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface Props {
    children: JSX.Element | JSX.Element[],
    onClickModify: () => void,
    onClickDelete: () => void,
}
export function DbTableCardMenu({ children, onClickModify, onClickDelete }: Props) {
    return (
        <ContextMenu>
            <ContextMenuTrigger >
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem onClick={onClickModify} className="cursor-pointer" inset>
                    Modify columns

                </ContextMenuItem>
                <ContextMenuItem
                    className="cursor-pointer"
                    inset
                    onClick={onClickDelete}
                >
                    Delete table
                </ContextMenuItem>

            </ContextMenuContent>
        </ContextMenu>
    )
}
