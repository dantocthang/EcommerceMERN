import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

import classNames from 'classnames/bind';
import styles from './Button.module.scss';
const cl = classNames.bind(styles);


function Button({ to, onClick, leftIcon, className, filled, primary, children, ...passProps }) {
    let Comp = 'button'
    const classes = cl('wrapper', {
        filled,
        primary,
        [className]: className,
    })
    let props = {
        onClick,
        ...passProps
    }
    if (to) {
        Comp = Link
        props.to = to
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <FontAwesomeIcon className={cl('icon')} icon={leftIcon} />}
            {children}
        </Comp>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
    // leftIcon: PropTypes.element,
    className: PropTypes.string,
    filled: PropTypes.bool,
    primary: PropTypes.bool,
    children: PropTypes.node.isRequired
}

export default Button