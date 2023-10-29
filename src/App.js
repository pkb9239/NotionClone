import DocumentEditPage from "./DocumentEdit/DocumentEditPage.js";
import SideBar from "./SideBar/SideBar.js";
import { initRouter, push } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.style.display = "flex";
  $page.style.flexDirection = "row";
  $target.appendChild($page);

  const createDocument = async (title, parent) => {
    try {
      
      const { id: newId, ...newDocument } = await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title,
          parent,
        }),
      });

      history.replaceState(null, null, `${newId}`);

      documentEditPage.setState({
        documentId: newId,
        document: newDocument,
      });

      sideBar.render({
        ...sideBar.state,
        selectedDocumentId: parseInt(newId),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onAdd = async (id) => {
    try {
      if (id === "new") {
        // 새 루트 문서 생성
        createDocument("", null);
      } else if (typeof id === "number") {
        // 새 하위 문서 생성
        createDocument("", id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    await request(`/documents/${id}`, {
      method: "DELETE",
    });
    push("/");
    sideBar.render();
    this.route()
  };


  let timer = null;
  const onEdit = ({ id, title, content }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const editedDocument = await request(`/documents/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });

      documentEditPage.setState({
        documentId: editedDocument.id,
        document: editedDocument,
      });

      sideBar.render();
    }, 1000);
  };

  const sideBar = new SideBar({
    $target: $page,
    initialState: {
      documents: [],
      selectedDocumentId: null,
    },
    onAdd,
    onDelete,
  });

  const documentEditPage = new DocumentEditPage({
    $target: $page,
    initialState: {
      documentId: "",
      document: {
        title: "",
        parent: "",
        content: "",
      },
    },
    onEdit,
    onDelete
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      sideBar.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      // /documents/ 이걸로 시작하는 경우는
      const [, , documentId] = pathname.split("/"); // 두번째 인덱스값이 필요.
      documentEditPage.setState({
        ...documentEditPage.state,
        documentId: isNaN(documentId) ? documentId : parseInt(documentId),
      });
    }
  };

  this.route();

  initRouter(() => this.route());
}
