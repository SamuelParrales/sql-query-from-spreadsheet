import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";


interface Props {
    className?: string;
    onLoadFile?: (file: File) => void,
    name?: string
}
export const UploadFile = ({ className, onLoadFile, name = undefined }: Props) => {
    const [hasEntered, setHasEntered] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const inputFile = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (!inputFile.current) return;

        inputFile.current.click();
    }
    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e?.target?.files) return;
        setFile(e.target.files[0]);

    }
    const handleDragEnter = () => {
        setHasEntered(true)
    }
    const handleDragLeave = () => {
        setHasEntered(false)
    }
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }
    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.items[0].getAsFile()!;
        setFile(file);
    }

    useEffect(() => {
        if (!file) return;

        onLoadFile?.(file)
    }, [file])

    return (
        <Card className={className}>
            <CardHeader >
                <CardTitle className="flex text-primary">
                    <Icon className="mt-0.5 me-1 text-green-950" icon="solar:upload-outline" /> Upload File
                </CardTitle>
                <input name={name} ref={inputFile} className="hidden" type="file" onChange={handleChangeFile} />
            </CardHeader>
            <CardContent className="h-3/4">
                <div
                    className={`min-h-36 cursor-pointer h-full border-4 border-dashed flex justify-center items-center ${hasEntered ? 'border-green-300 bg-green-50' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <div className="pointer-events-none">
                        {
                            file
                                ?
                                <div className="flex flex-col items-center">
                                    <Icon className="text-5xl" icon="file-icons:microsoft-excel" />
                                    <span className="text-foreground h-min">
                                        {file.name}
                                    </span>
                                </div>
                                : hasEntered
                                    ? <span>drop it here!</span>
                                    : <span className="text-foreground h-min">Choose or drag the spreadsheet here</span>
                        }
                    </div>

                </div>
            </CardContent>
        </Card >
    )
}
