import Link from "next/link";
import React from "react";

function BackButton() {
  return (
    <div className="m-4">
      <button className="btn btn-outline hover:btn-primary">
        <Link href="/">Back</Link>
      </button>
    </div>
  );
}

export default BackButton;
