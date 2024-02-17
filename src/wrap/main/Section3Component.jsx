import React from 'react';
import './scss/section3.scss';
import axios from 'axios';
import Section3ComponentChild from './Section3ComponentChild';

export default function Section3Component ({num, 이미지경로, setQuickMenuViewProduct}) {
    const [state, setState] = React.useState({
        title: [],
        slide1: [],
        slide2: [],
        slide3: [],
        slide4: [],
        slide5: [],
        n1:0,
        n2:0,
        n3:0,
        n4:0,
        n5:0,
        이미지경로:'',

    });

    React.useEffect(()=>{

        let 이미지경로 = `section${num}`;
        // console.log(이미지경로)

        axios({
            url:`./data/intro/${이미지경로}.json`,
            type:'GET'
        })
        .then(( res )=>{
            setState({
                title: res.data.title,
                slide1: res.data.slide1,
                slide2: res.data.slide2,
                slide3: res.data.slide3,
                slide4: res.data.slide4,
                slide5: res.data.slide5,
                n1:     res.data.slide1.length,
                n2:     res.data.slide1.length,
                n3:     res.data.slide1.length,
                n4:     res.data.slide1.length,
                n5:     res.data.slide1.length,
                이미지경로 : 이미지경로
            })
        })
        .catch(( err )=>{
            console.log( '실패..' + err);
        })
    },[]);


    return (
        <section id='section3'>
            <Section3ComponentChild title={state.title} slide1={state.slide1} slide2={state.slide2} slide3={state.slide3} slide4={state.slide4} slide5={state.slide5} n1={state.n1} n2={state.n2} n3={state.n3} n4={state.n4} n5={state.n5} 이미지경로={state.이미지경로}/>
            
        </section>
    );
};
