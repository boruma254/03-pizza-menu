import React from "react";
import "../index.css";

export default function Notification({ notification }) {
  if (!notification) return null;
  const { message, type = "info" } = notification;

  return (
    <div className={`notification ${type}`} role="status" aria-live="polite">
      <div className="notification-inner">{message}</div>
    </div>
  );
}
