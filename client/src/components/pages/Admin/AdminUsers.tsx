import axios from "axios";
import React, { useEffect, useState } from "react";
import UserService from "../../../features/user/userService";
import { useAppContext, useQuery } from "../../../utils/hooks";
import { userType } from "../../../utils/types";
import { Button } from "../../atoms/Button/Button";
import { InputSearch } from "../../atoms/Input/InputSearch";
import { Spinner } from "../../atoms/Spinner/Spinner";
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

  const toggleUserStatus = async (userId: string) => {
    if (userId !== user?.id) {
      try {
        await UserService.toggleUserStatus(userId).then((response) => {
          if (response.data.success) {
            setUsers(response.data.data);
          }
        });
      } catch {}
    }
  };

  const handleRoleChange = async (userId: string, ) => {
    if (userId !== user?.id) {
      try {
        await UserService.changeUserRole(userId).then((response) => {
          if (response.data.success) {
            setUsers(response.data.data);
          }
        })
      } catch {}
    }
  }

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
          } else {
            setFetchingError(true);
          }
        });
      };
      fetchData();
    } catch {
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
              placeholder={translations[language]["search"]}
              onChange={(e) => setUserQuery(e.target.value)}
            />
          </div>
          <Button
            size='medium'
            width='full'
            type='secondary-gray'
            text={translations[language]["admin.users.add-user-button"]}
            onclick={() => setModalState({ ...modalState, addUser: true })}
          />
        </div>
        {users && filteredUsers ? (
          <AdminUsersTable handleRoleChange={handleRoleChange} toggleStatus={toggleUserStatus} users={filteredUsers} />
        ) : (
          <div className='flex items-center justify-center w-full h-96'>
            <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminUsers;
