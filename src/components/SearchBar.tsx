import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ImageIcon from "@mui/icons-material/Image";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { openExternalUrlInNewTab } from "../utils/helpers";
import { SEARCH_TYPES, SearchType } from "../utils/constants";
import { UI_LITERALS } from "../i18n/literals";

export default function SearchBar() {
  const [searchType, setSearchType] = useState<SearchType>(
    SEARCH_TYPES.DEFAULT,
  );
  const [query, setQuery] = useState("");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSearchType(newValue as SearchType);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      const baseUrl = "https://www.google.com/search?q=";
      switch (searchType) {
        case SEARCH_TYPES.DEFAULT:
          openExternalUrlInNewTab(`${baseUrl}${encodeURIComponent(query)}`);
          break;
        case SEARCH_TYPES.IMAGES:
          openExternalUrlInNewTab(
            `${baseUrl}${encodeURIComponent(query)}&udm=2`,
          );
          break;
        case SEARCH_TYPES.VIDEOS:
          openExternalUrlInNewTab(
            `${baseUrl}${encodeURIComponent(query)}&udm=7`,
          );
          break;
        case SEARCH_TYPES.MAPS:
          openExternalUrlInNewTab(
            `https://www.google.com/maps?q=${encodeURIComponent(query)}`,
          );
          break;
        case SEARCH_TYPES.NEWS:
          openExternalUrlInNewTab(
            `${baseUrl}${encodeURIComponent(query)}&tbm=nws`,
          );
          break;
        default:
          openExternalUrlInNewTab(baseUrl);
      }
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
      onSubmit={handleSearch}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          minWidth: 120,
        }}
        placeholder={UI_LITERALS.search.placeholder(searchType)}
        inputProps={{ "aria-label": UI_LITERALS.search.ariaLabel(searchType) }}
        value={query}
        autoComplete="off"
        autoCorrect="off"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Tabs
        value={searchType}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons={false}
        allowScrollButtonsMobile
        aria-label="search type tabs"
        sx={{ flexShrink: 0, maxWidth: "60%" }}
      >
        <Tab value={SEARCH_TYPES.DEFAULT} icon={<SearchIcon />} />
        <Tab value={SEARCH_TYPES.IMAGES} icon={<ImageIcon />} />
        <Tab value={SEARCH_TYPES.VIDEOS} icon={<SlideshowIcon />} />
        <Tab value={SEARCH_TYPES.MAPS} icon={<DirectionsIcon />} />
        <Tab value={SEARCH_TYPES.NEWS} icon={<NewspaperIcon />} />
      </Tabs>
    </Paper>
  );
}
