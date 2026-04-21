import React, { useContext } from "react";
import { Box, Fab, useTheme } from "@mui/material";
import Website from "./Website";
import { GlobalContext } from "../context/GlobalContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getBrandFromUrl } from "../utils/helpers";
import { FORM_MODES, NEW_WEBSITE_ID } from "../utils/constants";
import { UI_LITERALS } from "../i18n/literals";

const WebsiteList: React.FC = () => {
  const {
    filteredWebsites,
    setWebsiteFormOpen,
    setWebsiteFormMode,
    setCurrentWebsiteId,
    deleteWebsite,
  } = useContext(GlobalContext);
  const theme = useTheme();

  const handleOpenWebsiteForm = () => {
    setWebsiteFormMode(FORM_MODES.CREATE);
    setCurrentWebsiteId(NEW_WEBSITE_ID);
    setWebsiteFormOpen(true);
  };

  const handleEditWebsite = (websiteId: string) => {
    setWebsiteFormMode(FORM_MODES.EDIT);
    setCurrentWebsiteId(websiteId);
    setWebsiteFormOpen(true);
  };

  const handleDeleteWebsite = (websiteId: string) => {
    deleteWebsite(websiteId);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(4, 1fr)",
            sm: "repeat(6, 1fr)",
            md: "repeat(8, 1fr)",
            lg: "repeat(12, 1fr)",
          },
          gap: "16px",
          marginTop: "16px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {filteredWebsites.length > 0 ? (
          filteredWebsites.map((website) => (
            <div key={website.id} style={{ gridColumn: "span 2" }}>
              <Website
                categoryId={website.categoryId}
                iconName={getBrandFromUrl(website.url)}
                name={website.name}
                url={website.url}
                onEdit={() => handleEditWebsite(website.id)}
                onDelete={() => handleDeleteWebsite(website.id)}
              />
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: "span 12",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {UI_LITERALS.website.emptyState}
          </div>
        )}
      </Box>
      <Fab
        onClick={handleOpenWebsiteForm}
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          height: "3.4em",
          px: 2.5,
          fontWeight: "bold",
          borderRadius: "999px",
          color: "primary.contrastText",
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
              : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          boxShadow: 6,
          "&:hover": {
            boxShadow: 10,
            transform: "translateY(-2px)",
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                : `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          },
        }}
      >
        <AddCircleIcon sx={{ mr: 1 }} />
        {UI_LITERALS.website.createButton}
      </Fab>
    </>
  );
};

export default WebsiteList;
