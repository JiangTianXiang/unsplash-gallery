import styled from "styled-components";

export const SearchInput = styled.input`
  height: 20px;
  font-size: 14px;
  border: none;
  margin-top: 13px;
  margin-left: 33px;
  &:focus {
    border: none;
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  margin-bottom: 21px;
  height: 49px;

  display: flex;
  flex-direction: row;
  background-color: white;
`;

export const SearchIcon = styled.img`
  width: 23px;
  height: 23px;
  margin-left: 33px;
  margin-top: 13px;
`;
