
// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
//       <h1 className="text-5xl font-bold mb-4">Welcome to DevChat</h1>

//       <p className="text-gray-400 text-lg mb-8">
//         Connect, chat, and collaborate.
//       </p>

//       <div className="flex gap-4">
//         <Link
//           to="/login"
//           className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg"
//         >
//           Login
//         </Link>

//         <Link
//           to="/register"
//           className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
//         >
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React ,{useContext} from 'react'
import {UserContext} from '../context/user.context'

const Home =() => {
    const {user} = useContext(UserContext)
    return (
        <div>{JSON.stringify(user)}</div>
    )
}

export default Home;
