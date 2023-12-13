"use client"

import React, { useState, useEffect } from 'react'

type User = {
  id: number,
  firstname: string,
  lastname: string,
  age: number
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    
    const setUser = async () => {
      const res = await fetch('http://localhost:5000/test/users');
      const userss = await res.json();
      console.log(userss)
      setUsers(userss)
    }
    
    setUser()
  }, [users])

  return (
    <div>
      {users.map((user: User) => {
        return (
          <div key={user.id}>
            <h1>{user.firstname}</h1>
          </div>
        )
      })}
    </div>
  )
}
