import { ReactNode, useState } from "react"
import styled, { css } from "styled-components"



export default function Collapse({ title, children, initialState = false }: { title: string, children: ReactNode, initialState?: boolean }) {
    const [hide, setHide] = useState(initialState)
    const icon = hide ? "▼" : "▲"
    return (
        <Container hide={hide}>
            <Title onClick={() => setHide(!hide)}>
                <h1>{title} {icon}
                </h1>
            </Title>
            <Content>
                {!hide && children}

            </Content>
        </Container>

    )
}

const highlight = css`
background: linear-gradient(145deg, #2c2c2c, #252525);
box-shadow:  20px 20px 60px #232323,
             -20px -20px 60px #2f2f2f;
`


const notHighlight = css`
background: linear-gradient(145deg, #252525, #2c2c2c);
box-shadow:  20px 20px 60px #232323,
             -20px -20px 60px #2f2f2f;
`

const Title = styled.div`
    text-align: center;
    padding:2rem;
    
`
const Content = styled.div` 
    display: grid;
    gap:1rem;
`

const Container = styled.div<{ hide: boolean }>` 
    display:flex;
    flex-direction: column;
    width:100%;
    gap:10px;
    padding:1rem;
    border-radius:10px;
    ${({ hide }) => hide ? highlight : notHighlight}
`