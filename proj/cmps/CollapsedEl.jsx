const { useState, useEffect } = React

export function CollapsedEl({ className, colHeader, ExtState }) {
    const [isExtended, setIsExtended] = useState(false)

    function onExtendChange(){
        setIsExtended(!isExtended)
    }

    return (
        <div className={"collapsed-el " + className}>
            <div className="collapse-header"  onClick={onExtendChange}>
                <h2> {colHeader} </h2>
                <span style={{fontSize: '25px'}}>{isExtended ? '▲' : '▼'}</span>
            </div>
            {isExtended && ExtState
            }
        </div>
    )
}

