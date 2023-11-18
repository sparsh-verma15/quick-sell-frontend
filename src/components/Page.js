import React, { useState, useEffect } from 'react';
import { groupByHelper } from './helperFunctions';
import Section from './Section';
import styled from 'styled-components';
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineDisplaySettings } from "react-icons/md";
import axios from 'axios';


const numToPriority = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority"
}

const Page = () => {
    // Retrieve stored values or use default values
    const storedGroupBy = localStorage.getItem('groupBy') || 'status';
    const storedOrderBy = localStorage.getItem('orderBy') || 'priority';
    const [groupBy, setGroupBy] = useState(storedGroupBy);
    const [orderBy, setOrderBy] = useState(storedOrderBy);
    const [fetchData,setFetchData] = useState({});
    const [pageData, setPageData] = useState([]);
    const [idToName, setidToName] = useState();
    const [showOptions, setShowOptions] = useState(false);

    const handleGroupByChange = () => {
        let newData = {};
        if (groupBy == "user") {
            newData = groupByHelper(fetchData, idToName, 'userId');
        } else {
            newData = groupByHelper(fetchData, idToName, groupBy);
        }
        const arrayOfObjects = Object.entries(newData).map(([keyName, cardData]) => {
            let cardTitle = groupBy === 'priority' ? numToPriority[keyName] : keyName;
            return { cardTitle, cardData };
        });
        setPageData(arrayOfObjects);
        handleDisplayClicked();
    }

    const handleOrderByChange = () => {
        if (orderBy === 'priority') {
            const sortCardDataByPriority = (cardData) => {
                return cardData.sort((a, b) => a.priority - b.priority);
            };
            const sortedData = pageData.map((group) => ({
                cardTitle: group.cardTitle,
                cardData: sortCardDataByPriority(group.cardData)
            }));
            setPageData(sortedData);
        }
        if (orderBy === 'title') {
            const sortCardData = (cardData) => {
                return cardData.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });
            };

            const sortedData = pageData.map((group) => ({
                cardTitle: group.cardTitle,
                cardData: sortCardData(group.cardData)
            }));
            setPageData(sortedData);
        }
        handleDisplayClicked();
    }

    useEffect(() => {
        localStorage.setItem('groupBy', groupBy);
        handleGroupByChange();
    }, [groupBy])
    useEffect(() => {
        localStorage.setItem('orderBy', orderBy);
        handleOrderByChange();
    }, [orderBy])

    useEffect(() => {
        const userData = fetchData["users"];
        const temp = {};
        for (let itr in userData) {
            let userId = userData[itr].id;
            let userName = userData[itr].name;
            temp[userId] = userName;
        }
        setidToName(temp);
        handleGroupByChange();
    }, [fetchData])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
              setFetchData(response.data);
            } catch (error) {
              console.log("failed to fetch")
            }
          };
          fetchData();
    }, [])


    const handleDisplayClicked = () => {
        setShowOptions(prev => !prev);
    }

    return (
        <>
            <Header>
                <DisplayButton onClick={handleDisplayClicked} ><MdOutlineDisplaySettings />&nbsp;Display <RiArrowDropDownLine /></DisplayButton>
                {
                    showOptions ?
                        <OptionsContainer>
                            <div>
                                <OptionName>Group By</OptionName>
                                <br/>
                                <OptionName>Order By</OptionName>
                            </div>
                            <div>
                                <StyledSelect value={groupBy} onChange={(event) => setGroupBy(event.target.value)}>
                                    <option value="status">Status</option>
                                    <option value="user">User</option>
                                    <option value="priority">Priority</option>
                                </StyledSelect>
                                <br/>
                                <StyledSelect value={orderBy} onChange={(event) => setOrderBy(event.target.value)}>
                                    <option value="title">Title</option>
                                    <option value="priority">Priority</option>
                                </StyledSelect>
                            </div>
                        </OptionsContainer> :
                        <></>
                }
            </Header>
            <OuterContainer>
                <SectionContainer>
                    {
                        pageData.map((obj, idx) => (
                            <Section data={obj} />
                        ))
                    }
                </SectionContainer>
            </OuterContainer>
        </>
    )
}



const SectionContainer = styled.div`
    display: flex;
    /* overflow:auto; */
`

const OuterContainer = styled.div`
`

const OptionsContainer = styled.div`
    text-align: center;
    position: absolute;
    background-color: white;
    width: 250px;
    height: 100px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1%;
    border-radius: 8px;
    /* background-color: rgba(255,255,255,0.5); */
`

const Header = styled.div`
    height : 25px;
    width: 100vw;
    background-color: white;
    margin-bottom: 25px;
    padding:10px 10%;
`
const StyledSelect = styled.select`
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
  cursor: pointer;
  width: 100px;
`;

const OptionName = styled.div`
    color: grey;
`;

const DisplayButton = styled.button`
    border: none;
    background-color: white;
    font-weight: 700;
    padding: 5px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;`

export default Page