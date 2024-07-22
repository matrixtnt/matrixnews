import { useEffect } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsLink45Deg } from "react-icons/bs";
import { PiDotsThreeCircleVerticalFill } from "react-icons/pi";
import { translate } from 'src/utils';

const WithoutSeoShare = ({ handleCopyUrl }) => {
    useEffect(() => {
        if (window.a2a) {
            window.a2a.init_all();
        }
    }, []);

    return (
        <div>
            <div className="a2a_kit a2a_kit_size_32 a2a_default_style" id='nv-right-head'>
                <h6 id='nv-Share-Label'>{translate('shareLbl')}:</h6>
                <a target='_blank' className="a2a_button_facebook" href={`https://www.addtoany.com/add_to/facebook`}> <FaFacebook size={35} round /></a>
                <a target='_blank' className="a2a_button_whatsapp" href={`https://www.addtoany.com/add_to/whatsapp`}> <IoLogoWhatsapp size={38} round color='#25dd66' /></a>
                <a target='_blank' className="a2a_button_x" href={`https://www.addtoany.com/add_to/x`}> <FaSquareXTwitter size={38} round color='#000' /></a>
                <a className="a2a_dd" href="https://www.addtoany.com/share">
                    <PiDotsThreeCircleVerticalFill size={44} color='red' />
                </a>
                <button onClick={handleCopyUrl} className='copy_url'>
                    <BsLink45Deg size={26} />
                </button>
            </div>
            {/* Add other buttons as needed */}
        </div>
    );
};

export default WithoutSeoShare;
