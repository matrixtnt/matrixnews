// 'use client'

// import Breadcrumb from 'react-bootstrap/Breadcrumb'
// import Link from 'next/link'
// import { FaHome } from 'react-icons/fa'
// import { translate } from '../../utils'

// const BreadcrumbNav = props => {
//   return (
//     <Breadcrumb id='bcb-main'>
//       <div className='container'>
//         <div className='breadcrumb_data'>
//           <Breadcrumb.Item id='bcb-item'>
//             <Link style={{ textDecoration: 'none' }} id='bcb-link-text' href='/'>
//               <FaHome size={25} id='bcb-home-logo' /> {translate('home')}
//             </Link>
//           </Breadcrumb.Item>
//           {props?.link ?
//             <Breadcrumb.Item active id='bcb-active-item'>
//               <Link id='bcb-link-text' href={props?.link}>
//                 {props?.SecondElement}
//               </Link>
//             </Breadcrumb.Item>
//             :
//             <Breadcrumb.Item active id='bcb-active-item'>
//               {props?.SecondElement}
//             </Breadcrumb.Item>
//           }
//           {props?.ThirdElement === '0' ? null : (
//             <Breadcrumb.Item active id='bcb-third-item'>
//               {props?.ThirdElement}
//             </Breadcrumb.Item>
//           )}
//           {props?.FourthElement === '0' ? null : (
//             <Breadcrumb.Item active id='bcb-third-item'>
//               {props?.FourthElement}
//             </Breadcrumb.Item>
//           )}

//           {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
//         </div>
//       </div>
//     </Breadcrumb>
//   )
// }

// export default BreadcrumbNav

import React from 'react';
import { Breadcrumb } from 'antd';
import { FaHome } from 'react-icons/fa';

const BreadcrumbNav = ({ SecondElement, ThirdElement, FourthElement }) => {
  const items = [
    {
      title: (
        <span>
          <FaHome size={25} id='bcb-home-logo' className='me-1' />
          Home
        </span>
      ),
      href: '/',
    },
  ];

  if (SecondElement !== '') {
    items.push({
      title: SecondElement,
      href: SecondElement == 'category' ? '/all-categories' : null
    });
  }

  if (ThirdElement !== '') {
    items.push({
      title: ThirdElement,
    });
  }

  if (FourthElement !== '') {
    items.push({
      title: FourthElement,
      href: '',
    });
  }

  return (
    <Breadcrumb
      className='container breadcrumbWrapper'
      separator="|"
      items={items}
    />
  );
};

export default BreadcrumbNav;
