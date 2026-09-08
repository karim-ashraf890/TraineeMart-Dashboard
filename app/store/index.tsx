// import { createContext, useReducer } from "react";

import { useRef, useState } from "react";

// const initialState = {
//   appState: { authUser: { name: "" } },
//   dispatch: (data: any) => {},
// };

// export const AppData = createContext(initialState);

// function appReducer(state: any, action: any) {
//   switch (action.type) {
//     case "UPDATE":
//       return {
//         ...state,
//         authUser: { name: action.name },
//       };
//     default:
//       return state;
//   }
// }

// export function AppProvider({ children }: any) {
//   const [state, dispatch] = useReducer(appReducer, initialState);

//   return (
//     <AppData.Provider value={{ appState: state.appState, dispatch: dispatch }}>
//       {children}
//     </AppData.Provider>
//   );
// }

// export function UplodFileUploader() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef<any>(null);
//   const handleFileChange = (event: any) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };
//   const handleCustomClick = () => {
//     fileInputRef.current.click();
//   };
//   return (
//     <>
//       <div>
//         <input
//           type="file"
//           multiple={false}
//           ref={fileInputRef}
//           onChange={handleFileChange}
//         ></input>
//       </div>
//       <div
//         onClick={handleCustomClick}
//         style={{
//           width: "200px",
//           height: "200px",
//           border: "2px dashed #ccc",
//           borderRadius: "10px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           cursor: "pointer",
//           overflow: "hidden",
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         hiiiiii
//       </div>
//     </>
//   );
// }
