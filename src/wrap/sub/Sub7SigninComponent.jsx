import React from 'react';
import './scss/Sub7Signin.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../reducer/signIn';
import { adminsignIn } from '../../reducer/adminsignIn';
import { messageModal } from '../../reducer/messageModal';
import axios from 'axios';

export default function Sub7SigninComponent () {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        id: '',
        pw: '',
        submitBtn: true,
        signInData: {}
    });

    // 메세지모달 메소드
    const messageModalMethod=(msg)=>{
        const obj = {
            isMessageModal: true,
            isMsg: msg
        }
        dispatch(messageModal(obj));
    }

    const onClicksignUp=(e)=>{
        e.preventDefault();
        navigate('/sub7SignUp');
    }

    const onChangeId=(e)=>{
        setState({
            ...state,
            id: e.target.value
        })
    }
    const onChangePw=(e)=>{
        setState({
            ...state,
            pw: e.target.value
        })
    }
    
    React.useEffect(()=>{
        if( state.id!=='' && state.pw!=='' ){
            setState({
                ...state,
                submitBtn: false
            })
        }
        else {
            setState({
                ...state,
                submitBtn: true
            })
        }
    },[ state.id, state.pw])

    const onsubmitForm=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', state.id);
        formData.append('userPw', state.pw);
        
        axios({
            url: 'https://gwonsj94.co.kr/pororo/pororo_signIn.php',
            method: 'POST',
            data: formData
        })
        .then(( res )=>{
            if( res.status===200 ){
                if( res.data!=='' ){
                    let toDay = new Date();
                    toDay.setDate( toDay.getDate() +3 );

                    const signInData = {
                        name: res.data.이름,
                        hp: res.data.휴대폰,
                        birth: res.data.생년월일,
                        id : res.data.아이디,
                        pw: res.data.비밀번호,
                        address: res.data.주소,
                        email: res.data.이메일,
                        회원등급: '일반',
                        expires: toDay.getTime()
                    }
                    localStorage.setItem('PORORO_SIGNIN_DATA', JSON.stringify(signInData));
                    dispatch(signIn(signInData));
                    localStorage.removeItem('PORORO_ADMIN_SIGNIN_DATA');
                    dispatch(adminsignIn(null));
                    navigate('/index');
                }
                else {
                    messageModalMethod('로그인 정보를 확인하고 다시 시도해 주세요.');
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div id='signin'>
            <div className="container">
                <div className="title">
                    <h2>로그인</h2>
                </div>
                <div className="content">
                    <form onSubmit={onsubmitForm}>
                        <div className="form_box">
                            <ul className='input_box'>
                                <li>
                                    <label htmlFor="userId">ID</label>
                                    <input 
                                        type="text"
                                        name='userId'
                                        id='userId'
                                        placeholder='아이디'
                                        value={state.id}
                                        onChange={onChangeId}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="userPw">PASSWORD</label>
                                    <input 
                                        type="password"
                                        name='userPw'
                                        id='userPw'
                                        placeholder='비밀번호'
                                        value={state.pw}
                                        onChange={onChangePw}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="search_box">
                            <div className="left">
                                <input type="checkbox" name='checkbox' id='checkbox' className='check' />
                                <label htmlFor="checkbox">아이디저장</label>
                                <img src="./images/sub7/icon_security.gif" alt="" />
                            </div>
                            <ul className='right'>
                                <li><Link to="/idsearch">아이디 찾기</Link></li>
                                <li><em>/</em></li>
                                <li><Link to="/pwsearch">비밀번호 찾기</Link></li>
                            </ul>
                        </div>
                        <div className="sns">
                            <a href="!#">
                                <img src="./images/sub7/icon_naver_login.gif" alt="" />
                            </a>
                            <a href="!#">
                                <img src="./images/sub7/icon_kakao_login.gif" alt="" />
                            </a>
                        </div>
                        <div className="button_box">
                            <button 
                                type='submit'
                                disabled={state.submitBtn}
                                className={state.submitBtn===true ? '' : 'on'}
                            ><span>로그인</span></button>
                        </div>
                    </form>
                    <div className='text_box'>
                        <p>아직 회원이 아니신가요?</p>
                        <p>회원가입을 하시면 다양하고 특별한 혜택이 준비되어 있습니다.</p>
                    </div>
                    <div className="signup_btn" onClick={onClicksignUp}>
                        <button>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
