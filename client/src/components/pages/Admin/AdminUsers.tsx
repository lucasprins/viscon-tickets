import axios from "axios";
import React, { useEffect, useState } from "react";
import UserService from "../../../features/user/userService";
import { useAppContext } from "../../../utils/hooks";
import { userType } from "../../../utils/types";
import { Button } from "../../atoms/Button/Button";
import { InputSearch } from "../../atoms/Input/InputSearch";
import ModalAddUser from "../../organisms/Modal/ModalAddUser";
import { AdminUsersTable } from "./Tables/AdminUsersTable";

var translations = require("../../../translations/allTranslations.json");

function AdminUsers() {
  // globals
  const { appState } = useAppContext();
  const language = appState.language;
  const user = appState.user;

  // data
  const [users, setUsers] = useState<Array<userType>>();
  const [filteredUsers, setFilteredUsers] = useState<Array<userType>>();
  const [fetchingError, setFetchingError] = useState<boolean>(false);

  // filters
  const [userQuery, setUserQuery] = useState<string>("");
  const [modalState, setModalState] = useState({
    addUser: false,
  });

  useEffect(() => {
    if (users) {
      const filtered = users.filter((user) => {
        const fullName = user.firstName + " " + user.lastName;
        return fullName.toLowerCase().includes(userQuery.toLowerCase());
      });
      setFilteredUsers(filtered);
    }
  }, [userQuery, users]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        await UserService.getUsers().then((response) => {
          if (response.data.success) {
            setUsers(response.data.data);
            console.log(response.data.data);
          } else {
            setFetchingError(true);
          }
        });
      };
      fetchData();
    } catch {
      console.log("error");
    }
  }, []);

  return (
    <>
      {user && (
        <ModalAddUser
          company={user.company}
          state={modalState.addUser}
          onClose={() => setModalState({ addUser: false })}
          setUsers={setUsers}
        />
      )}
      <div className='flex flex-col gap-6 py-8'>
        {/* Search */}
        <div className='flex flex-col gap-3 lg:flex-row'>
          <div className='w-full'>
            <InputSearch
              value={userQuery}
              placeholder={translations[language]["admin.users.add-user-modal.title"]}
              onChange={(e) => setUserQuery(e.target.value)}
            />
          </div>
          <Button size='medium' width='full' type='secondary-gray' text='Add a user' onclick={() => setModalState({ ...modalState, addUser: true })} />
        </div>
        {users && filteredUsers ? <AdminUsersTable users={filteredUsers} /> : <div>Loading...</div>}
      </div>
    </>
  );
}

export default AdminUsers;
