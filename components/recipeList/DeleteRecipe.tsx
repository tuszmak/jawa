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
  const handleOpen =()=>{
    if(myModal.current){
      myModal.current.showModal();
    }
  }
  const myModal = useRef<HTMLDialogElement>(null);

  return (
    <div className="bg-red-400" onClick={handleOpen} >
      {/* Open the modal using ID.showModal() method */}
      <p>Delete</p>
      <dialog id={`my_modal_${id}`} className="modal" ref={myModal}>
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
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default DeleteRecipe;
