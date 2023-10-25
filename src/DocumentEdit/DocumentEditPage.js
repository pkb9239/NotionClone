import Editor from "./Editor.js";
import { request } from "../utils/api.js";

export default function DocumentEditPage({ $target, initialState, onEdit }) {
  
  this.state = initialState;

  const editor = new Editor({
    $target,
    initialState: {
      title: '',
      content: '',
    },
    onEdit
  });

  this.setState = async (nextState) => {
    console.log(this.state, nextState);
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      await fetchDocument();
      return;
    }
    this.state = nextState;

    editor.setState(
      this.state.document || {
        title: "",
        content: "",
      }
    );
  };
  const fetchDocument = async () => {
    const { documentId } = this.state;
    if (documentId !== "new") {
      const document = await request(`/documents/${documentId}`);
      this.setState({
        ...this.state,
        document, 
      });
    }
  };
}
