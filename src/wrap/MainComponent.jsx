import React from "react";
import './scss/Main.scss';
import Section1Component from "./main/Section1Component";
import Section2Component from "./main/Section2Component";
import Section3Component from "./main/Section3Component";
import Section4Component from "./main/Section4Component";
import Section5Component from "./main/Section5Component";
import Section6Component from "./main/Section6Component";
import Section7Component from "./main/Section7Component";
import Section8Component from "./main/Section8Component";
import axios from "axios";

export default function MainComponent () {

    // const [sectionCount, setSectionCount] = React.useState([]);
    const [state, setState] = React.useState({
        num: [],
        num1 : 3,
        num2 : 5,
        num3 : 7,
        이미지경로: ''
    });


    return (
        <main id='main'>
            <Section1Component />
            <Section2Component />
            <Section3Component num={state.num1} 이미지경로={state.이미지경로}/>
            <Section4Component />
            <Section5Component num={state.num2} 이미지경로={state.이미지경로}/>
            <Section6Component />
            <Section7Component num={state.num3} 이미지경로={state.이미지경로}/>
            <Section8Component />
        </main>
    )
}