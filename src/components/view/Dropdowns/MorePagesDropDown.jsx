import React, { useEffect, useState } from 'react'
import { Dropdown } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaAngleDown } from "react-icons/fa6";

import { translate } from 'src/utils';
import { selectCurrentLanguage } from 'src/store/reducers/languageReducer';
import { loadMorePages } from 'src/store/reducers/MorePagesReducers';
import { useSelector } from 'react-redux';

const MorePagesDropDown = ({ handleClose }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [Data, setData] = useState([])
    const currentLanguage = useSelector(selectCurrentLanguage)

    useEffect(() => {

        loadMorePages({
            onSuccess: (res) => {
                setData(res.data)
                setIsLoading(false)
            },
            onError: (err) => {
                console.log(err)
                setIsLoading(false)

            }
        })
    }, [currentLanguage])

    const router = usePathname();


    // Filter out 'About Us' and 'Contact Us' titles
    const filteredData = Data.filter(page => page.title !== 'About Us' && page.title !== 'Contact Us');

    const items = filteredData.map((page, index) => ({
        key: index + 1,
        label: (
            <>
                <span>
                    <Link
                        href={`/more-pages/${page?.slug}`}
                        className={`dropdownItem ${router === page.url ? 'navActive' : ''}`}
                        onClick={handleClose}
                    >
                        {page.title || translate('defaultTitle')}
                    </Link>
                </span>
            </>
        ),
    }));

    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
                className="navDropdown commonDropDown"
            >
                <a onClick={(e) => e.preventDefault()}>
                    <span className={`nav-link headerDropdownItem ${router === '/terms-condition' || router === '/privacy-policy' ? 'navLinkActive' : ''}`}>
                       { translate('More Pages')}
                        <FaAngleDown />
                    </span>
                </a>
            </Dropdown>
        </div>
    )
}

export default MorePagesDropDown
