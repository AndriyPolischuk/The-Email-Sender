import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { withRouter } from 'react-router-dom';

const Layout = ({ history, title, children }) => {
  let [leftWidth, setLeftWidth] = useState(document.body.clientWidth * 0.25);
  let [rightWidth, setRightWidth] = useState(document.body.clientWidth * 0.75);
  let [time, setTime] = useState(0);
  const decor = {
    color: '#ab6560',
    position: 'absolute',
    marginTop: 60,
    left: leftWidth + rightWidth / 2 - 80,
  };
  const decor2 = {
    position: 'absolute',
    marginTop: '150px',
    minWidth: '300px',
    left: leftWidth + leftWidth / 6,
  };

  const resize = event => {
    setTime(event.timeStamp);
  };

  useEffect(() => {
    window.addEventListener('resize', resize, true);
    setLeftWidth(document.body.clientWidth * 0.25);
    setRightWidth(document.body.clientWidth * 0.75);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [time]);

  return (
    <>
      <div className={`container-fluid ${title === 'Analytics' && 'myImage'} `}>
        <Navbar />

        <h2 id='title' style={decor}>
          {title}
        </h2>
        <div className='container-fluid' id='children' style={decor2}>
          <div className='row'>
            <div className='col-12 col-sm-12 col-md-12 col-lg-12 '>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Layout);
