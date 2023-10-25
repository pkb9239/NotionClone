import Editor from "./Editor.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import { request } from "../utils/api.js";

export default function DocumentEditPage({ $target, initialState }) {
  //initialState 어떤 게시글인지
  //   initialState: {
  //     documentId: "",
  //     document: {
  //       title: "",
  //       content: "",
  //     },
  //   },
  this.state = initialState;
  console.log("1", this.state); // {documentId: 'new'}
  let documentLocalKey = `temp-document-${this.state.documentId}`;

  const document = getItem(documentLocalKey, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target,
    initialState: document,
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(documentLocalKey, {
          ...document,
          tempSaveDate: new Date(), // 저장한 시간
        });
        const isNew = this.state.documentId === "new";
        if (isNew) {
          const createdDocument = await request("/documents", {
            method: "POST",
            body: JSON.stringify(document),
          });
          history.replaceState(null, null, `/documents/${createdDocument.id}`);
          // 주소를 바꿔줌 현재로 craetedDocument.id
          removeItem(documentLocalKey);
          this.setState({
            documentId: createdDocument.id,
          }); // 
          console.log(this.state); //this.state = 새로 생긴 주소임
        } else {
          await request(`/documents/${document.id}`, {
            method: "PUT",
            body: JSON.stringify(document),
          });
          removeItem(documentLocalKey);
        }
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      // new !== 95909 이니까
      this.state = nextState;
      console.log("2", this.state); // 95909
      await fetchDocument();
      return;
    }
    this.state = nextState;
    console.log("5", this.state);
    editor.setState(this.state.document);
  };
  const fetchDocument = async () => {
    const { documentId } = this.state;
    console.log("3", this.state); // 95909
    if (documentId !== "new") {
      // 95909 !== new
      const document = await request(`/documents/${documentId}`);
      console.log("4", document);
      console.log(this.state); //  {documentId: 95909, document: {…}}
      this.setState({
        ...this.state,
        document, // 현재 this.state에 id만 있는데 여기에 post를 추가하는거지 !
      });
    }
  };
}
