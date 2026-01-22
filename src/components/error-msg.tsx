import React from "react";

export default function ErrorMsg({ msg }: { msg: string }) {
  return <p style={{ color: "red", fontSize: "14px" }}>{msg}</p>;
}
