import DocumentEditPage from "./DocumentEdit/DocumentEditPage.js";
import SideBar from "./SideBar/SideBar.js";

export default function App({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.style.display = "flex";
  $page.style.flexDirection = "row";
  $target.appendChild($page);

  const sideBar = new SideBar({
    $target: $page,
    initialState,
  });

  const documentEditPage = new DocumentEditPage({
    $target: $page,
    initialState: {
      documentId: "",
      document: {
        title: "",
        content: "",
      },
    },
  });
  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      sideBar.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      // /posts/ 이걸로 시작하는 경우는
      const [, , documentId] = pathname.split("/"); // 두번째 인덱스값이 필요.
      documentEditPage.setState({ documentId });
    }
  };

  this.route();
}
