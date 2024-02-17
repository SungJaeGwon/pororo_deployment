import React from 'react';
import './scss/search.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PwSearchResultComponent () {

    const location = useLocation();
    const navigate = useNavigate();

    const onClickSignIn=()=>{
        navigate('/sub7SignIn');
    }

    return (
        <div id='search'>
            <div className="container">
                <div className="title">
                    <h2>비밀번호 찾기 결과</h2>
                </div>
                <div className="content">
                    <h3>고객님 비밀번호 찾기가 완료 되었습니다.</h3>
                    <div className="result_box">
                        <p>저희 쇼핑몰을 이용해주셔서 감사합니다. <br /> 고객님의 비밀번호는 다음과 같습니다.</p>
                        <div className="user_description pw">
                            <span>비밀번호</span><strong>: {location.state.pw}</strong>
                        </div>
                    </div>
                    <div className="button_box">
                        <button onClick={onClickSignIn} className='signIn'>로그인</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
