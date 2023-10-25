import DocumentList from "./DocumentList.js";
import { request } from "../utils/api.js";

export default function SideBar({ $target }) {
  const documentList = new DocumentList({
    $target,
    initialState: [],
  });

  const fetchDocument = async () => {
    const document = await request("/documents");
    documentList.setState(document);
  };

  this.render = () => {
    fetchDocument();
  }

  fetchDocument();
}
