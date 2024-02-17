import React from 'react';
import './scss/search.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export default function IdSearchResultComponent () {

    const location = useLocation();
    const navigate = useNavigate();

    const onClickSignIn=()=>{
        navigate('/sub7SignIn');
    }
    const onClickPwsearch=()=>{
        navigate('/pwsearch');
    }

    return (
        <div id='search'>
            <div className="container">
                <div className="title">
                    <h2>아이디 찾기 결과</h2>
                </div>
                <div className="content">
                    <h3>고객님 아이디 찾기가 완료 되었습니다.</h3>
                    <div className="result_box">
                        <p>저희 쇼핑몰을 이용해주셔서 감사합니다. <br /> 다음정보로 가입된 아이디가 총 1개 있습니다.</p>
                        <div className="user_description">
                            <div className="user_box">
                                <span><img src="./images/sub/search/icon_member.gif" alt="" /></span>
                            </div>
                            <ul>
                                <li><span>이름</span><strong>: {location.state.name}</strong></li>
                                <li><span>휴대폰번호</span><strong>: {location.state.hp}</strong></li>
                                <li><span>아이디</span><strong>: {location.state.id}</strong></li>
                                <li><span>가입일자</span><strong>: {location.state.signupDate}</strong></li>
                                <li><p>고객님 즐거운 쇼핑 하세요!</p></li>
                            </ul>
                        </div>
                    </div>
                    <div className="button_box">
                        <button onClick={onClickSignIn} className='signIn'>로그인</button>
                        <button onClick={onClickPwsearch}>비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
