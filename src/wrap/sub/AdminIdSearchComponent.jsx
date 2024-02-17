import React, { useState } from 'react';
import './scss/search.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { messageModal } from '../../reducer/messageModal';
import axios from 'axios';

export default function AdminIdSearchComponent () {

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

    // 탭메뉴
    const onClickTab=(e, p)=>{
        e.preventDefault();
        let isEmailSearch = true;
        let isHpSearch = false;

        if(p==='email') {
            isEmailSearch = true;
            isHpSearch = false;
        }
        else if ( p==='hp') {
            isEmailSearch = false;
            isHpSearch = true;
        }
        setState({
            ...state,
            isEmailSearch: isEmailSearch,
            isHpSearch: isHpSearch
        })
    }

    const onChangeName=(e)=>{
        setState({
            ...state,
            name: e.target.value
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
    const onChangeHp=(e)=>{
        const regExp1 = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/g;
        const regExp2 = /[^\d]/g;
        let hp = '';
        let isButtonOff2 = false;

        hp = e.target.value.replace(regExp2, '');
        if( hp==='' || regExp1.test(hp)===false) {
            isButtonOff2 = false;
        }
        else {
            isButtonOff2 = true;
        }
        setState({
            ...state,
            hp: e.target.value,
            isButtonOff2: isButtonOff2
        })
    }

    // 이름, 이메일 
    React.useEffect(()=>{

        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        
        let isButtonOff = false;
        if(state.name==='' || regexp.test(state.email)===false){
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

    },[state.name, state.email]);

    // 이름, 휴대폰
    React.useEffect(()=>{

        let isButtonOff2 = false;
        const regExp1 = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/g;

        if(regExp1.test(state.hp)===true && state.name!==''){
            isButtonOff2 = true;           
        }
        else{            
            isButtonOff2 = false;            
        }

        setState({
            ...state,
            isButtonOff2: isButtonOff2
        });

        return;

    },[state.name, state.hp]);

    // 이름, 이메일 찾기
    const onClickIdSearch=(e)=>{
        e.preventDefault();
        if( state.name==='' ){
            messageModalMethod('이름을 입력해 주세요.')
        }
        else if(state.email===''){
            messageModalMethod('이메일을 입력해 주세요.')
        }
        else {
            let formData = new FormData();
            formData.append('adminName', state.name );
            formData.append('adminEmail', state.email );

            axios({
                url: 'https://gwonsj94.co.kr/pororo/pororo_admin_id_search_name_email.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                console.log(res.data)
                if( res.status===200 ) {
                    navigate('/adminidsearchresult', {
                        state: {
                            id: res.data.아이디,
                            name: res.data.이름,
                            hp: res.data.휴대폰번호
                        }
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    // 이름, 휴대폰 찾기
    const onClickIdSearch2=(e)=>{
        e.preventDefault();
        if( state.name==='' ){
            messageModalMethod('이름을 입력해 주세요.')
        }
        else if(state.hp===''){
            messageModalMethod('휴대폰번호를 입력해 주세요.')
        }
        else {
            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;
            let formData = new FormData();
            formData.append('adminName', state.name );
            formData.append('adminHp', state.hp.replace(regExp, '$1-$2-$3'));
            
            axios({
                url: 'https://gwonsj94.co.kr/pororo/pororo_admin_id_search_name_hp.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if( res.status===200 ) {
                    navigate('/adminidsearchresult', {
                        state: {
                            id: res.data.아이디,
                            signupDate: res.data.가입일,
                            name: res.data.이름,
                            hp: res.data.휴대폰번호
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
                    <h2>Admin 아이디 찾기</h2>
                </div>
                <div className="content">
                    <div className="tab_button_box">
                        <button onClick={(e)=>onClickTab(e, 'email')} className={state.isEmailSearch ? 'on' : ''}>이메일</button>
                        <button onClick={(e)=>onClickTab(e, 'hp')} className={state.isHpSearch ? 'on' : ''}>휴대폰 번호</button>
                    </div>
                    {
                        state.isEmailSearch && (
                            <form>
                                <ul>
                                    <li>
                                        <label htmlFor="adminName">관리자 이름</label>
                                        <input 
                                            type="text" 
                                            name='adminName' 
                                            id='adminName' 
                                            placeholder='이름을 입력해 주세요'
                                            maxLength={16}
                                            onChange={onChangeName}
                                            value={state.name}
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="adminEmail">관리자 이메일</label>
                                        <input 
                                            type="text" 
                                            name='adminEmail' 
                                            id='adminEmail'  
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
                                            value={'아이디 찾기'}
                                            className={state.isButtonOff?'':'off'}
                                            disabled={!state.isButtonOff}
                                            onClick={onClickIdSearch}
                                        >아이디 찾기</button>
                                    </li>
                                </ul>
                            </form>
                        )
                    }
                    {
                        state.isHpSearch && (
                            <form>
                                <ul>
                                    <li>
                                        <label htmlFor="adminName">관리자 이름</label>
                                        <input 
                                            type="text" 
                                            name='adminName' 
                                            id='adminName' 
                                            placeholder='이름을 입력해 주세요'
                                            onChange={onChangeName}
                                            value={state.name}
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="adminEmail">관리자 휴대폰번호</label>
                                        <input 
                                            type="text" 
                                            name='adminHp' 
                                            id='adminHp'  
                                            placeholder='휴대폰 번호를 입력해 주세요'
                                            onChange={onChangeHp}
                                            value={state.hp}
                                        />
                                    </li>
                                    <li>
                                        <button
                                            type='submit'
                                            id='submitBtn'
                                            name='submitBtn'
                                            value={'아이디 찾기'}
                                            className={state.isButtonOff2?'':'off'}
                                            disabled={!state.isButtonOff2}
                                            onClick={onClickIdSearch2}
                                        >아이디 찾기</button>
                                    </li>
                                </ul>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
