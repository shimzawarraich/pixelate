

import React, { useState, useEffect } from 'react';
import '../style.css';

const Closet = () => {
  const [state, setState] = useState({h: 0, i: 0, j: 0, k: 0});

  const nextJacket = () => {
    const top = document.getElementById("jackets");
    if (state.h === 0) {
      top.setAttribute("class", "jacket1");
      setState({ ...state, h: state.h + 1 });
    } else if (state.h === 1) {
      top.setAttribute("class", "jacket2");
      setState({ ...state, h: state.h + 1 });
    } else if (state.h === 2) {
        top.setAttribute("class", "jacket3");
        setState({ ...state, h: state.h + 1 });
    } else if (state.h === 3) {
        top.setAttribute("class", "default");
        setState({ ...state, h: 0 });
    }
  };

  const nextTop = () => {
    const top = document.getElementById("clothes");
    if (state.i === 0) {
      top.setAttribute("class", "top1");
      setState({ ...state, i: state.i + 1 });
    } else if (state.i === 1) {
      top.setAttribute("class", "top2");
      setState({ ...state, i: state.i + 1 });
    } else if (state.i === 2) {
      top.setAttribute("class", "top3");
      setState({  ...state, i: state.i + 1});
    } else if (state.i === 3) {
        top.setAttribute("class", "top4");
        setState({ ...state, i: state.i + 1});
    } else if (state.i === 4) {
        top.setAttribute("class", "top5");
        setState({ ...state, i: state.i + 1});
    } else if (state.i === 5) {
        top.setAttribute("class", "top6");
        setState({ ...state, i: state.i + 1 });
    } else if (state.i === 6) {
        top.setAttribute("class", "default");
        setState({ ...state, i: 0 });
    }
  };

  const nextBottom = () => {
    const bottom = document.getElementById("bottoms");
    if (state.j === 0) {
      bottom.setAttribute("class", "bottom1");
      setState({ ...state, j: state.j + 1 });
    } else if (state.j === 1) {
      bottom.setAttribute("class", "bottom2");
      setState({ ...state, j: state.j + 1 });
    } else if (state.j === 2) {
      bottom.setAttribute("class", "bottom3");
      setState({...state, j: state.j + 1 });
    } else if (state.j === 3) {
        bottom.setAttribute("class", "bottom4");
        setState({...state, j: state.j + 1 });
    } else if (state.j === 4) {
        bottom.setAttribute("class", "bottom5");
        setState({ ...state, j: state.j + 1 });
    } else if (state.j === 5) {
        bottom.setAttribute("class", "bottom6");
        setState({...state, j: state.j + 1 });
    } else if (state.j === 6) {
        bottom.setAttribute("class", "bottom7");
        setState({...state, j: state.j + 1 });
    } else if (state.j === 7) {
        bottom.setAttribute("class", "bottom8");
        setState({ ...state, j: state.j + 1 });
    } else if (state.j === 8) {
        bottom.setAttribute("class", "bottom9");
        setState({ ...state, j: state.j + 1 });
    } else if (state.j === 9) {
        bottom.setAttribute("class", "bottom10");
        setState({...state, j: state.j + 1 });
    } else if (state.j === 10) {
        bottom.setAttribute("class", "default");
        setState({ ...state, j: 0 });
    }
    
  };

  const nextHead = () => {
    const head = document.getElementById("head");
    // const hairb = document.getElementById("hairback");
    // hairb.setAttribute("class", "hairback");

    if (state.k === 0) {
      head.setAttribute("class", "head1");
      setState({ ...state, k: state.k + 1 });
    } else if (state.k === 1) {
      head.setAttribute("class", "head2");
      setState({ ...state, k: state.k + 1 });
    } else if (state.k === 2) {
      head.setAttribute("class", "head3");
      setState({ ...state, k: state.k + 1  });
    } else if (state.k === 3) {
      head.setAttribute("class", "head4");
      setState({ ...state, k: state.k + 1 });
    } else if (state.k === 4) {
        head.setAttribute("class", "default");
        setState({ ...state, k: 0 });
    }
  };

  return (
    <div id="container">
      <div id="background">
        {/* <div id="hairback"></div> */}
        <div id="man"></div>
        <div id="bottoms"></div>
        <div id="clothes"></div>
        <div id="jackets"></div>
        <div id="head"></div>
      </div>

      <input
        type="button"
        value="HEADWEAR"
        id="nexthead"
        onClick={nextHead}
      />
      <input
        type="button"
        value="JACKET"
        id="nextjacket"
        onClick={nextJacket}
      />
      <input
        type="button"
        value="TOP"
        id="nexttop"
        onClick={nextTop}
      />
      <input
        type="button"
        value="BOTTOM"
        id="nextbottom"
        onClick={nextBottom}
      />
    </div>
  );
};

export default Closet;