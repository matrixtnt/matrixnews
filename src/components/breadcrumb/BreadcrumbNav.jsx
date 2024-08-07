import Link from 'next/link'
import React from 'react'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { FaHome } from 'react-icons/fa';
import { translate } from 'src/utils';

const Breadcrum = ({ SecondElement, ThirdElement, FourthElement }) => {
  return (
    <div className='breadcrumbWrapper'>
      <div className='pageName container'>
        <Link href={'/'} className='firstElement'> <FaHome size={25} className='me-1' /><span> {translate('home')} </span></Link>
        <span> | </span>
        {
          SecondElement == 'category' ? <Link href={'/all-categories'}><span>{translate('catLbl')}</span></Link> : <span>{SecondElement}</span>
        }

        {
          ThirdElement &&
          <>
            <span> | </span>
            <span className='contentUpperCase'>{ThirdElement}</span>
          </>
        }
        {
          FourthElement &&
          <>
            <span> | </span>
            <span className='contentUpperCase'>{FourthElement}</span>
          </>
        }


      </div>

    </div >
  )
}

export default Breadcrum
