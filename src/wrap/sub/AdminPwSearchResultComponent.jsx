import React from 'react';
import './scss/search.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminPwSearchResultComponent () {

    const location = useLocation();
    const navigate = useNavigate();

    const onClickSignIn=()=>{
        navigate('/adminSignIn');
    }

    return (
        <div id='search'>
            <div className="container">
                <div className="title">
                    <h2>관리자 비밀번호 찾기 결과</h2>
                </div>
                <div className="content">
                    <h3>비밀번호 찾기가 완료 되었습니다.</h3>
                    <div className="result_box">
                        <p>항상 수고해주셔서 감사합니다. <br /> 비밀번호는 다음과 같습니다.</p>
                        <div className="user_description pw">
                            <span>비밀번호</span><strong>: {location.state.pw}</strong>
                        </div>
                    </div>
                    <div className="button_box">
                        <button onClick={onClickSignIn} className='signIn'>관리자 로그인</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
