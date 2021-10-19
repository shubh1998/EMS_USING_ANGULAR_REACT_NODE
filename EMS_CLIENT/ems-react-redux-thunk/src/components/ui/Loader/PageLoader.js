import HashLoader from 'react-spinners/HashLoader'



const PageLoader = ({ loading, ...otherProps }) => {
    return (
        <div style={{backgroundColor: '#FFFFFF', height: '100vh'}}>
            <div style={{position: 'absolute', top: '50%', left: '50%', zIndex: 10000}}>
                <HashLoader loading={loading} {...otherProps} color="blue"/>
            </div>
        </div>
    )
}

export default PageLoader
