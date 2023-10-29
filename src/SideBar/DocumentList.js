import { push } from "../utils/router.js";
import DocumentAddButton from "./DocumentAddButton.js";

export default function DocumentList({ $target, initialState , onDelete, onAdd}) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.renderDocument();
  };

  this.renderDocument = () => {

    $documentList.innerHTML = `
    <ul>
        ${this.state
          .map((item) => `<li data-id=${item.id}>${item.title||"제목 없음"}
          <button class="delete">🗑</button>
          <button class="add">+</button>
          </li>`)
          .join("")}
    </ul>
`;
  }
  // this.render = () => {
  //   $documentList.innerHTML = `
  //           <ul>
  //               ${this.state
  //                 .map((item) => `<li data-id=${item.id}>${item.title||"제목 없음"}
  //                 <button class="delete">🗑</button>
  //                 </li>`)
  //                 .join("")}
  //           </ul>
  //       `;
  // };
  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    if ($li) {
      push(`/documents/${parseInt(id)}`);
    }
    if (e.target.className === "delete") {
      onDelete(id)
    }
    if (e.target.className === "add") {
      onAdd(parseInt(id))
    }
    
  });

  this.renderDocument();
}
