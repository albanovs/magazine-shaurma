import DetailItem from '../../../../../components/shared/DetailItem'
import React from 'react'

function page({ params }) {
    return (
        <div className='lg:mx-20 mx-5'><DetailItem id={params.id} groupId={params.groupId} /></div>
    )
}

export default page