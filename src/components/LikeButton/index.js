import "./index.css";
import HeartOutlineIcon from "../../assets/icons/heart-outline.svg";

export default function LikeButton() {
  return `
  <button class="like-btn"><img src="${HeartOutlineIcon}" draggable="false" alt="Like"></button>
  `;
}
