import React from 'react';
import './scss/search.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminIdSearchResultComponent () {

    const location = useLocation();
    const navigate = useNavigate();

    const onClickSignIn=()=>{
        navigate('/adminSignIn');
    }
    const onClickPwsearch=()=>{
        navigate('/adminpwsearch');
    }

    return (
        <div id='search'>
            <div className="container">
                <div className="title">
                    <h2>관리자 아이디 찾기 결과</h2>
                </div>
                <div className="content">
                    <h3>관리자님 아이디 찾기가 완료 되었습니다.</h3>
                    <div className="result_box">
                    <p>항상 수고해주셔서 감사합니다. <br /> 아이디는 다음과 같습니다.</p>
                        <div className="user_description">
                            <div className="user_box">
                                <span><img src="./images/sub/search/icon_member.gif" alt="" /></span>
                            </div>
                            <ul className='admin'>
                                <li><span>이름</span><strong>: {location.state.name}</strong></li>
                                <li><span>휴대폰번호</span><strong>: {location.state.hp}</strong></li>
                                <li><span>아이디</span><strong>: {location.state.id}</strong></li>
                                <li><p>오늘도 수고하세요!</p></li>
                            </ul>
                        </div>
                    </div>
                    <div className="button_box">
                        <button onClick={onClickSignIn} className='signIn'>관리자 로그인</button>
                        <button onClick={onClickPwsearch}>관리자 비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
