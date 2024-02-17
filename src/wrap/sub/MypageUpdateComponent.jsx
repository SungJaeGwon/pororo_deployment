import React from 'react';
import './scss/Sub7SignUp.scss';
import { useDispatch,useSelector } from 'react-redux';
import { addressSearch } from '../../reducer/addressSearch';
import { messageModal } from '../../reducer/messageModal';
import { confirmModal } from '../../reducer/confirmModal';
import { signUpModal } from '../../reducer/signUpModal';
import { signUpData } from '../../reducer/signUpData';
import { signOutModal } from '../../reducer/signOut';
import { Link } from 'react-router-dom'; 
import { signIn } from '../../reducer/signIn';
import { address } from '../../reducer/address';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function MypageUpdateComponent() {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    // 메세지모달 메소드
    const messageModalMethod=(msg)=>{
        const obj = {
            isMessageModal: true,
            isMsg: msg
        }
        dispatch(messageModal(obj));
    }
    // 컨펌모달 메소드
    const confirmModalMethod=(msg)=>{
        const obj = {
            isConfirmModal: true,
            confirmMsg: msg,
            isSignInOk: false
        }
        dispatch(confirmModal(obj));
    }

    const [state, setState] = React.useState({
        id: '',

        pw: '',
        pwGuideText1: null,
        pwGuideText2: null,
        pwGuideText3: null,
        pwGuideText4: true,

        pwCheck: '',
        pwCheckGuideText1: null,
        pwCheckGuideText2: null,
        pwCheckGuideText3: true,
        
        name: '',

        hp: '',
        hp1: '010',
        hp2: '',
        hp3: '',
        // hp2: selector.signIn.signInData.hp.split('-')[1],
        // hp3: selector.signIn.signInData.hp.split('-')[2],
        isAuthenNumberBtn: false,
        isAuthenbox: false,
        isHpAuthenNumber: null,  
        isHpAuthenNumberCheck: '',

        email: '',
        emailGuideText1: null,
        emailGuideText2: null,
        isDuplicationEmailBtn: false,
        isDuplicationEmailCheck: false,

        birth: '',
        birthYear: '',
        birthMonth: '',
        birthDate: '',
        birthGuidText: '',

        address: '',
        // address: selector.signIn.signInData.address,
        isAddress:'',
        isRemainingAddress:'',
        showAddress: false,

        signUpData: {}
    });

    React.useEffect(()=>{
        if( selector.signIn.signInData!==null && state.id==='' ){
            setState({
                ...state,
                id:       selector.signIn.signInData.id,
                pw:       selector.signIn.signInData.pw,
                name:     selector.signIn.signInData.name,
                hp:       selector.signIn.signInData.hp,
                email:    selector.signIn.signInData.email,
                birth:    selector.signIn.signInData.birth,
                address:  selector.signIn.signInData.address,
            })
        }
    },[selector.signIn.signInData]);

   

    // 비밀번호 입력상자 = 정규표현식
    // 제한조건
    // 제한조건1: 영문(소문자), 숫자, 특수문자 중 최소 2가지 이상 8-16자
    // 제한조건2: 동일한 번호 4번 이상 불가
    // 제한조건3: 8자 이상 16자 이하
    // 조건4 : 제한조건 미 충족 시 사용할 수 없는 비밀번호 입니다.
    // 조건5 : 조건 충족 후 비밀번호 8~9자리 => 사용 가능한 비밀번호 입니다.보통
    // 조건6 : 조건 충족 후 비밀번호 10자리 이상 => 사용 가능한 비밀번호 입니다.안전
    const onChangePw=(e)=>{
        const {value} = e.target;
        let pw = '';
        let pwGuideText1 = null;
        let pwGuideText2 = null;
        let pwGuideText3 = null;
        let pwGuideText4 = null;

        const regexp1 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\/|;:'",<.>?])+)|(?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\/|;:'",<.>?])+/g;
        const regexp2 = /(.)\1\1\1/g;
        const regexp3 = /^(.){8,16}$/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /\s/g;
        pw = value.replace(regexp4,'');
        if( regexp3.test(value)===false ){
            pwGuideText1 = true;    // '8자 이상 16자 이하로 입력해 주세요.'
            // pwGuideText4 = false; 
        }
        else {
            pwGuideText1 = false;
        }

        if( regexp1.test(value)===false || regexp4.test(value)===true || regexp5.test(value)===true ){
            pwGuideText2 = true;    // '영문(소문자), 숫자, 특수문자(공백제외) 중 최소 2가지 이상조합  '
            // pwGuideText4 = false; 
        }
        else {
            pwGuideText2 = false
        }
        if( regexp2.test(value)===true ){
            pwGuideText3 = true;    // '동일한 문자 4자리 이상 입력은 불가합니다.'
            // pwGuideText4 = false; 
        }
        else {
            pwGuideText3 = false;
        }
        if( value.length > 7 ){
            pwGuideText4 = true;    // '사용 가능한 비밀번호 입니다.(보통)'
        }
        setState({
            ...state,
            pw: pw,
            pwGuideText1: pwGuideText1,
            pwGuideText2: pwGuideText2,
            pwGuideText3: pwGuideText3,
            pwGuideText4: pwGuideText4
        })
    }

    // 비밀번호 확인 입력상자 = 정규표현식
    // 제한조건1 : 공백일경우 => 비밀번호를 한번 더 입력해 주세요.
    // 제한조건2 : 비밀번호 불일치 => 비밀번호와 비밀번호 확인이 일치하지 않습니다.
    // 제한조건3 : 한글 제외
    // 조건3 : 제한조건 미 충족시 => 사용할 수 없는 비밀번호 입니다.
    // 조건4 : 비밀번호 일치 = 8~9자리 => 비밀번호와 비밀번호 확인이 일치 합니다.보통
    // 조건5 : 비밀번호 일치 = 10자리 이상 => 비밀번호와 비밀번호 확인이 일치 합니다.안전
    const onChangePwCheck=(e)=>{
        const {value} = e.target;
        let pwCheck = '';
        let pwCheckGuideText1 = null;
        let pwCheckGuideText2 = null;
        let pwCheckGuideText3 = null;
        const regexp1 = /\s/g;
        const regexp2 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        pwCheck = value.replace(regexp2,''); 
        if( regexp1.test(value)===true || value==='' || regexp2.test(value)===true ){
            pwCheckGuideText1 = true;   //'비밀번호를 한번 더 입력해 주세요'
            // pwCheckGuideText3 = false;
        }
        else if( value!==selector.signIn.signInData.pw ){
            pwCheckGuideText2 = true;   // '동일한 비밀번호를 입력해 주세요'
            // pwCheckGuideText3 = false;
        }
        else {
            pwCheckGuideText1 = false;
            pwCheckGuideText2 = false;
            pwCheckGuideText3 = true;
        }
        
        setState({
            ...state,
            pwCheck: pwCheck,
            pwCheckGuideText1: pwCheckGuideText1,
            pwCheckGuideText2: pwCheckGuideText2,
            pwCheckGuideText3: pwCheckGuideText3
        })
    }
    
    //입력상자 = 휴대폰1
    const selectList = ['010','011','016','017','018','019'];
    const [select, setSelcet] = React.useState('');
    const onChangeHp1=(e)=>{
        setSelcet(e.target.value);
        setState({
            ...state,
            hp1: e.target.value
        });
    }
    // 입력상자 = 휴대폰2
    const onChangeHp2=(e)=>{
        const regExp = /[^0-9]/g;
        let hp2 = e.target.value.replace(regExp, '');
        setState({
            ...state,
            hp2: hp2
        })
    }
    // 입력상자 = 휴대폰3
    const onChangeHp3=(e)=>{
        const regExp = /[^0-9]/g;
        let isAuthenNumberBtn = false;
        let hp3 = e.target.value.replace(regExp, '');
        if( e.target.value.length > 3 ){
            isAuthenNumberBtn = true;
        }
        else {
            isAuthenNumberBtn = false;
        }
        setState({
            ...state,
            hp3: hp3,
            isAuthenNumberBtn: isAuthenNumberBtn
        })
    }
    // 휴대폰 값 상태변수에 저장하기
    React.useEffect(()=>{
        if( state.hp1!=='' && state.hp2!=='' && state.hp3!==''){
            return (
                setState({
                    ...state,
                    hp: `${state.hp1}-${state.hp2}-${state.hp3}`
                })
            )
        }
    },[state.hp1, state.hp2, state.hp3]);
    // 휴대폰 인증번호 발송
    const onClickAuthenModal=(e)=>{
        e.preventDefault();
        const regexp1 =  /[0-9]{3,4}/g;
        const regexp2 =  /[0-9]{4}/g;
        const num = Math.floor(Math.random() * 900000 + 100000);
        let isAuthenNumberBtn = false;
        let isAuthenbox = false;

        if( regexp1.test(state.hp2)===false && regexp2.test(state.hp3)===false ) {
            messageModalMethod('잘못된 휴대폰 번호입니다.');
        }
        else {
            confirmModalMethod(` ${num}` );
            isAuthenNumberBtn = false;
            isAuthenbox = true;
        }
        
        setState({
            ...state,
            isAuthenNumberBtn: isAuthenNumberBtn,
            isAuthenbox: isAuthenbox,
            isHpAuthenNumber: num
        })
    }

    // 입력상자 = 휴대폰 인증번호
    const onChangeHpAuthen=(e)=>{
        setState({
            ...state,
            isHpAuthenNumberCheck: e.target.value
        })
    }
    // 휴대폰 인증번호 확인
    const onClickHpAuthenOk=(e)=>{
        e.preventDefault();
        let isAuthenNumberBtn = false;
        let isAuthenbox = false;
        if( state.isHpAuthenNumber === Number(state.isHpAuthenNumberCheck) ){
            messageModalMethod('인증에 성공하였습니다.');
            isAuthenNumberBtn = true;
            isAuthenbox = false;
        }
        else {
            messageModalMethod('올바른 번호를 입력해 주세요.');
            isAuthenNumberBtn = true;
            isAuthenbox = true;
        }
        setState({
            ...state,
            isAuthenNumberBtn: isAuthenNumberBtn,
            isAuthenbox: isAuthenbox
        })
    }

     // 이메일 입력상자 = 정규표현식
    // 제한조건
    // 제한조건1 : 특수문자 사용불가
    // 제한조건2 : 한글사용불가
    // 제한조건3 : 4자 이상 12자 이하
    // 제한조건4 : 공백허용안함
    const onChangeEmail=(e)=>{
        const {value} = e.target;
        let emailGuideText1 = '';
        let emailGuideText2 = '';
        let isDuplicationEmailBtn = false;
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        
        if( value==='' ){
            emailGuideText1 = '이메일을 입력해 주세요.'; 
            isDuplicationEmailBtn = false;
        }
        else if( regexp.test(value)===false ){
            emailGuideText2 = '이메일 형식으로 입력해 주세요.';
            isDuplicationEmailBtn = false;
        }
        else {
            emailGuideText1 = false;
            emailGuideText2 = false;
            isDuplicationEmailBtn = true;
        }
        setState({
            ...state,
            email: value,
            emailGuideText1: emailGuideText1,
            emailGuideText2: emailGuideText2,
            isDuplicationEmailBtn: isDuplicationEmailBtn
        })
    }

    // 이메일 중복확인
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
                if(res.status===200 ){
                    if( res.data===-1 ){
                        messageModalMethod('이미 사용중인 이메일 입니다.');
                        isDuplicationEmailCheck = false;
                    }
                    else if( res.data===2 ){
                        messageModalMethod('사용 할 수 있는 이메일 입니다.');
                        isDuplicationEmailCheck = true;
                    }
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

    // 주소 바인딩하기
    React.useEffect(()=>{
        setTimeout(()=>{
            if(selector.address.isAddress!=='' && selector.address.isRemainingAddress!=='' ){
                return (
                    setState({
                        ...state,
                        isAddress: selector.address.isAddress,
                        isRemainingAddress: selector.address.isRemainingAddress,
                        showAddress: true,
                    })    
                )
            }
        }, 100);
    },[selector.address]);

    // 주소 값 상태변수에 저장하기
    React.useEffect(()=>{
        if(state.isAddress!=='' && state.isRemainingAddress!==''){
            return (
                setState({
                    ...state,
                    address: `${state.isAddress}${state.isRemainingAddress}`
                })
            )
        }
        return;
    },[selector.address.isRemainingAddress]);

    // 주소 재검색 : 비동기식 방식
    const onClickReSearch=(e)=>{
        e.preventDefault();
        dispatch(addressSearch(false));
            setTimeout(()=>{
                dispatch(addressSearch(true));
            },100);      
    }

    // 주소 입력받기
    const onChangeAddress=(e)=>{
        setState({
            ...state,
            isAddress: e.target.value
        });
    }
    // 나머지 주소 입력받기
    const onChangeRemainingAddress=(e)=>{
        setState({
            ...state,
            isRemainingAddress: e.target.value
        });
    }


    // 생년월일 유효성 검사
    React.useEffect(()=>{
       
        let birthGuidText = '';

        if( state.birthYear==='' && state.birthMonth==='' &&  state.birthDate==='' ){
            birthGuidText = '';
        }
        else{  

            if(state.birthYear.length<4){  
                birthGuidText = '태어난 년도 4자리를 정확하게 입력해주세요.';
            }
            else if( Number(state.birthYear) < (new Date().getFullYear()-130) ){ 
                birthGuidText = '생년월일을 다시 확인해주세요.';
            }            
            else if(  Number(state.birthYear) > new Date().getFullYear()  ){
                birthGuidText = '생년월일이 미래로 입력 되었습니다. ';
            }            
            else{  
                
                if( state.birthMonth < 1 || state.birthMonth > 12 ){
                    birthGuidText = '태어난 월을 정확하게 입력해주세요.';
                }
                else {
                    if(state.birthDate < 1 || state.birthDate > 31 ){
                        birthGuidText = '태어난 일을 정확하게 입력해주세요.';
                    }
                    else {
                        if(  Number(state.birthYear) === (new Date().getFullYear()-14)  ){
                            if( Number(state.birthMonth) === (new Date().getMonth()+1) ){
                                if( Number(state.birthDate) === new Date().getDate() ){
                                    birthGuidText = ''; 
                                }
                                else if( Number(state.birthDate) > new Date().getDate() ){
                                    birthGuidText = '만 14세 미만은 가입이 불가합니다.';
                                }
                            }
                            else if(Number(state.birthMonth) > (new Date().getMonth()+1)){
                                birthGuidText = '만 14세 미만은 가입이 불가합니다.';
                            }                            
                        }
                        else if(  Number(state.birthYear) > (new Date().getFullYear()-14)  ){
                            birthGuidText = '만 14세 미만은 가입이 불가합니다.';
                        }          

                    }
                }

            }
        }

        setState({
            ...state,
            birthGuidText: birthGuidText
        }) 

    },[state.birthYear,state.birthMonth,state.birthDate]);

    React.useEffect(()=>{
        if( state.birthDate!==''){
            return (
                setState({
                    ...state,
                    birth: `${state.birthYear}.${state.birthMonth}.${state.birthDate}`
                })
            )
        }
    },[state.birthDate]);

    const addressReset=(reset)=>{
        const Reset = {
            isAddress: reset,
            isRemainingAddress: reset
        }
        dispatch(address(Reset));
    }


    const onSubmitForm=(e)=>{
        e.preventDefault();
        if( state.pwCheck==='' ){
            messageModalMethod('보안을 위해 비밀번호를 한번 더 입력해주세요.');
        }
        else {
            // const hphp = `${state.hp1}-${state.hp2}-${state.hp3}`
            const formData = new FormData();
            formData.append('userId', `${state.id==='' ? selector.signIn.signInData.id : state.id}`);
            formData.append('userEmail', `${state.email==='' ? selector.signIn.signInData.email : state.email}`);
            formData.append('userHp', `${state.hp==='' ? selector.signIn.signInData.hp : state.hp}`);
            formData.append('userAddress', `${state.isAddress === '' ? selector.signIn.signInData.address : state.isAddress}${state.isRemainingAddress === '' ? '' : state.isRemainingAddress} ` );
            formData.append('userPw', state.pw);

            axios({
                url: 'https://gwonsj94.co.kr/pororo/pororo_mypage.php',
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
                            expires: toDay.getTime()
                        }
                        
                        localStorage.setItem('PORORO_SIGNIN_DATA', JSON.stringify(signInData));
                        
                        dispatch(signIn(signInData));
        
                        setState({
                            ...state,
                            name: res.data.이름,
                            hp: res.data.휴대폰,
                            birth: res.data.생년월일,
                            id : res.data.아이디,
                            pw: res.data.비밀번호,
                            address: res.data.주소,
                            email: res.data.이메일,
                        });
                        addressReset('');
                        navigate('/index');
                    }
                    messageModalMethod('개인정보 수정이 완료되었습니다.');
                }
                else {
                    messageModalMethod('개인정보를 확인하고 다시 시도해 주세요.');
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    const onClickSignOut=(e)=>{
        e.preventDefault();
        dispatch(signOutModal(true));
    }

    

    return (
        <div id='signUp'>
            <div className="container">
                <div className="title">
                    <h2>회원 정보 수정</h2>
                </div>
                <div className="user_info">
                    <img src="./images/sub/search/icon_member.gif" alt="" /><p>저희 쇼핑몰을 이용해 주셔서 감사합니다. <span>{selector.signIn.signInData.id}</span>님은 <span> [{selector.signIn.signInData.회원등급}]</span> 회원이십니다.</p>
                </div>
                <form onSubmit={onSubmitForm}>
                    <div className="form_box">
                        <div className="sub_title">
                            <h3>기본정보</h3>
                            <div className="side_text">
                                <span>*</span><p>필수입력사항</p>
                            </div>
                        </div>
                        <ul className="data_box">
                            <li className='data_list'>
                                <div className='left'>
                                    <strong>아이디</strong><span>*</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type="text" 
                                        name='userId' 
                                        id='userId'
                                        disabled
                                        value={selector.signIn.signInData.id}
                                    />
                                </div>
                            </li>
                            <li className='data_list'>
                                <div className='left'>
                                    <strong>비밀번호</strong><span>*</span>
                                </div>
                                <div className='right' >
                                    <input 
                                        type="password" 
                                        name='userPw' 
                                        id='userPw'
                                        maxLength={16}
                                        value={state.pw}
                                        onChange={onChangePw}
                                    />
                                    {
                                        state.pw!=='' && 
                                            <div className={`hide_text_box ${state.pwGuideText4===null ? '' : ' ok'}`}>
                                                {
                                                    state.pwGuideText4===null &&
                                                    <>
                                                        <p className={`hide_text ${state.pwGuideText1===null ? '' : state.pwGuideText1===true ? 'red' : 'green'}`}>8자 이상 16자 이하로 입력해 주세요.</p>
                                                        <p className={`hide_text ${state.pwGuideText2===null ? '' : state.pwGuideText2===true ? 'red' : 'green'}`}>영문(소문자), 숫자, 특수문자(공백제외) 중 최소 2가지 이상조합</p>
                                                        <p className={`hide_text ${state.pwGuideText3===null ? '' : state.pwGuideText3===true ? 'red' : 'green'}`}>동일한 문자 4자리 이상 입력은 불가합니다.</p>
                                                    </>
                                                }
                                                    <p className={`hide_text ${state.pwGuideText4===null ? '' : 'green'}`}>사용 가능한 비밀번호 입니다.</p>
                                            </div>
                                    }
                                </div>
                            </li>
                            <li className='data_list'>
                                <div className='left'>
                                    <strong>비밀번호 확인</strong><span>*</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type="password" 
                                        name='userPwCheck' 
                                        id='userPwCheck'
                                        maxLength={16}
                                        value={state.pwCheck}
                                        onChange={onChangePwCheck}
                                    />
                                    {
                                        state.pwCheck!=='' &&
                                        <div className={`hide_text_box ${state.pwCheckGuideText3===null ? '' : ' ok'}`}>
                                            {
                                                state.pwCheckGuideText3===null &&
                                                <>
                                                    <p className={`hide_text ${state.pwCheckGuideText1===null ? '' : state.pwCheckGuideText1===true ? 'red' : 'green'}`}>비밀번호를 한번 더 입력해 주세요.</p>
                                                    <p className={`hide_text ${state.pwCheckGuideText2===null ? '' : state.pwCheckGuideText2===true ? 'red' : 'green'}`}>동일한 비밀번호를 입력해 주세요.</p>
                                                </>
                                            }
                                            <p className={`hide_text ${state.pwCheckGuideText3===null ? '' : 'green'}`}>동일한 비밀번호 입니다.</p>
                                        </div>
                                    }
                                </div>
                            </li>
                            <li className='data_list'>
                                <div className='left'>
                                    <strong>이름</strong><span>*</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type="text" 
                                        name='userName' 
                                        id='userName'
                                        disabled
                                        value={selector.signIn.signInData.name}
                                    />
                                </div>
                            </li>
                            <li className='data_list'>
                                <div className={`left address${state.showAddress===true ? ' on' : ''}`}>
                                    <strong>주소</strong><span>*</span>
                                </div>
                                {
                                    !state.showAddress && (
                                        <div className='right'>
                                            <h3>{selector.signIn.signInData.address}</h3>
                                            <div className="duplicationButton_box address">
                                                <button className='duplication_btn fix' onClick={onClickReSearch}>주소검색</button>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    state.showAddress && (
                                        <div className="address_right">
                                            <div className='right'>
                                                <input 
                                                    type="text" name='userAddress' id='userAddress' placeholder='검색주소'
                                                    value={state.isAddress}
                                                    onChange={onChangeAddress}
                                                    disabled={true}
                                                    className='input_obj'
                                                />
                                                <div className="duplicationButton_box">
                                                    <button className='duplication_btn fix' onClick={onClickReSearch}>재검색</button>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <input 
                                                    disabled={true}
                                                    type="text" name='userAddressSearch' id='userAddressSearch' placeholder='나머지 주소를 입력해주세요'
                                                    value={state.isRemainingAddress}
                                                    onChange={onChangeRemainingAddress}
                                                    className='input_obj'   
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            </li>
                            <li className='data_list'>
                                <div className='left'>
                                    <strong>휴대전화</strong><span>*</span>
                                </div>
                                <div className='right hp'>
                                    <select name="userHp1" id="userHp1" value={select} onChange={onChangeHp1}>
                                        {
                                            selectList.map((item)=> {
                                                return (
                                                    <option value={item} key={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <i>-</i>
                                    <input 
                                        type="text" 
                                        name='userHp2'
                                        id='userHp2'
                                        value={state.hp2}
                                        onChange={onChangeHp2}
                                        maxLength={4}
                                    />
                                    <i>-</i>
                                    <input 
                                        type="text" 
                                        name='userHp3' 
                                        id='userHp3'
                                        value={state.hp3}
                                        onChange={onChangeHp3}
                                        maxLength={4}
                                        className='last'
                                    />
                                    <div className="duplicationButton_box hp">
                                        <button 
                                            disabled={!state.isAuthenNumberBtn}
                                            className={`duplication_btn${state.isAuthenNumberBtn ? '' : ' off'}`}
                                            onClick={onClickAuthenModal} 
                                        >휴대폰 인증</button>
                                    </div>
                                </div>
                            </li>
                            {
                                state.isAuthenbox && (
                                    <li className='data_list'>
                                        <div className='left'>
                                            <strong>인증번호 확인</strong><span>*</span>
                                        </div>
                                        <div className="right">
                                            <input 
                                                type="text" name='userHpAuthen' id='userHpAuthen' placeholder='휴대폰 인증번호를 입력해주세요'
                                                value={state.isHpAuthenNumberCheck}
                                                onChange={onChangeHpAuthen}
                                                className='hp2'
                                            />
                                            <div className="duplicationButton_box hp">
                                                <button 
                                                    className='duplication_btn'
                                                    onClick={onClickHpAuthenOk}
                                                >인증번호 확인</button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                            <li className='data_list'>
                                <div className='left'>
                                    <strong>이메일</strong><span>*</span>
                                </div>
                                <div className='right email'>
                                    <input 
                                        type="text" 
                                        name='userEmail' 
                                        id='userEmail'
                                        value={state.email}
                                        onChange={onChangeEmail}
                                    />
                                    <div className="duplicationButton_box email">
                                        <button 
                                            disabled={!state.isDuplicationEmailBtn}
                                            className={`duplication_btn${state.isDuplicationEmailBtn ? '' : ' off'}`}
                                            onClick={onClickDuplicationEmail}
                                        >중복확인</button>
                                    </div>
                                    <p className={`guid_text${state.emailGuideText1!==''?' on':''}`}>{state.emailGuideText1}</p>  
                                    <p className={`guid_text${state.emailGuideText2!==''?' on':''}`}>{state.emailGuideText2}</p>  
                                </div>
                            </li>
                            <li className='data_list'>
                                <div className='left'>
                                    <strong>생년월일</strong><span>*</span>
                                </div>
                                <div className='right birth'>
                                    <input 
                                        type="text" 
                                        name='userYear' 
                                        id='userYear'
                                        value={selector.signIn.signInData.birth.split('.')[0]}
                                        disabled
                                    />
                                    <span>년</span>
                                    <input 
                                        type="text" 
                                        name='userMonth' 
                                        id='userMonth' 
                                        value={selector.signIn.signInData.birth.split('.')[1]}
                                        disabled
                                    />
                                    <span>월</span>
                                    <input 
                                        type="text" 
                                        name='userDate' 
                                        id='userDate'
                                        value={selector.signIn.signInData.birth.split('.')[2]}
                                        disabled
                                    />
                                    <span>일</span>
                                    <p className={`guid_text${state.birthGuidText!==''?' on':''}`}>{state.birthGuidText}</p>  
                                </div>
                            </li>
                        </ul>
                        <div className="update_button_box">
                            <div className="center">
                                <button type='submit'>회원정보수정</button>
                                <Link to="/index" className='cancel'>취 소</Link>
                            </div>
                            <button onClick={onClickSignOut}>회원 탈퇴</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
