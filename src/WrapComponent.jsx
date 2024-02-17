import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopModalComponent from './wrap/TopModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import FooterComponent from './wrap/FooterComponent';
import MainComponent from './wrap/MainComponent';
import Sub1Component from './wrap/sub/Sub1Component'
import Sub2Component from './wrap/sub/Sub2Component'
import Sub3Component from './wrap/sub/Sub3Component'
import Sub4Component from './wrap/sub/Sub4Component'
import Sub5Component from './wrap/sub/Sub5Component';
import Sub7SigninComponent from './wrap/sub/Sub7SigninComponent';
import Sub7SignUpComponent from './wrap/sub/Sub7SignUpComponent';
import IdSearchComponent from './wrap/sub/IdSearchComponent';
import IdSearchResultComponent from './wrap/sub/IdSearchResultComponent';
import PwSearchComponent from './wrap/sub/PwSearchComponent';
import PwSearchResultComponent from './wrap/sub/PwSearchResultComponent';
import AddressSearchCom from './wrap/sub/AddressSearchCom';
import ConfirmModal from './wrap/sub/ConfirmModal';
import MessageModal from './wrap/sub/MessageModal';
import SignUpOkModal from './wrap/sub/SignUpOkModal';
import GoTopComponent from './wrap/GoTopComponent';
import ProductViewComponent from './wrap/ProductViewComponent';
import CurrentViewComponent from './wrap/CurrentViewComponent';
import CartComponent from './wrap/CartComponent';
import AdminSignUpComponent from './wrap/sub/AdminSignUpComponent';
import AdminSigninComponent from './wrap/sub/AdminSigninComponent';
import AdminSignUpOkModal from './wrap/sub/AdminSignUpOkModal';
import AdminIdSearchComponent from './wrap/sub/AdminIdSearchComponent';
import AdminIdSearchResultComponent from './wrap/sub/AdminIdSearchResultComponent';
import AdminPwSearchComponent from './wrap/sub/AdminPwSearchComponent';
import AdminPwSearchResultComponent from './wrap/sub/AdminPwSearchResultComponent';
import AdminUserInfoComponent from './wrap/sub/AdminUserInfoComponent';
import AdminUserInfoModifyComponent from './wrap/sub/AdminUserInfoModifyComponent';
import NoticeComponent from './wrap/sub/NoticeComponent';
import NoticeInsertComponent from './wrap/sub/NoticeInsertComponent';
import NoticeViewComponent from './wrap/sub/NoticeViewComponent';
import NoticeUpdateComponent from './wrap/sub/NoticeUpdateComponent';
import MyPageComponent from './wrap/sub/MyPageComponent';
import MypageUpdateComponent from './wrap/sub/MypageUpdateComponent';
import MypageDeleteComponent from './wrap/sub/MypageDeleteComponent';
import { topModal } from './reducer/topModal';
import { address } from './reducer/address';
import { signUpModal } from './reducer/signUpModal';
import { signIn } from './reducer/signIn';
import { quickMenuViewProduct } from './reducer/quickMenuViewProduct';
import { viewProduct } from './reducer/viewProduct';
import { cartMethod } from './reducer/cartReducer';
import { adminsignIn } from './reducer/adminsignIn';
import axios from 'axios';




