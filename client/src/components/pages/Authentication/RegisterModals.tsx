import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../organisms/Modal/Modal";

export const RegisterModals = ({
  registerModals,
  setRegisterModals: setRegisterModals,
}: {
  registerModals: {
    password: boolean;
    registerFailed: boolean;
  };
  setRegisterModals: React.Dispatch<
    React.SetStateAction<{
      password: boolean;
      registerFailed: boolean;
    }>
  >;
}) => {
  const navigate = useNavigate();

  return (
    <>
      {registerModals.password && (
        <>
          <Modal
            type='error'
            title='Your passwords do not match.'
            subtitle='Please try again.'
            is_open={true}
            close_modal={() => {
              setRegisterModals({ ...registerModals, password: false });
            }}
            button_primary_text='Close'
            button_secondary_text='Back to login'
            button_primary_onclick={() => {
              setRegisterModals({ ...registerModals, password: false });
            }}
            button_secondary_onclick={() => {
              navigate("/login");
            }}
          />
        </>
      )}

      {registerModals.registerFailed && (
        <>
          <Modal
            type='error'
            title='Failed to register.'
            subtitle='It seems like something is wrong with the server. Please try again later.'
            is_open={true}
            close_modal={() => {
              setRegisterModals({ ...registerModals, registerFailed: false });
            }}
            button_primary_text='Close'
            button_secondary_text='Back to login'
            button_primary_onclick={() => {
              setRegisterModals({ ...registerModals, registerFailed: false });
            }}
            button_secondary_onclick={() => {
              navigate("/login");
            }}
          />
        </>
      )}
    </>
  );
};
