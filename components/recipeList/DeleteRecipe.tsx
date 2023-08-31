import React, { useRef } from "react";

interface Props {
  id: number;
}
function DeleteRecipe({ id }: Props) {
  const handleDelete = async () => {
    const response = await fetch("/api/deleteRecipe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    if (response.ok) window.location.reload();
  };
  const myModal = useRef<HTMLDialogElement>(null);

  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <button
        className="btn btn-outline"
        onClick={() => myModal.current?.showModal()}
      >
        delete
      </button>
      <dialog id="my_modal_1" className="modal" ref={myModal}>
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action justify-between">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-outline">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default DeleteRecipe;
