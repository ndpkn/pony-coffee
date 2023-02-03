import { Box, Skeleton } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

const HeaderMenuSkeleton = (props) => (
    // <ContentLoader
    //     speed={4}
    //     width={380}
    //     height={300}
    //     viewBox="0 0 380 250"
    //     backgroundColor="#F3F3F3"
    //     foregroundColor="#ECEBEB"
    //     {...props}
    //     >
    //     <rect x="20" y="6" rx="10" ry="10" width="300" height="30" />
    //     <rect x="20" y="55" rx="10" ry="10" width="200" height="30" />
    //     <rect x="20" y="104" rx="10" ry="10" width="250" height="30" />
    //     <rect x="20" y="153" rx="10" ry="10" width="200" height="30" />
    //     <rect x="20" y="202" rx="10" ry="10" width="300" height="30" />
    // </ContentLoader>
    <Box sx={{ width: 350 }}>
        <Skeleton animation="wave" height={50} width={300}/>
        <Skeleton animation="wave" height={50} width={250}/>
        <Skeleton animation="wave" height={50} width={300}/>
        <Skeleton animation="wave" height={50} width={200}/>
        <Skeleton animation="wave" height={50} width={270}/>
    </Box>
)

export default HeaderMenuSkeleton

