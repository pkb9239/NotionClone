import { push } from "../utils/router.js";

export default function DocumentAddButton({ $target, initialState, onAdd }) {
  this.state = initialState;
  const $linkButton = document.createElement("button");

  $target.appendChild($linkButton);

  this.render = () => {
    $linkButton.textContent = this.state.text;
  };
  this.render();

  $linkButton.addEventListener("click", () => {
    onAdd("new");
  });
}
