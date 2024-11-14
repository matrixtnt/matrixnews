import { useEffect } from 'react';
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsLink45Deg } from "react-icons/bs";
import { PiDotsThreeCircleVerticalFill } from "react-icons/pi";
import { translate } from 'src/utils';

const WithoutSeoShare = ({ handleCopyUrl, url }) => {
    // Encode the URL to ensure it's properly formatted for sharing
    const encodedUrl = decodeURI(url)

    useEffect(() => {
        // Initialize AddToAny with the current URL
        if (window.a2a) {
            window.a2a.init_all();
            // Set the URL dynamically
            window.a2a_config = window.a2a_config || {};
            window.a2a_config.linkurl = url;
        }
    }, [url]); // Add url as dependency to re-run when URL changes

    // Direct sharing URLs
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
        addToAny: `https://www.addtoany.com/share#url=${encodedUrl}`
    };

    return (
        <div>
            <div className="a2a_kit a2a_kit_size_32 a2a_default_style" id="nv-right-head">
                <h6 id="nv-Share-Label">{translate('shareLbl')}:</h6>
                
                <a 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="a2a_button_facebook" 
                    href={shareUrls.facebook}
                >
                    <FaFacebook size={35} />
                </a>
                
                <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="a2a_button_whatsapp"
                    href={shareUrls.whatsapp}
                >
                    <IoLogoWhatsapp size={38} color="#25dd66" />
                </a>
                
                <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="a2a_button_x"
                    href={shareUrls.twitter}
                >
                    <FaSquareXTwitter size={38} color="#000" />
                </a>
                
                <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="a2a_dd"
                    href={shareUrls.addToAny}
                >
                    <PiDotsThreeCircleVerticalFill size={44} color="red" />
                </a>
                
                <button 
                    onClick={handleCopyUrl} 
                    className="copy_url"
                    aria-label="Copy link"
                >
                    <BsLink45Deg size={26} />
                </button>
            </div>
        </div>
    );
};

export default WithoutSeoShare;