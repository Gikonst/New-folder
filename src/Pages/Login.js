// import React from "react";
// import { useState } from "react";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import { Checkbox } from "primereact/checkbox";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primeflex/primeflex.css";

// function Login() {
//   // State to store email and password
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     const payload = { email, password }; // Prepare the payload

//     try {
//       const response = await fetch("http://your-backend-url/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Login successful:", data);
//         // Redirect or update UI upon successful login
//       } else {
//         console.error("Login failed:", data.message);
//         alert(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Error occurred during login:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="flex align-items-center justify-content-center">
//       <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
//         <div className="text-center mb-5">
//           <img
//             src="https://f.hubspotusercontent10.net/hubfs/6448316/web-programming-languages.jpg"
//             alt="hyper"
//             height={200}
//             width={300}
//             className="mb-3"
//           />
//           <div className="text-900 text-3xl font-medium mb-3">Welcome</div>

//           <span className="text-600 font-medium line-height-3">
//             Don't have an account?
//           </span>
//           <a
//             href="/RegisterForm"
//             className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
//           >
//             <Button
//               label="Sign Up"
//               icon="pi pi-user"
//               className="btn btn-primary btn-sm"
//             />
//           </a>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-900 font-medium mb-2">
//               Email
//             </label>
//             <InputText
//               id="email"
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email address"
//               className="w-full mb-3"
//             />

//             <label
//               htmlFor="password"
//               className="block text-900 font-medium mb-2"
//             >
//               Password
//             </label>
//             <InputText
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full mb-3"
//             />

//             <div className="flex align-items-center justify-content-between mb-6">
//               <div className="flex align-items-center"></div>
//               <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
//                 Forgot your password?
//               </a>
//             </div>

//             <Button label="Sign In" icon="pi pi-user" className="w-full" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
