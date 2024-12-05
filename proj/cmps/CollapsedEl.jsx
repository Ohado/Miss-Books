const { useState, useEffect } = React

export function CollapsedEl({ colHeader, ExtState }) {
    const [isExtended, setIsExtended] = useState(false)

    useEffect(() => {
        
    }, [])

    function onExtendChange(){
        setIsExtended(!isExtended)
    }

    return (
        <div className="collapsed-el">
            <div className="collapse-header">
                <button className="coll-button" onClick={onExtendChange}>
                    {colHeader}
                    <span>▼</span>
                </button>
            </div>
            {isExtended &&  ExtState
            }
        </div>
    )
}

