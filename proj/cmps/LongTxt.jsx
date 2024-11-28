const { useState, useEffect } = React

export function LongTxt({ txt, length=100 }) {
    const [isExtended, setIsExtended] = useState(false)

    useEffect(() => {
        
    }, [])

    function onExtendChange(){
        setIsExtended(!isExtended)
    }

    return (
        <div className="long-txt">
            {isExtended ?
                <p>
                    {txt.substring(0, length)}
                    ...<a onClick={onExtendChange}>read more</a>
                </p>
                :
                <p>
                    {txt}
                    <a onClick={onExtendChange}>read less</a>
                </p>
            }
        </div>
    )
}

