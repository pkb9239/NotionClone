import Editor from "./Editor.js";
import { request } from "../utils/api.js";

export default function DocumentEditPage({ $target, initialState, onEdit }) {
  this.state = initialState;
  /*
  initialState: {
    documentId: "",
    document: {
      parent: "",
      title: "",
      content: "",
    },
  },
  */
  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
    onEdit,
  });

  this.setState = async (nextState) => {
    console.log(nextState);
    if (this.state.documentId === nextState.documentId) {
      this.state = { ...this.state, ...nextState };

      editor.setState(
        this.state.document || {
          title: "",
          content: "",
        }
      );
      return;
    }
    this.state = { ...this.state, ...nextState };
    if (this.state.documentId === "new") {
      editor.setState({
        title: "",
        content: "",
      });
    } else {
      await fetchDocument();
    }
  };
  const fetchDocument = async () => {
    const { documentId } = this.state;
    const document = await request(`/documents/${documentId}`);
    if (!document) {
      alert("에러발생 없는 페이지 입니다");
      push("/");
      return;
    }
    this.setState({
      ...this.state,
      document,
    });
  };
}
