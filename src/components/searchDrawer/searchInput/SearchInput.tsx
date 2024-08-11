import React, { useEffect, useRef, useCallback } from "react";
import "./searchInput.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSearchValue } from "../../../store/general/generalSlice";
import { Input, InputRef } from "antd";
import { styled } from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

type TProps = {
  states?: any;
  handleOkButton?: any;
  searchPlaceholder?: string;
};

const StyledSearch = styled(Input)`
  & .ant-input {
    border-radius: 2px !important;
  }
  & .ant-input-search-button {
    border-radius: 2px !important;
  }
`;

function SearchInput(props: TProps) {
  const { searchValue } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();
  const {
    states = "",
    handleOkButton,
    searchPlaceholder = states?.searchPlaceholder,
  } = props;

  const searchInputRef = useRef<InputRef>(null);

  // const handleSearchInputChange = (e: any) => {
  //   dispatch(setSearchValue(e.target.value));
  // };

  // const handleSearchInputChange = useCallback(
  //   debounce((e: React.ChangeEvent<HTMLInputElement>) => {
  //     dispatch(setSearchValue(e.target.value));
  //   }, 500), // Adjust the debounce delay as needed
  //   []
  // );

  // useEffect(() => {
  //   if (searchInputRef.current) {
  //     setTimeout(() => {
  //       searchInputRef.current!.select();
  //     }, 100);
  //   }
  // }, [isSearchModalOpen]);

  const onSearchIconClick = () => {
    if (handleOkButton) handleOkButton();
  };

  return (
    <div className="search-input-div">
      <StyledSearch
        ref={searchInputRef}
        prefix={<SearchOutlined onClick={onSearchIconClick} />}
        placeholder={searchPlaceholder}
        onPressEnter={onSearchIconClick}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setSearchValue(e.target.value))
        }
        // onChange={() => handleSearchInputChange}
        value={searchValue}
      />
    </div>
  );
}

export default React.memo(SearchInput);
