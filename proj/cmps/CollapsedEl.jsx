const { useState, useEffect } = React

export function CollapsedEl({ colState, extState }) {
    const [isExtended, setIsExtended] = useState(false)

    useEffect(() => {
        
    }, [])

    function onExtendChange(){
        setIsExtended(!isExtended)
    }

    return (
        <div className="collapsed-el">
            <div className="collapse-header">
                <button className="coll-button" onClick={onExtendChange}>{colState}</button>
                {/* <div>▼</div> */}
            </div>
            {isExtended ?
                extState
                :
                ''
            }
        </div>
    )
}

