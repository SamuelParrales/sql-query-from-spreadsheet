class AlertDialog {
    //@ts-expect-error no init
    #buttonShow:HTMLButtonElement;  

    #open(){
        return new Promise((resolve)=>{
            if(!this.#buttonShow){
                this.#buttonShow = document.getElementById('btn-show-dialog') as HTMLButtonElement;
            }
            this.#buttonShow.click();
            resolve(undefined); 
        })
    }
    #getElements = ()=>{
            const buttonCancel = document.querySelector('.alert-dialog__btn-action-cancel') as HTMLButtonElement;
            const buttonNo = document.querySelector('.alert-dialog__btn-action-no') as HTMLButtonElement;
            const buttonYes = document.querySelector('.alert-dialog__btn-action-yes') as HTMLButtonElement;
            const htmlDescription = document.getElementById('alert-dialog__description') as HTMLParagraphElement;
            const htmlTitle = document.getElementById('alert-dialog__title') as HTMLHeadingElement;

            return{
                buttonCancel,
                buttonNo,
                buttonYes,
                htmlDescription,
                htmlTitle,
            }

    }
    async confirm({description,title}:fnConfirmProps){
        await this.#open();
        const {htmlDescription,htmlTitle} = this.#getElements()
    
        htmlTitle.textContent = title;
        htmlDescription.textContent = description;
        return new Promise<AlertDialogResponse>((resolve)=>{
            const onClickAction = ({target}:MouseEvent)=>{
                //@ts-expect-error no soport yet
                if(!target.matches('[class~="alert-dialog__btn-action"]')) return;    
                
                document.removeEventListener('click',onClickAction)
               //@ts-expect-error no soport yet
                resolve({action:target.value})
            }
            document.addEventListener('click',onClickAction)
        })
    }
}

const singleton = (()=>{
    let instance:AlertDialog;
    return ()=>{

        if(!instance){
            instance = new AlertDialog()
        }

        return instance;
    }
})()

export const DialogAction = singleton();


