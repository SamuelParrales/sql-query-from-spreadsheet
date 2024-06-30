import { CardContent } from '@/components/ui/card'
import { useContext } from 'react'
import { DbTableCreatorContext } from './context/DbTableCreatorContext'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { DialogAction } from '@/components/global/AlertDialog/DialogAction'





export const DbTableCreatorOptions = () => {
    const { dispatch, columns, onChange, isControlled } = useContext(DbTableCreatorContext)
    const handleClickAdd = () => {
        dispatch({ type: 'addNewTable' })
    }
    const handleClickClear = async () => {
        const { action } = await DialogAction.confirm({
            title: 'Are you absolutely sure?',
            description: 'This action cannot be undone. This will delete all your tables.',
        });
        if (action === 'yes') {

            onChange?.([])
            if (isControlled.current) {
                return;
            }
            dispatch({ type: 'clearTables' })

        }
    }
    return (
        <CardContent className="border-t border-b py-2 mb-4 flex gap-2">
            <Button
                className=""
                onClick={handleClickAdd}
                disabled={columns.length === 0}
            >
                <Icon className='me-1' icon="majesticons:table-plus-line" /> Add table
            </Button>
            <Button
                className=""
                onClick={handleClickClear}
                variant='destructive'
                disabled={columns.length === 0}

            >
                <Icon className='me-1' icon="tdesign:clear-formatting-1" /> Clear
            </Button>
        </CardContent>
    )
}
