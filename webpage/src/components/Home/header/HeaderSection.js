import React from 'react';
import AppMenu from './AppMenu';
import AppName from './AppName';            

function HeaderSection() {
  return (
    
    <div className='d-flex justify-content-between align-items-center p-3 headerMenu' >
    <AppName /> 
    <AppMenu />
     
    </div>


  );
}

export default HeaderSection;