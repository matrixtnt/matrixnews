import { useEffect } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsLink45Deg } from "react-icons/bs";

const SocialShare = ({ url, title, hashtag, handleCopyUrl }) => {
    useEffect(() => {
        if (window.a2a) {
            window.a2a.init_all();
        }
    }, []);

    return (
        <div>
            <div class="a2a_kit a2a_kit_size_32 a2a_default_style" id='nv-right-head'>
                {/* <a target='_blank' className="a2a_dd" href={`https://www.addtoany.com/share#url=${url}&title=${title}&note=${hashtag}`} ><FaPlusCircle size={35} color='red' /></a> */}
                {/* <a target='_blank' className="a2a_dd" href={`https://www.addtoany.com/share#url=${url}&title=${title}`} ><FaPlusCircle/></a> */}
                <a target='_blank' className="a2a_button_facebook" href={`https://www.addtoany.com/add_to/facebook?linkurl=${url}&linkname=${title}&linknote=${hashtag}`}> <FaFacebook size={35} round /></a>
                <a target='_blank' className="a2a_button_whatsapp" href={`https://www.addtoany.com/add_to/whatsapp?linkurl=${url}&linkname=${title}&linknote=${hashtag}`}> <IoLogoWhatsapp size={38} round color='#25dd66' /></a>
                <a target='_blank' className="a2a_button_x" href={`https://www.addtoany.com/add_to/x?linkurl=${url}&linkname=${title}&linknote=${hashtag}`}> <FaSquareXTwitter size={38} round color='#000' /></a>
                <a class="a2a_dd" target='_blank' href={`https://www.addtoany.com/share#url=${url}&title=${title}&note=${hashtag}`}>
                    <FaCirclePlus size={35} color='red' />
                </a>
                <button onClick={handleCopyUrl} className='copy_url'>
                    <BsLink45Deg size={28} />
                </button>
            </div>
            {/* Add other buttons as needed */}
        </div>
    );
};

export default SocialShare;
