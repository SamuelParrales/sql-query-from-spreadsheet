import { Card } from "@/components/ui/card"
import { QueryGeneratorProvider } from "./context/QueryGeneratorProvider"
import { DbTableQuery } from "./interfaces"

interface Props {
    className?: string,
    children: JSX.Element | JSX.Element[],
    tableQuery: DbTableQuery[]
}

export const QueryGeneratorCard = ({ className, children, tableQuery }: Props) => {
    return (
        <QueryGeneratorProvider
            data={tableQuery}
        >
            <Card className={className}>
                {children}
            </Card>
        </QueryGeneratorProvider>
    )
}
