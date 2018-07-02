import { Modal } from "antd";

export function dialog(status, title, content) {
  const modal = Modal[status]({
    title,
    content
  });
  setTimeout(() => modal.destroy(), 4000);
}
