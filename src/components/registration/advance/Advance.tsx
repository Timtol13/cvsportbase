import React from 'react'

type AdvanceProps ={
    role: string
}

export const Advance: React.FC<AdvanceProps> = ({role}) => {
    return (
        <div>
            {role}
        </div>
    )
}
