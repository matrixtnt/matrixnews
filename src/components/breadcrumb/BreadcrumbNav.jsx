import Link from 'next/link'
import React from 'react'
import { FaHome } from 'react-icons/fa';
import { translate } from 'src/utils';

const Breadcrum = ({ SecondElement, ThirdElement, FourthElement }) => {
  const formatElement = (element) => {
    // Check if the element is a number
    if (!isNaN(element)) {
      return element;
    }
    // Otherwise, capitalize the first letter
    return element?.charAt(0).toUpperCase() + element?.slice(1);
  };

  return (
    <div className='breadcrumbWrapper'>
      <div className='pageName container'>
        <Link href={'/'} className='firstElement'>
          <FaHome size={25} className='me-1' />
          <span> {translate('home')} </span>
        </Link>
        <span> | </span>
        {
          SecondElement === 'category'
            ? <Link href={'/all-categories'}><span>{translate('catLbl')}</span></Link>
            : <span>{formatElement(SecondElement)}</span>
        }

        {ThirdElement && (
          <>
            <span> | </span>
            <span className='contentUpperCase'>{formatElement(ThirdElement)}</span>
          </>
        )}
        {FourthElement && (
          <>
            <span> | </span>
            <span className='contentUpperCase'>{formatElement(FourthElement)}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default Breadcrum;
