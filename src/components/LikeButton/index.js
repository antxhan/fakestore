import "./index.css";
import HeartOutlineIcon from "../../assets/icons/heart-outline.svg";
import HeartFilledIcon from "../../assets/icons/heart-filled.svg";

export default function LikeButton(isLiked) {
  return `
  <button class="like-btn ${isLiked ? "liked" : ""}"><img src="${
    isLiked ? `${HeartFilledIcon}` : `${HeartOutlineIcon}`
  }" draggable="false" alt="Like"></button>
  `;
}
