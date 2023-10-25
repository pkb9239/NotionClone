import DocumentList from "./DocumentList.js";
import { request } from "../utils/api.js";
import DocumentAddButton from "./DocumentAddButton.js";

export default function SideBar({ $target, onAdd }) {
  const $sideBarContents = document.createElement("div");
  $target.appendChild($sideBarContents);

  const documentList = new DocumentList({
    $target: $sideBarContents,
    initialState: [],
  });
  new DocumentAddButton({
    $target: $sideBarContents,
    initialState: {
      text: "새 페이지 추가",
    },
    onAdd,
  });

  this.render = async () => {
    const document = await request("/documents");
    documentList.setState(document);
  };

  this.render();
}
