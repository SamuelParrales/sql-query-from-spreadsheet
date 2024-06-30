import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
export const Dialog = () => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button id="btn-show-dialog" className="hidden"></button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dialog-">
                <AlertDialogHeader>
                    <AlertDialogTitle id="alert-dialog__title"></AlertDialogTitle>
                    <AlertDialogDescription id="alert-dialog__description">
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* <button></button> */}
                    <AlertDialogAction className="alert-dialog__btn-action alert-dialog__btn-action-yes" value={'yes'}>Yes</AlertDialogAction>
                    <AlertDialogCancel className="alert-dialog__btn-action alert-dialog__btn-action-cancel" value={'cancel'}>Cancel</AlertDialogCancel>
                    {/* <AlertDialogAction className="alert-dialog__btn-action alert-dialog__btn-action-no" value={'no'}>No</AlertDialogAction> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
