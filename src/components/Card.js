import React from 'react'
import styled from 'styled-components'
import { BiAdjust } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
function Card({ data }) {
    let iconObj = {
        "done": <FaCheckCircle color='green'/>,
        "Todo": <FaRegCircle />,
        "In progress": <BiAdjust color='RGB(245, 203, 66)'/>,
        "Backlog": <FaExclamationCircle color='red'/>
    };
    return (
        <OuterContainer>
            <CardId>{data.id}</CardId>
            <CardTitle>
            {iconObj[data.status]}&nbsp;
               {data.title}
            </CardTitle>
            <CardTag>{data.tag[0]}</CardTag>
        </OuterContainer>
    )
}


const OuterContainer = styled.div`
    text-align: left;
    width: 100%;
    margin: 10px 0;
    padding:15px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    background-color: white;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const CardId = styled.div`
    color: grey;
`;
const CardTitle = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight:600;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const CardTag = styled.div`
    border: 1px solid rgba(0,0,0,0.25);
    width: fit-content;
    padding: 4px;
    color: grey;
    font-weight: 500;
    border-radius: 4px;
`;

export default Card