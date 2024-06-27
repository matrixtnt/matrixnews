import React from 'react'
import { translate } from 'src/utils'
import { FacebookIcon, FacebookShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share';
import { BsLink45Deg } from 'react-icons/bs';

const SeoShare = ({ url, title, hashtag, handleCopyUrl,setWhatsappImageLoaded }) => {
    return (
        <div id='nv-right-head'>
            <h6 id='nv-Share-Label'>{translate('shareLbl')}:</h6>

            <FacebookShareButton
                url={url}
                title={title}
                hashtag={hashtag}
            >
                <FacebookIcon size={40} round />
            </FacebookShareButton>
            <WhatsappShareButton
                url={url}
                title={title}
                hashtag={hashtag}
                beforeOnClick={() => setWhatsappImageLoaded(false)}
            >
                <WhatsappIcon size={40} round onLoad={() => setWhatsappImageLoaded(true)} />
            </WhatsappShareButton>
            <TwitterShareButton
                url={url}
                title={title}
                hashtag={hashtag}
            >
                <XIcon size={40} round />
            </TwitterShareButton>
            <button onClick={handleCopyUrl} className='copy_url'>
                <BsLink45Deg size={30} />
            </button>

        </div>
    )
}

export default SeoShare
