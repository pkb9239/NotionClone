import DocumentList from "./DocumentList.js";

export default function SideBar({
    $target,
    initialState
}) {
    new DocumentList({
        $target,
        initialState
    })
}