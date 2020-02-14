import React from 'react'

const classType = {
    primary: 'btn-primary',
    secondary:'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    info: 'btn-info',
    warning: 'btn-warning',
    light: 'btn-light',
    dark: 'btn-dark',
    link: 'btn-link'
}



const Button = ({className, text}) => (
<button className={classType[className]}>{text}</button>
)

export default Button

