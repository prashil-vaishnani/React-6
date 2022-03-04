import React, { useState, useEffect } from "react";
import "./UserListCardWrapper.css";
import { UserList } from "../UserList/UserList";
import UserProfileCard from "../UserProfileCard/UserProfileCard";

interface user {
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}
type jsonData = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: [];
};
export const UserListCardWrapper = () => {
  // this hook hold the user details object while hover over respective user
  const [user, setUser] = useState<user | null>(null);

  const [users, setUsers] = useState<[]>([]);
  const [userDetails, setUserDetails] = useState<jsonData>({} as jsonData);
  const [paginationItems, setPaginationItems] = useState<JSX.Element[]>();

  const [isLoading, setIsloading] = useState<boolean>(false);

  const makeHttpRequestWithPage = async (pageNumber: number) => {
    setIsloading(true);
    await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((userData: Response) => {
        if (userData.ok) {
          return userData.json();
        }
        throw new Error("Something went wrong");
      })
      .then((userData: jsonData) => {
        console.log(userData);
        setUsers(userData.data);
        setUserDetails(userData);
      })
      .catch((error) => {
        alert(error);
      });
    setIsloading(false);
  };

  useEffect(() => {
    makeHttpRequestWithPage(1);
  }, []);

  useEffect(() => {
    const pageNumbers: number[] = [];
    if (typeof userDetails != undefined)
      for (let i = 1; i <= userDetails.total_pages; i++) {
        pageNumbers.push(i);
      }
    const items: JSX.Element[] = pageNumbers.map((number) => {
      return (
        <span
          key={number}
          onClick={() => {
            makeHttpRequestWithPage(number);
          }}
        >
          {number}
        </span>
      );
    });
    setPaginationItems(items);
  }, [userDetails]);

  return (
    <section>
      <div className="container">
        <div className="userListCardWrapper">
          {/* <UserList/> component which contain user list */}
          {!isLoading && (
            <UserList
              users={users}
              handleHover={(user) => {
                setUser(user);
              }}
              paginationItems={paginationItems}
            />
          )}
          {isLoading && <p>Loading...</p>}
          {/* <UserProfileCard /> component which contain user details in card */}
          <UserProfileCard user={user} />
        </div>
      </div>
    </section>
  );
};
