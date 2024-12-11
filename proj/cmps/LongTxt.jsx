const { useState, useEffect } = React

export function LongTxt({ txt, length=100 }) {
    const [isExtended, setIsExtended] = useState(false)

    function onExtendChange(){
        setIsExtended(!isExtended)
    }

    return (
        <span className="long-txt">
            {isExtended ?
                <span>
                    {txt}
                    {' '}<a onClick={onExtendChange}>read less</a>
                </span>
                :
                <span>
                    {txt.substring(0, length)}
                    ...<a onClick={onExtendChange}>read more</a>
                </span>
            }
        </span>
    )
}

