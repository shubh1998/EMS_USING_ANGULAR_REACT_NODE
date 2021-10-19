import { Container } from "@material-ui/core"

const CustomContainer = ({ children }) => {
    return (
        <Container style={{marginTop: 20, marginBottom: 20}}>
            { children }
        </Container>
    )
}

export default CustomContainer;