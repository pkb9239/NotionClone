import DocumentEditPage from "./DocumentEdit/DocumentEditPage.js";
import SideBar from "./SideBar/SideBar.js";
import { initRouter, push } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.style.display = "flex";
  $page.style.flexDirection = "row";
  $target.appendChild($page);

  const onAdd = async (a) => {
    push(`/documents/${a}`);
    const createdDocument = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "",
        parent: "",
      }),
    });
    history.replaceState(null, null, `/documents/${createdDocument.id}`);
    documentEditPage.setState({ documentId: createdDocument.id });
    sideBar.render();
  };

  const sideBar = new SideBar({
    $target: $page,
    initialState,
    onAdd,
  });

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

  const documentEditPage = new DocumentEditPage({
    $target: $page,
    initialState: {
      documentId: "",
      document: {
        title: "",
        content: "",
      },
    },
    onEdit,
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      sideBar.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      // /documents/ 이걸로 시작하는 경우는
      const [, , documentId] = pathname.split("/"); // 두번째 인덱스값이 필요. 
      documentEditPage.setState({ documentId }); 
    }
  };

  this.route();

  initRouter(() => this.route());
}
