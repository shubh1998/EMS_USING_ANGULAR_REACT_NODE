import HashLoader from 'react-spinners/HashLoader'

const PageLoader = ({ loading, ...otherProps }) => {
    return (
        <div style={{position: 'absolute', top: '50%', left: '50%', backgroundColor: '#FFFFFF', zIndex: 10000}}>
            <HashLoader loading={loading} {...otherProps} color="blue"/>
        </div>
    )
}

export default PageLoader
