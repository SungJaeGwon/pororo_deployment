import React, { useState } from 'react';
import './scss/search.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { messageModal } from '../../reducer/messageModal';
import axios from 'axios';

export default function PwSearchComponent () {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        isEmailSearch: true,
        isHpSearch : false,
        name: '',
        email: '',
        hp: '',
        id: '',
        signupDate: '',
        isButtonOff: false,
        isButtonOff2: false
    })

    const messageModalMethod=(msg)=>{
        const obj = {
            isMessageModal: true,
            isMsg: msg
        }
        dispatch(messageModal(obj));
    }

    const onChangeId=(e)=>{
        setState({
            ...state,
            id: e.target.value
        })
    }
    const onChangeEmail=(e)=>{
        let isButtonOff = false;
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        if ( regexp.test(e.target.value)===false) {
            isButtonOff = false;
        }
        else {
            isButtonOff = true;
        }
        setState({
            ...state,
            email: e.target.value,
            isButtonOff: isButtonOff
        })
    }
    // 아이디, 이름, 이메일 
    React.useEffect(()=>{

        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        
        let isButtonOff = false;
        if(state.id==='' || regexp.test(state.email)===false){
            isButtonOff = false;
        }
        else {         
            isButtonOff = true;
        }
        setState({
            ...state,
            isButtonOff: isButtonOff
        });
        return;

    },[state.id, state.email]);


    // 비밀번호 찾기
    const onClickIdSearch=(e)=>{
        e.preventDefault();
        if( state.id==='' ){
            messageModalMethod('아이디을 입력해 주세요.')
        }
        else if(state.email===''){
            messageModalMethod('이메일을 입력해 주세요.')
        }
        else {
            let formData = new FormData();
            formData.append('userId', state.id );
            formData.append('userEmail', state.email );

            axios({
                url: 'https://gwonsj94.co.kr/pororo/pororo_pw_search.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if( res.status===200 ) {
                    navigate('/pwsearchResult', {
                        state: {
                            pw: res.data.비밀번호
                        }
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    return (
        <div id='search'>
            <div className="container">
                <div className="title">
                    <h2>비밀번호 찾기</h2>
                </div>
                <div className="content">
                    <form>
                        <ul>
                            <li>
                                <label htmlFor="userName">아이디</label>
                                <input 
                                    type="text" 
                                    name='userId' 
                                    id='userId' 
                                    placeholder='아이디을 입력해 주세요'
                                    maxLength={16}
                                    onChange={onChangeId}
                                    value={state.id}
                                />
                            </li>
                            <li>
                                <label htmlFor="userEmail">이메일</label>
                                <input 
                                    type="text" 
                                    name='userEmail' 
                                    id='userEmail'  
                                    placeholder='이메일을 입력해 주세요'
                                    onChange={onChangeEmail}
                                    value={state.email}
                                />
                            </li>
                            <li>
                                <button
                                    type='submit'
                                    id='submitBtn'
                                    name='submitBtn'
                                    value={'비밀번호 찾기'}
                                    className={state.isButtonOff?'':'off'}
                                    disabled={!state.isButtonOff}
                                    onClick={onClickIdSearch}
                                >비밀번호 찾기</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    );
};
