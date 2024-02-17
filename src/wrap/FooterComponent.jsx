import React from 'react';
import './scss/FooterComponent.scss';

export default function FooterComponent () {
    return (
        <footer id='footer'>
            <div className="container">
                <div className="content">
                    <div className="f_logo">
                        <a href="!#">
                            <img src="./images/footer/ft_logo.png" alt="" />
                        </a>
                    </div>
                    <div className="info_box">
                        <div className="row1">
                            <a href="!#">이용약관</a>
                            <a href="!#"><span>개인정보처리방침</span></a>
                            <a href="!#">이용안내</a>
                        </div>
                        <div className="row2">
                            <span>고객센터 : 1670-9060</span><i></i><span>평일 (토,일 공휴일 휴무) 오전 10시 ~ 오후 4시</span> <br />
                            <span>(주)아이코닉스</span><i></i><span>대표자 : 최종일</span><i></i><span>주소 : 463400 경기도 성남시 분당구 판교로255번길 64 아이코닉스 .</span><i></i>
                            <span>사업자등록번호 :114-86-12435</span><a href="!#"><span>[사업자정보확인]</span></a> <br />
                            <span>통신판매업 신고번호 : 제2014-경기성남-0156호</span><i></i><span>개인정보관리책임자 : </span><a href="mailto:minarabu@iconix.co.kr">고창우 (minarabu@iconix.co.kr)</a>
                        </div>
                        <div className="row3">
                            <span>Copyright by 뽀로로몰. All rights reserved. Designed by morenvy.</span>
                        </div>
                    </div>
                    <div className="sns">
                        <a href="!#"><img src="./images/footer/facebook.svg" alt="페이스북" /></a>
                        <a href="!#"><img src="./images/footer/instagram.svg" alt="인스타그램" /></a>
                        <a href="!#"><img src="./images/footer/youtube.svg" alt="유튜브" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
