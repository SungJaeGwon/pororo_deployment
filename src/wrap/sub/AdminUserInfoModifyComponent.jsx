import React from 'react';
import './scss/adminUserinfoModify.scss';
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { messageModal } from '../../reducer/messageModal';
import { addressSearch } from '../../reducer/addressSearch';
import { address } from '../../reducer/address';
import axios from 'axios';

export default function AdminUserInfoModifyComponent(){
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const selector = useSelector((state)=>state);

    
    const [state, setState]= React.useState({
        id:'',
        pw:'',
        name: '',
        hp: '',
        email: '',
        address: '',
        birth: '',
        isDuplicationEmailCheck:true,
        newAddress:''
    });

    const addressReset=(reset)=>{
        const Reset = {
            isAddress: reset,
            isRemainingAddress: reset
        }
        dispatch(address(Reset));
    }

    React.useEffect(()=>{
        addressReset('');
    },[]);

    const [modalOpen,SetModalOpen]=React.useState(false);


     // 유저데이터 바인딩 디버깅
     React.useEffect(()=>{
        try{
            if(selector.address.isAddress!==''&&selector.address.isRemainingAddress!==''){
                setState({
                    ...state,
                    id:   location.state.아이디,
                    pw:   location.state.비밀번호,
                    name:   location.state.이름,
                    hp:   location.state.휴대폰,
                    email:   location.state.이메일,
                    address: selector.address.isAddress+" "+selector.address.isRemainingAddress,
                    birth:   location.state.생년월일
                });
            }
            else{
                setState({
                    ...state,
                    id:   location.state.아이디,
                    pw:   location.state.비밀번호,
                    name:   location.state.이름,
                    hp:   location.state.휴대폰,
                    email:   location.state.이메일,
                    address:   location.state.주소,
                    birth:   location.state.생년월일
                })    
            }
        }       
        catch(e){
            return;
        }
     },[selector.address.isAddress]);





      // 주소검색 API 열기
      const onClickPostcode=(e)=>{
        e.preventDefault();
        dispatch(addressSearch(true));
    }

     // 메세지모달 메소드
    const messageModalMethod=(msg)=>{
        const obj = {
            isMessageModal: true,
            isMsg: msg
        }
        dispatch(messageModal(obj));
    }

    // 비밀번호
    const onChangePw=(e)=>{
        const {value} = e.target;
        let pw = '';
        let pwGuideText1 = '';
        let pwGuideText2 = '';
        let pwGuideText3 = '';

        const regexp1 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\/|;:'",<.>?])+)|(?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\/|;:'",<.>?])+/g;
        const regexp2 = /(.)\1\1\1/g;
        const regexp3 = /^(.){8,16}$/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /\s/g;
        pw = value.replace(regexp4,'');
        if( regexp3.test(value)===false ){
            pwGuideText1 ='8자 이상 16자 이하로 입력해 주세요.';
        }
        else {
            pwGuideText1 = '';
        }

        if( regexp1.test(value)===false || regexp4.test(value)===true || regexp5.test(value)===true ){
            pwGuideText2 ='영문(소문자), 숫자, 특수문자(공백제외) 중 최소 2가지 이상조합  ';
        }
        else {
            pwGuideText2 = '';
        }

        if( regexp2.test(value)===true ){
            pwGuideText3 ='동일한 문자 4자리 이상 입력은 불가합니다.';
        }
        else {
            pwGuideText3 = '';
        }
        setState({
            ...state,
            pw: pw,
            pwGuideText1: pwGuideText1,
            pwGuideText2: pwGuideText2,
            pwGuideText3: pwGuideText3
        })
    }
   

    // 이름
    const onChangeName=(e)=>{
        let nameGuideText = '';
        let name = '';  
        const {value} = e.target;
        const regexp = /[`~!@#$%^&*()\-_=+[{\]}\\/|;:'",<.>?]/g;
        
        name = value.replace(regexp,'');
        
        if( name==='' ){ 
            nameGuideText ='이름을 입력해 주세요.';
        }
        else {
            nameGuideText = '';
        }
        setState({
            ...state,
            name: name,
            nameGuideText: nameGuideText
        })
    }

    // 이메일
    const onChangeEmail=(e)=>{
        const {value} = e.target;
        let emailGuideText = '';
        let isDuplicationEmailBtn = false;
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        
        if( value==='' ){
            emailGuideText = '이메일을 입력해 주새요.'; 
            isDuplicationEmailBtn = false;
        }
        else if( regexp.test(value)===false ){
            emailGuideText = '이메일 형식으로 입력해 주세요.';
            isDuplicationEmailBtn = false;
        }
        else {
            emailGuideText = '';
            isDuplicationEmailBtn = true;
        }
        setState({
            ...state,
            email: value,
            emailGuideText: emailGuideText,
            isDuplicationEmailBtn: isDuplicationEmailBtn
        })
    }

    // 이메일 중복 확인
    const onClickDuplicationEmail=(e)=>{
        e.preventDefault();
        const value = state.email;
        let emailGuideText = '';
        let isDuplicationEmailCheck = false;
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        if( value==='' ){
            emailGuideText = '이메일을 입력해 주세요.'; 
            isDuplicationEmailCheck = false;
            messageModalMethod(emailGuideText);
            setState({
                ...state,
                isDuplicationEmailCheck: isDuplicationEmailCheck
            })
        }
        else if( regexp.test(value)===false ){
            emailGuideText = '이메일 형식으로 입력해 주세요.'; 
            isDuplicationEmailCheck = false;
            messageModalMethod(emailGuideText);
            setState({
                ...state,
                isDuplicationEmailCheck: isDuplicationEmailCheck
            })
        }
        else {
            let formData = new FormData();
            formData.append('userEmail', state.email);

            axios({
                url: 'https://gwonsj94.co.kr/pororo/pororo_email_duplication.php',
                method: 'POST',
                data: formData
            })
            .then(( res )=>{
                if( res.status===200 ){
                    console.log(res);
                    if( res.data===2 ){
                        emailGuideText = '사용 할 수 있는 이메일 입니다.';
                        isDuplicationEmailCheck = true;
                    }
                    else if( res.data===-1 ){
                        emailGuideText = '이미 사용중인 이메일 입니다.';
                        isDuplicationEmailCheck = false;
                    }
                    messageModalMethod(emailGuideText);
                    setState({
                        ...state,
                        isDuplicationEmailCheck: isDuplicationEmailCheck
                    })
                }
            })
            .catch(( err )=>{
                console.log( err );
            })
        }
    }

    // 생년월일
    const onChangeBirth=(e)=>{
        setState({
            ...state,
            birth:e.target.value
        })
    }

    const onSubmitForm=(e)=>{
        e.preventDefault();

        if(state.pw===''){
            messageModalMethod('비밀번호를 입력해 주세요.');
        }
        else if(state.name===''){
            messageModalMethod('이름을 입력해 주세요.');
        }
        else if(state.birth===''){
            messageModalMethod('생년월일을 입력해 주세요');
        }
        else {

            let formData = new FormData();
            formData.append('userId', state.id);
            formData.append('userPw', state.pw);
            formData.append('userName', state.name);
            formData.append('userHp', state.hp);
            formData.append('userEmail', state.email);
            formData.append('userAddress', state.address);
            formData.append('userBirth', state.birth);

            axios({
                url:'https://gwonsj94.co.kr/pororo/pororo_admin_userinfo_modify.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{               
                if(res.status===200){   
                    if(res.data===1){                        
                        messageModalMethod('회원정보 수정에 성공하였습니다.');
                        addressReset('');
                        navigate('/Userinfo');
                    }                 
                    else{
                        alert('수정에 실패하였습니다. 확인 후 다시 시도해 주세요.');
                    }
                    
                }
            })
            .catch((err)=>{
                console.log( err );
            });

        }
        
    }

    const onClickModalOpen=(e)=>{
        e.preventDefault();
        SetModalOpen(true);
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');    

    }

    const onClickModalClose=(e)=>{
        e.preventDefault();
        SetModalOpen(false);
        navigate('/userInfoModify');
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.remove('on');
    }


     const onClickDelete=(e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('userId', state.id);

        axios({
            url:'https://gwonsj94.co.kr/pororo/pororo_admin_userinfo_delete.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{               
            if(res.status===200){   
                if(res.data===1){                        
                    messageModalMethod('회원계정이 삭제되었습니다.');
                    navigate('/index');
                }                 
                else{
                    messageModalMethod('삭제에 실패하였습니다. 확인 후 다시 시도해 주세요.');
                }
                
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    }

    const onClickClose=(e)=>{
        e.preventDefault();
        navigate('/userInfo')
    }

    return (
        <div id='UserinfoModify'>
        <div className="container">
            <div className="title">
                <h2>회원 정보 수정</h2>
                <button onClick={onClickClose}>
                        <img src="./images/sub/icon_bigClose.png" alt="" />
                    </button>
            </div>
            <div className="content">
                <form autoComplete='off' onSubmit={onSubmitForm}>
                <ul>
                    <li>
                        <label htmlFor="userId">아이디</label>
                        <input type="text" id='userId' name='userId' disabled value={state.id}/>
                    </li>
                    <div className="hide_text_box">
                            <p className={'hide_text'}>아이디는 수정할 수 없습니다.</p>
                        </div>
                    <li>
                        <label htmlFor="userPw">비밀번호</label>
                        <input type="text" 
                        id='userPw' 
                        name='userPw' 
                        value={state.pw} 
                        onChange={onChangePw}
                        maxLength={16}
                        />
                    </li>
                        <div className="hide_text_box">
                            <p className={`hide_text ${state.pwGuideText1 !== '' ? ' on' : ''}`}>{state.pwGuideText1}</p>
                            <p className={`hide_text ${state.pwGuideText2 !== '' ? ' on' : ''}`}>{state.pwGuideText2}</p>
                            <p className={`hide_text ${state.pwGuideText3 !== '' ? ' on' : ''}`}>{state.pwGuideText3}</p>
                        </div>
                    <li>
                        <label htmlFor="userName">이름</label>
                        <input type="text" id='userName' name='userName' onChange={onChangeName} value={state.name}/>
                    </li>
                        <div className="hide_text_box">
                            <p className={`hide_text ${state.nameGuideText !== '' ? ' on' : ''}`}>{state.nameGuideText}</p>
                        </div>
                    <li>
                        <label htmlFor="userHp">휴대폰</label>
                        <input type="text" id='userHp' name='userHp' disabled value={state.hp}/>
                    </li>
                    <div className="hide_text_box">
                        <p className={'hide_text'}>휴대폰 번호는 수정할 수 없습니다.</p>
                    </div>
                    <li>
                        <label htmlFor="userEmail">이메일</label>
                        <input type="text" id='userEmail' name='userEmail' value={state.email} onChange={onChangeEmail}/>
                        <button onClick={onClickDuplicationEmail}>중복확인</button>
                    </li>
                        <div className="hide_text_box">
                            <p className={`hide_text ${state.emailGuideText !== '' ? ' on' : ''}`}>{state.emailGuideText}</p>
                        </div>      
                    
                        <li>
                            <label htmlFor="userAddress">주소</label>
                            <input type="text" id='userAddress' name='userAddress' value={state.address}  disabled/>
                            <button onClick={onClickPostcode}>주소검색</button>
                        </li>
                    <li>
                        <label htmlFor="userBirth">생년월일</label>
                        <input type="text" id='userBirth' name='userBirth' value={state.birth} onChange={onChangeBirth} disabled/>
                    </li>
                    <div className="hide_text_box">
                        <p className={'hide_text'}>생년월일은 수정할 수 없습니다.</p>
                    </div>
                </ul>
                <div className="text-box">
                    <p>※ 회원 정보 수정 시 이전 데이터는 복구할 수 없습니다.</p>
                </div>
                <div className="button-box">
                    <button type='submit'>수정</button>
                    <button onClick={onClickModalOpen}>삭제</button>
                </div>
                </form>
            </div>
        </div>
        {modalOpen &&
            <div className="delete-modal">
                <div className="modal-title">
                    <h2>회원계정을 삭제하시겠습니까?</h2>
                </div>
                <div className="button_box ok">
                    <button className='ok_btn ok_btn1' onClick={onClickDelete}>확인</button>
                    <button className='ok_btn ok_btn2' onClick={onClickModalClose}>닫기</button>
                </div>
            </div>}
        </div>
    );
};
