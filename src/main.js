import App from "./App.js";

const $app = document.querySelector("#app");

new App({
  $target: $app,
  initialState: [
    {
      title: "javascript",
      content: "공부하자",
    },
    {
      title: "만만세",
      content: "경빈",
    },
  ],
});
