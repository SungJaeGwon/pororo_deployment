import React from 'react';
import './scss/Sub7Signin.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminsignIn } from '../../reducer/adminsignIn';
import { signIn } from '../../reducer/signIn';
import { messageModal } from '../../reducer/messageModal';
import axios from 'axios';

export default function AdminSigninComponent () {

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
        navigate('/adminSignUp');
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
        formData.append('adminId', state.id);
        formData.append('adminPw', state.pw);
        
        axios({
            url: 'https://gwonsj94.co.kr/pororo/pororo_admin_signIn.php',
            method: 'POST',
            data: formData
        })
        .then(( res )=>{
            console.log(res);
            console.log(res.data);
            if( res.status===200 ){
                if( res.data!=='' ){
                    let toDay = new Date();
                    toDay.setDate( toDay.getDate() +3 );

                    const adminSignInData = {
                        name: res.data.이름,
                        hp: res.data.휴대폰,
                        birth: res.data.생년월일,
                        id : res.data.아이디,
                        pw: res.data.비밀번호,
                        address: res.data.주소,
                        email: res.data.이메일,
                        회원등급: '관리자',
                        expires: toDay.getTime()
                    }
                    localStorage.setItem('PORORO_ADMIN_SIGNIN_DATA', JSON.stringify(adminSignInData));
                    localStorage.removeItem('PORORO_SIGNIN_DATA');
                    dispatch(signIn(null));
                    dispatch(adminsignIn(adminSignInData));
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
                    <h2>Admin 로그인</h2>
                </div>
                <div className="content">
                    <form onSubmit={onsubmitForm}>
                        <div className="form_box">
                            <ul className='input_box'>
                                <li>
                                    <label htmlFor="adminId">ID</label>
                                    <input 
                                        type="text"
                                        name='adminId'
                                        id='adminId'
                                        placeholder='관리자 아이디'
                                        value={state.id}
                                        onChange={onChangeId}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="adminPw">PASSWORD</label>
                                    <input 
                                        type="password"
                                        name='adminPw'
                                        id='adminPw'
                                        placeholder='관리자 비밀번호'
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
                                <li><Link to="/adminidsearch">관리자 아이디 찾기</Link></li>
                                <li><em>/</em></li>
                                <li><Link to="/adminpwsearch">관리자 비밀번호 찾기</Link></li>
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
                            ><span>관리자 로그인</span></button>
                        </div>
                    </form>
                    <div className="signup_btn" onClick={onClicksignUp}>
                        <button>관리자 회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
