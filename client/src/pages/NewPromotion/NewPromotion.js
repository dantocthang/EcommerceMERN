import React from 'react'

import PromotionForm from '../../components/PromotionForm'

import classNames from 'classnames/bind';
import styles from './NewPromotion.module.scss';
const cl = classNames.bind(styles);

function NewPromotion() {
    return (
        <div className={cl('wrapper')}>
            <div className={`grid wide`}>
                <div className={cl('title')}>Thêm chương trình khuyến mãi</div>
                <PromotionForm></PromotionForm>
            </div>
        </div>
    )
}

export default NewPromotion