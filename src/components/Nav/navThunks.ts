import { createAsyncThunk } from "@reduxjs/toolkit";
export const downloadJSON = createAsyncThunk(
  "download/cardCollection",
  async (checkedCards: any) => {
    if (!checkedCards) {
      return;
    }

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(checkedCards));

    const timestamp = Date.now();

    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      "PokéTrackBackup" + timestamp + ".json"
    );
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
);
