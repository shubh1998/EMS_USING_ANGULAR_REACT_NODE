import { observer } from 'mobx-react-lite';
import React from 'react'
import CustomContainer from '../../components/ui/Container';
import CustomTypography from '../../components/ui/Typography';

export const ContactUs = observer(() => {
    return (
        <CustomContainer>
            <CustomTypography variant="h4" label="Contact Us"/>
        </CustomContainer>
    )
})
