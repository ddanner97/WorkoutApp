import React from 'react'
import '../static/styles/components/ErrorMessage/errorMessage.css'

function ErrorMessage({ variant, children }) {
    return (
        <div variant={variant} className="errorMessage">
            {children}
        </div>
    )
}

export default ErrorMessage
