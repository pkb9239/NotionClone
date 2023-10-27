import DocumentEditPage from "./DocumentEdit/DocumentEditPage.js";
import SideBar from "./SideBar/SideBar.js";
import { initRouter, push } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.style.display = "flex";
  $page.style.flexDirection = "row";
  $target.appendChild($page);

  //{parentId: id}
  const onAdd = async (value) => {
    console.log(value);

    // 부모 id가 없으면
    push(`/documents/new`);
    const createdDocument = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "",
        parent: "123"
      }),
    });
    history.replaceState(null, null, `/documents/${createdDocument.id}`);
    documentEditPage.setState({ documentId: createdDocument.id, });
    sideBar.render();
  };

  const onDelete = async (a) => {
    push("/");
    await request(`/documents/${a}`, {
      method: "DELETE",
      body: JSON.stringify({
        title: "",
        parent: "",
      }),
    });
    sideBar.render();
  };

  const sideBar = new SideBar({
    $target: $page,
    initialState,
    onAdd,
    onDelete,
  });

  let timer = null;
  const onEdit = ({ id, title, content,  parent }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const editedDocument = await request(`/documents/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content,  parent }),
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
        parent: "",
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
      documentEditPage.setState({ documentId }); //19128
    }
  };

  this.route();

  initRouter(() => this.route());
}
