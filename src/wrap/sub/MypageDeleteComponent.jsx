import React from 'react';
import './scss/signOutModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signOutModal } from '../../reducer/signOut';
import { messageModal } from '../../reducer/messageModal';
import { signUpModal } from '../../reducer/signUpModal';



export default function MypageDeleteComponent() {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const okModalMethod=(msg)=>{
        const obj = {
            isOkModal: true,
            isOkMsg:msg,
        }
        dispatch(signUpModal(obj));
    }

    const onClickcencel=(e)=>{
        e.preventDefault();
        dispatch(signOutModal(false));
    }

    const onClicksignOut=(e)=>{
        e.preventDefault();
        if(localStorage.getItem('PORORO_SIGNIN_DATA')!==null){
            dispatch(signUpModal(true));
            okModalMethod('정말로 뽀로로몰 회원을 탈퇴하시겠습니까?');
        }
    }

    return (
        <div id='signOut'>
            <div className="container">
                <div className="modal">
                    <div className="title">
                        <h2>회원탈퇴</h2>
                        <button onClick={onClickcencel}>닫기</button>
                    </div>
                    <div className="content">
                        <div className="middle">
                            <ul>
                                <li><span>혜택내역</span><p>탈퇴하면 적립금이 삭제 됩니다. 현재 적립금 : </p><strong> &nbsp;&nbsp;&nbsp;&nbsp;2000원</strong></li>
                            </ul>
                        </div>
                        <div className="text">
                            <h3>회원탈퇴 사유</h3>
                        </div>
                        <div className="bottom">
                            <span>선택</span>
                            <select name="signout" id="signout">
                                <option value="-선택하세요-" selected>-선택하세요-</option>
                                <option value="상품종류가 부족하다">상품종류가 부족하다</option>
                                <option value="상품가격이 비싸다">상품가격이 비싸다</option>
                                <option value="상품가격에 비해 품질이 떨어진다">상품가격에 비해 품질이 떨어진다</option>
                                <option value="배송이 느리다">배송이 느리다</option>
                                <option value="반품/교환이 불만이다">반품/교환이 불만이다</option>
                                <option value="상담원 고객응대 서비스가 불만이다">상담원 고객응대 서비스가 불만이다</option>
                                <option value="쇼핑몰 혜택이 부족하다 (쿠폰, 적립금,할인 등)">쇼핑몰 혜택이 부족하다 (쿠폰, 적립금,할인 등)</option>
                                <option value="이용빈도가 낮다">이용빈도가 낮다</option>
                                <option value="개인정보 유출이 염려된다">개인정보 유출이 염려된다</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>
                        <div className="button_box">
                            <button onClick={onClicksignOut} className='signOut_btn'>탈퇴</button>
                            <button onClick={onClickcencel}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
