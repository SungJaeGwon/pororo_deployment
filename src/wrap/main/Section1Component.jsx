import React from 'react';
import './scss/section1.scss';
import Section1ComponentChild from './Section1ComponentChild';
import axios from 'axios';

export default function Section1Component () {

    const [state, setState] = React.useState({
        slide: [],
        n: 0
    });

    React.useEffect(()=>{
        axios({
            url:'./data/intro/section1.json',
            type:'GET'
        })
        .then(( result )=>{
            setState({
                ...state,
                slide: result.data.slide,
                n: result.data.slide.length
            })
        })
        .catch(( error )=>{
            console.log("떙.." + error);
        });
    },[]);


    return (
        <section id='section1'>
            <Section1ComponentChild slide={state.slide} n={state.n}/>
        </section>
    );
};
