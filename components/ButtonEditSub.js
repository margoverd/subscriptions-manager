"use client";

import { useState } from "react";
import Icon from "./Icon";
import Modal from "./Modal";
import FormEditSub from "./FormEditSub";

const ButtonEditSub = ({ subId }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <p className="text-lg font-normal text-center mb-2">New Subscription</p>
        <FormEditSub onClose={handleClose} />
      </Modal>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-ghost btn-circle shadow-none border-none hover:bg-base-content/20 text-base-content"
        aria-label="Edit Sub"
      >
        <Icon name="pen" className="text-xl" />
      </button>
    </>
  );
};

export default ButtonEditSub;
