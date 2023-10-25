import SideBar from "./SideBar/SideBar.js";

export default function App({ $target, initialState }) {
  const $page = document.createElement("div");
  $target.appendChild($page);

  new SideBar({
    $target: $page,
    initialState,
  });
}
