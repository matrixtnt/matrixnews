import Skeleton from 'react-loading-skeleton';

import React from 'react'
import AdSpaceSkeleton from './AdSpaceSkeleton';
import CommonViewMoreSkeleton from './CommonViewMoreSkeleton';

const textSkeleton = () => {
  return (
    <div className='new_video_style_two'>
      <div className='container'>
        {/* ad spaces */}
        <AdSpaceSkeleton />
        
        <div className='row'>
          <CommonViewMoreSkeleton />
          <div className='col-md-3'>
            <div className='textSkeleton'>
              <Skeleton height={300} width={'100%'} />
              <div className='innerDiv'>
                <Skeleton height={30} width={60} className='categoryBadge' />
                <Skeleton height={30} width={'100%'} className='title' />
              </div>
            </div>
            <div className='textSkeleton'>
              <Skeleton height={300} width={'100%'} />
              <div className='innerDiv'>
                <Skeleton height={30} width={60} className='categoryBadge' />
                <Skeleton height={30} width={'100%'} className='title' />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='textSkeleton'>
              <Skeleton height={600} width={'100%'} />
              <div className='innerDiv'>
                <Skeleton height={30} width={80} className='categoryBadge' />
                <Skeleton height={30} width={'100%'} className='title' />
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='textSkeleton'>
              <Skeleton height={300} width={'100%'} />
              <div className='innerDiv'>
                <Skeleton height={30} width={60} className='categoryBadge' />
                <Skeleton height={30} width={'100%'} className='title' />
              </div>
            </div>
            <div className='textSkeleton'>
              <Skeleton height={300} width={'100%'} />
              <div className='innerDiv'>
                <Skeleton height={30} width={60} className='categoryBadge' />
                <Skeleton height={30} width={'100%'} className='title' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className='new_video_style_two'>
    //   <div className='container'>
    //     <>
    //       <AdSpaceSkeleton />
    //     </>
    //     <div id='hns-head' className='row'>
    //       <CommonViewMoreSkeleton />
    //     </div>
    //     <div className='row'>

    //       <div className='col-md-3'>
    //         <>
    //           <div
    //             className='video_first_top card card_hover'
    //           >
    //             <Skeleton height={300} width={'100%'} />

    //             <div className='content'>
    //               <div>

    //                 <Skeleton height={30} width={50} />
    //               </div>
    //               <div>

    //                 <Skeleton height={30} width={50} />
    //               </div>
    //             </div>
    //           </div>
    //         </>

    //         <>
    //           <div
    //             className='video_first_top card card_hover'
    //           >
    //             <Skeleton height={300} width={'100%'} />

    //             <div className='content'>
    //               <Skeleton height={30} width={50} />
    //               <Skeleton height={30} width={80} />
    //             </div>
    //           </div>
    //         </>
    //       </div>
    //       <div className='col-md-6'>
    //         <>
    //           <div
    //             className='video_first_top card card_hover'
    //           >
    //             <Skeleton height={600} width={'100%'} />

    //             <div className='content'>
    //               <Skeleton height={30} width={50} />
    //               <Skeleton height={30} width={80} />
    //             </div>
    //           </div>
    //         </>
    //       </div>
    //       <div className='col-md-3'>
    //         <>
    //           <div
    //             className='video_first_top card card_hover'
    //           >
    //             <Skeleton height={300} width={'100%'} />

    //             <div className='content'>
    //               <Skeleton height={30} width={50} />
    //               <Skeleton height={30} width={80} />
    //             </div>
    //           </div>
    //         </>

    //         <>
    //           <div
    //             className='video_first_top card card_hover'
    //           >
    //             <Skeleton height={300} width={'100%'} />

    //             <div className='content'>
    //               <Skeleton height={30} width={50} />
    //               <Skeleton height={30} width={80} />
    //             </div>
    //           </div>
    //         </>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default textSkeleton

