import React from 'react';
import './scss/confirmModal.scss';
import { useDispatch,useSelector } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function ConfirmModal () {
    

    const confirmModalMethod=(value, msg)=>{
        const obj = {
            isConfirmModal: value,
            confirmMsg: msg,
            isSignInOk: false
        }
        dispatch(confirmModal(obj));
    }

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    // 인증 모달창 닫기
    const onClickClose=(e)=>{
        e.preventDefault();
        confirmModalMethod(false);
    }

    return (
        <div id='confirmModal'>
            <div className="container">
                <div className="content">
                    <div className="title">
                        <h3>인증번호</h3>
                        {
                            selector.confirmModal.confirmMsg.split('\n').map((item)=>{
                                return (
                                    <h2 key={item}>{item}</h2>
                                )
                            })
                        }
                    </div>
                    <ul className="text_box">
                        <li><h4>발급된 인증번호를</h4></li>
                        <li><h4>닫기 버튼을 누른 후</h4></li>
                        <li><h4>인증번호 확인 상자에 입력해주세요.</h4></li>
                    </ul>
                    <button onClick={onClickClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};