export default function WrapComponent () {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const [cart, setCart] = React.useState([]);
    const [ok, setOk] = React.useState(false);

    React.useEffect(()=>{
        if(selector.signIn.signInData!==null){        
            cartDBSelect(selector.signIn.signInData.id);        
        }
    }, [ok, selector.signIn]);

    // 로그인 시 장바구니 목록 저장하기
    React.useEffect(()=>{
        if(selector.signIn.signInData!==null ){
            setCart(selector.cartReducer.장바구니); 
            if(localStorage.getItem('SET_DB_CAT')!==null){ 
                setCart([]); 
                setOk(true);                
            }
            else{
                setCart(selector.cartReducer.장바구니); 
            }            
        }
    }, [selector.signIn]);

    // 로그인 시 장바구니 목록에 저장하기
    const cartDBSave=(item, idx)=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.signInData.id);
        formData.append('제품코드',item.제품코드);
        formData.append('번호',item.번호);
        formData.append('이미지',item.이미지);
        formData.append('제품명',item.제품명);
        formData.append('할인율',item.할인율);
        formData.append('판매가',item.판매가);
        formData.append('제품특징',item.제품특징);
        formData.append('배송',item.배송);
        formData.append('옵션',item.옵션);
        formData.append('옵션상품목록',JSON.stringify(item.옵션상품목록));
        formData.append('정가',item.정가);
        formData.append('장바구니상품명',item.장바구니상품명);
        formData.append('수량',item.수량);
 
        axios({
             url: 'https://gwonsj94.co.kr/pororo/pororo_cart_insert.php',
             method: 'POST',
             data: formData
        })
        .then((res)=>{
             if(res.status===200){
                 if( res.data === 1){
                     if((cart.length-1)===idx){ 
                         setCart([]); 
                         localStorage.setItem('SET_DB_CAT','ok');
                         localStorage.removeItem('CART_PRODUCT');
                         dispatch(cartMethod([]));
                     }
                 }
             }
        })
        .catch((err)=>{
             console.log( 'AXIOS 실패!' );
             console.log( err );
        });
    }

    // 로그인 시 장바구니 목록에 조회하기
    const cartDBSelect=(아이디)=>{
        let formData = new FormData();
        formData.append('userId', 아이디);
        axios({
              url: 'https://gwonsj94.co.kr/pororo/pororo_cart_select.php',
              method: 'POST',
              data: formData
        })
        .then((res)=>{
              if(res.status===200){
                  if(res.data!==null){
                      localStorage.setItem('CART_PRODUCT', JSON.stringify(res.data));
                      dispatch(cartMethod(res.data));
                  }
                  else{ 
                      localStorage.setItem('CART_PRODUCT', JSON.stringify([]));
                      dispatch(cartMethod([]));
                  }
              }
        })
        .catch((err)=>{
              console.log('AXIOS 실패!');
        });  
    }

    // 로그인 시  장바구니 구현
    React.useEffect(()=>{
        if(selector.signIn.signInData!==null){
            if(localStorage.getItem('SET_DB_CAT')===null){
                if(cart.length>0){
                    localStorage.setItem('SET_DB_CAT','ok'); 
                    cart.map((item, idx)=>{
                        cartDBSave(item, idx);
                    });
                }    
            }
        }        
    },[cart]);

    // 현재 클릭한 상품 정보 리덕스에 저장하기
    React.useEffect(()=>{
        if(localStorage.getItem('viewProduct')!==null){
            const obj = JSON.parse(localStorage.getItem('viewProduct'));
            dispatch(viewProduct(obj)); 
        }
        if(localStorage.getItem('CART_PRODUCT')!==null){
            const obj = JSON.parse(localStorage.getItem('CART_PRODUCT'));
            dispatch(cartMethod(obj)); 
        }
    },[]);


    // 로그인 정보 유지하기
    React.useEffect(()=>{
        if( localStorage.getItem('PORORO_SIGNIN_DATA')!==null ){
            const result = JSON.parse(localStorage.getItem('PORORO_SIGNIN_DATA'));
            dispatch(signIn(result));
        }
    },[]);
    React.useEffect(()=>{
        if( localStorage.getItem('PORORO_ADMINSIGNIN_DATA')!==null ){
            const result = JSON.parse(localStorage.getItem('PORORO_ADMINSIGNIN_DATA'));

            dispatch(adminsignIn(result));
        }
    },[]);

    // 세션스토레이지에 주소 값 가져오기
    React.useEffect(()=>{
        if( selector.signIn.signInData===null && sessionStorage.getItem('PORORO_ADDRESS_KEY')!==null ){
            const result = JSON.parse(sessionStorage.getItem('PORORO_ADDRESS_KEY'));
            const 주소 = {
                isAddress: result.isAddress,
                isRemainingAddress: result.isRemainingAddress
            }       
            dispatch(address(주소));
        }
    },[ selector.signIn.signInData ]);

    // 탑모달 유효기한 설정 = 로컬스토레이지
    React.useEffect(()=>{
        let toDay = new Date();

        if(localStorage.getItem('PORORO_TOP_MODAL_KEY')!==null){
            const result = JSON.parse(localStorage.getItem('PORORO_TOP_MODAL_KEY'));

            if( toDay <= result.expires ){
                dispatch(topModal(false));              
            }
            else{
                dispatch(topModal(true));
            }           
        }
        return;
    },[]);



    return (
        <div id='wrap'>
            { selector.topModal.isTopModal && (<TopModalComponent />) }
            <HashRouter>
                <Routes>
                    <Route path='/' element={<HeaderComponent />}>
                        <Route index element={ <MainComponent />} />
                        <Route path='/index' element={ <MainComponent />} />
                        <Route path='/sub1' element={ <Sub1Component />} />
                        <Route path='/sub2' element={ <Sub2Component />} />
                        <Route path='/sub3' element={ <Sub3Component />} />
                        <Route path='/sub4' element={ <Sub4Component />} />
                        <Route path='/sub5' element={ <Sub5Component />} />

                        <Route path='/sub7SignIn' element={ <Sub7SigninComponent />} />
                        <Route path='/sub7SignUp' element={ <Sub7SignUpComponent />} />
                        <Route path='/idsearch' element={ <IdSearchComponent />} />
                        <Route path='/idsearchresult' element={ <IdSearchResultComponent />} />
                        <Route path='/pwsearch' element={ <PwSearchComponent />} />
                        <Route path='/pwsearchResult' element={ <PwSearchResultComponent />} />
                        
                        <Route path='/adminSignIn' element={ <AdminSigninComponent />} />
                        <Route path='/adminSignUp' element={ <AdminSignUpComponent />} />
                        <Route path='/adminidsearch' element={ <AdminIdSearchComponent />} />
                        <Route path='/adminidsearchresult' element={ <AdminIdSearchResultComponent />} />
                        <Route path='/adminpwsearch' element={ <AdminPwSearchComponent />} />
                        <Route path='/adminpwsearchResult' element={ <AdminPwSearchResultComponent />} />
                        <Route path='/userinfo' element={ <AdminUserInfoComponent />} />
                        <Route path='/userinfomodify' element={ <AdminUserInfoModifyComponent />} />

                        <Route path='/notice' element={ <NoticeComponent />} />
                        <Route path='/noticeinsert' element={ <NoticeInsertComponent />} />
                        <Route path='/noticeview' element={ <NoticeViewComponent />} />
                        <Route path='/noticeupdate' element={ <NoticeUpdateComponent />} />

                        <Route path='/productView' element={ <ProductViewComponent />} />
                        <Route path='/currentView' element={ <CurrentViewComponent />} />
                        <Route path='/cart' element={ <CartComponent />} />
                        <Route path='/mypage' element={ <MyPageComponent />} />
                        <Route path='/mypageupdate' element={ <MypageUpdateComponent />} />
                    </Route>
                </Routes>
                { selector.addressSearch.isAddressSearch && <AddressSearchCom /> }
                { selector.confirmModal.isConfirmModal && <ConfirmModal /> }
                { selector.messageModal.isMessageModal && <MessageModal /> }
                { selector.signUpModal.isOkModal && <SignUpOkModal />}
                { selector.adminSignUpModal.isAdminOkModal && <AdminSignUpOkModal />}
                { selector.signOut.signOutModal && <MypageDeleteComponent />}
            </HashRouter>
            <GoTopComponent />
            <FooterComponent />
        </div>
    );
};
