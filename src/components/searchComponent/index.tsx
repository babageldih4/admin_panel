import React, { useEffect } from "react";
import { Input, Grid } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsSearchModalOpen } from "../../store/general/generalSlice";
import styles from "../../styles/search.module.scss";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
// import { isMac } from "../../functions";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { darkTheme } from "../../plugins/antd";
const { Search } = Input;
const { useBreakpoint } = Grid;

export const StyledSearch = styled(Search)`
  & .ant-input {
    border-radius: 2px !important;
  }
  & .ant-input-search-button {
    border-radius: 2px !important;
  }
`;

function SearchComponent() {
  const location = useLocation().pathname;
  // const { renderedIn = location } = props;
  const dispatch = useAppDispatch();
  const { searchValue, isSearchModalOpen, filterExists } = useAppSelector(
    (state) => state.general
  );
  // const { t } = useTranslation();
  const screens = useBreakpoint();
  useEffect(() => {
    const handleFKeyPress = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        (event.key === "f" || event.key === "F")
      ) {
        event.preventDefault();
        handleOpenModal();
      }
    };

    document.addEventListener("keydown", handleFKeyPress);

    return () => {
      document.removeEventListener("keydown", handleFKeyPress);
    };
  }, []);
  const handleOpenModal = () => {
    dispatch(setIsSearchModalOpen(true));
  };

  return (
    <div>
      {screens.xs ? (
        <SearchOutlined
          className={styles["search-input"]}
          onClick={handleOpenModal}
          style={{ color: darkTheme ? "white" : "black", fontSize: "20px" }}
        />
      ) : (
        <StyledSearch
          // placeholder={"SearchPlaceholder".replace("$", isMac() ? "cmd" : "ctrl")}
          placeholder="Search(ctrl+F for search)"
          style={{
            borderRadius: "2px",
          }}
          value={searchValue}
          className={styles["search-input"]}
          onClick={handleOpenModal}
          // key={renderedIn}
          onMouseDown={handleOpenModal}
          onKeyDown={handleOpenModal}
          suffix={
            filterExists ? (
              <FilterOutlined
                style={{ color: "red", fontSize: "var(--ant-font-size-lg)" }}
              />
            ) : null
          }
        />
      )}
    </div>
  );
}

export default SearchComponent;
