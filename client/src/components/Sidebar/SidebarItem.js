import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
const cl = classNames.bind(styles);

function SidebarItem({ leftIcon, children, haveOption = false, path }) {
    return (
        <Link to={path || '/'} className={cl('sidebar-item')}>
            {leftIcon && <FontAwesomeIcon className={cl('item-left-icon')} icon={leftIcon} />}
            {children}
            {haveOption && <button><FontAwesomeIcon className={cl('options-icon')} icon={faEllipsis} /></button>}
        </Link>
    )
}

SidebarItem.propTypes = {
    children: PropTypes.node.isRequired,
    haveOption: PropTypes.bool,
    path: PropTypes.string.isRequired
}

export default SidebarItem