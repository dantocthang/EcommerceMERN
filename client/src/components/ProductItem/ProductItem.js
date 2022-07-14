import React, { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import formatCurrency from '../../utils/formatCurrentcy'
import { useStore } from '../../store/UserContext'
import { addToCart } from '../../store/actions'
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
const cl = classNames.bind(styles);

function ProductItem({ data }, ref) {
  const [, dispatch] = useStore()
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(data))
  }

  return (
    <div ref={ref} className={cl('wrapper')}>
      <div className={cl('img-wrapper')}>
        <img src={data.photos[0]?.url || "https://dl.airtable.com/.attachments/14ac9e946e1a02eb9ce7d632c83f742f/4fd98e64/product-1.jpeg"} alt="" className={cl('img')} />
        <div className={cl('options')}>
          {data.stock > 0 ? (<span onClick={handleAddToCart} className={cl('icon-wrapper')}>
            <FontAwesomeIcon className={cl('options-icon')} icon={faCartPlus} />
          </span>) : <div className={cl('sold-out')}>Sold out</div>}
        </div>
      </div>
      <div className={cl('info')}>
        <div className={cl('name')}>{data.name || 'Loading'}</div>
        <div className={cl('price')}>{formatCurrency(data.price) || 'Loading'}</div>
      </div>
    </div>
  )
}

// ProductItem.propTypes = {
//   data: PropTypes.object.isRequired,
// }

export default forwardRef(ProductItem)