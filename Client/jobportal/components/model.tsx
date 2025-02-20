interface ModelProps{
    children:React.ReactNode;
    onClose: () => void;
    isVisible:boolean;
}
const Model:React.FC<ModelProps> = ({isVisible, onClose, children}) => {
    if( !isVisible ) return null;
    return (
        <div className="fixed inset-0  z-10 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="w-[700px] flex flex-col">
                <button className="text-white font-bold text-4xl place-self-end" onClick={() => onClose()}>X</button>
                <div className="bg-secondary rounded">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Model