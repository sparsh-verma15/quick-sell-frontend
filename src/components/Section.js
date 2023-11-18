import React from 'react'
import Card from './Card'
import styled from 'styled-components'
import { FaPlus } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";

function Section({data}) {
  return (
    <OuterContainer>
        <SectionTitle>
            {data["cardTitle"]}
            <div style={{marginLeft:"auto"}}>
                <FaPlus />
                <CiMenuKebab/>
            </div>
        </SectionTitle>
        <CardContainer>
        {data["cardData"].map(obj => {
            return (
                <Card data={obj}/>
            )
        })}
        </CardContainer>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
    width: 400px;
    min-width: 400px;
    padding:0 20px;
    box-sizing: border-box;
    height: 100vh;
    margin-right:3%;
`

const CardContainer = styled.div`

`

const SectionTitle = styled.div`
    font-weight:600;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 18px;

`
export default Section