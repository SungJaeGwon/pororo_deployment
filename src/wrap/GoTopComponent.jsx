import React from 'react';
import './scss/GoTop.scss';

export default function GoTopComponent () {

    const [isShow,setIsShow] = React.useState(false);

    React.useEffect(()=>{
        let isShow = false;
        window.addEventListener('scroll',function(){  
            if(this.window.scrollY >= 800){ 
                isShow = true; 
            }
            else {
                isShow = false;
            }
            setIsShow( isShow );
        });

    },[]);

    return (
        <div id="goTop" className={isShow ? 'on' : ''}>
            <a href="#wrap">
                <img src="./images/q_r_top.svg" alt="" />
            </a>
        </div>
    );
};
