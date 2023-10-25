import { push } from "../utils/router.js";

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = `
            <ul>
                ${this.state
                  .map((item) => `<li data-id=${item.id}>${item.title||"제목 없음"}</li>`)
                  .join("")}
            </ul>
        `;
  };
  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;
      push(`/documents/${parseInt(id)}`);
    }
  });

  this.render();
}
