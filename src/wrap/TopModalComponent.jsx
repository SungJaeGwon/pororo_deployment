import React from 'react';
import './scss/TopModalComponent.scss';
import { topModal } from '../reducer/topModal';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export default function TopModalComponent () {

    const dispatch = useDispatch();

    const onClickCloseBtn=(e)=>{
        e.preventDefault();
        let expires = 1;
        let toDay = new Date();
        toDay.setDate( toDay.getDate() + expires );

        const obj = {
            id: `TOPMODAL`,
            expires: toDay.getTime()
        }
        localStorage.setItem('PORORO_TOP_MODAL_KEY', JSON.stringify(obj) );

        dispatch(topModal(false));
    }

    return (
        <div id='topModal'>
            <div className="container">
                <div className="content">
                    <a href="!#"><span>첫 구매를 가볍게:) 회원가입 혜택 더보기+</span></a>
                    <button onClick={onClickCloseBtn} className='topModalBtn'></button>
                </div>
            </div>
        </div>
    );
};
