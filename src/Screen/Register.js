import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import { LOGIN_URI } from "../Utils/index";

const Login = () => {
  const [file, setfile] = useState();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(true);
  const history = useNavigate();
  return (
    <div className="bg-navyBlue h-[90vh] flex pb-14">
      <div className="flex justify-center items-center flex-col w-1/2 mb-10">
        <img src="/people.png" className="w-2/12" alt="" />
        <img src="/logoText.png" alt="" className="mt-2" />
        <p className="text-grey text-xl font-semibold mt-1 flex">
          Create Learn and Engage
        </p>
      </div>
      <div class="w-1/2 flex flex-col justify-center items-center text-grey ">
        <h2 className="text-4xl font-bold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name *"
          className="input"
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Email"
          className="input"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <div className="flex items-center justify-between w-5/12">
          <input
            type={showPass ? "password" : "text"}
            placeholder="Password *"
            className="input relative"
            style={{ width: "100%", paddingRight: "2.5rem" }}
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <div className="absolute left-[83%]">
            {showPass ? (
              <AiOutlineEye
                size={25}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass(!showPass);
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass(!showPass);
                }}
              />
            )}
          </div>
        </div>
        <label htmlFor="file" className="underline cursor-pointer">
          <input
            type="file"
            id="file"
            className="border inline-block px-2 py-2 cursor-pointer"
            style={{ display: "none" }}
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
          />
          Select Profile Picture
        </label>
        {file ? <p>{file.name}</p> : null}
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            if (user.name && user.password && user.email) {
              const formData = new FormData();
              formData.append("name", user.name);
              formData.append("email", user.email);
              formData.append("password", user.password);
              if (file) {
                formData.append("profile", file);
              } else {
                formData.append(
                  "profile",
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhARBxAREBUVFRUTFRASDRIPERUTFRUWFyAWExMYHSggJBolHRMYITEhJSkuMjAuFx83ODMtOigtLisBCgoKDQ0NDg8QDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAABgQFAgMBB//EADMQAQABAgEJBgUEAwAAAAAAAAABAgQDBREUITFBUVOREiJhcaHRFSMygZITUsHwQrHh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP60AqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM93d4VrR8yde6mNsg0PyZiNqfuMp3GNPdnsRwp2/edrHVVNU96ZnznOQqsiYnZrfqSiZjY1W+ULnBn6u1HCrX67VhVGMllfYV1GaO7V+2Z/1LWgAAAAAAAAAAAAAAAAAAAAAA+F7c02uBNU652RHGU3i4leNiTViTnmWvK+POLdzEbKdX33/wB8GFUAAAAftNU0VRNM5pjXEwosm3cXWD3vqjb7pxpsMebe6pndsnykFKAigAAAAAAAAAAAAAAAAABG0I2gk66prrmZ3zM9Xl6qpmiqYndMx0eVQAAAAABVW9Xbt6JnfTTPWH0fO3p7FvRE7qaY9H0RQAAAAAAAAAAAAAAAAAAAE9lfB/SvJmNlWuP5/vixKW+tYusDNvjXE+PsnMSirDrmK4zTG2FR5AAAAaLHB0i6pp3Z88+UPhETM6lBkyz0XCz1/VO3wjgDaAigAAAAAAAAAAAAAAAAAAADNeWWHd097VO6qNv38GkBOXGT7nAnXT2o406/TayK55roor+uInziJWkSbRgWVxj/AEUzm/dOqFHTh4dE92mI8qYh7KkY7HJ+Ha6571XHNqjyhsBFAAAAAAAAAAAAAAAAAAAYco38W0dnD11ekefsDTj3GFb058aqI8N8+UOdjZZpifk0Z/Gqc3pDlYmJXiV58SZmeMvCxHRnLFxuinpPufF7nhR+M+7nAOj8XueFH4z7nxe54UfjPu5wDo/F7nhR+M+58XueFH4z7ucA6Pxe54UfjPufGLnhR0n3c4B18LLWv51H3pn+JdG3usG5j5U/bZV0S79pqmmrPTOaeMapIVWjmZNyl+tMUXG3dVx8J8XTRQAAAAAAAAAAAAAHwvbiLa3mrfsiPFNVVVV1TNU55nXMuhlzF7VxFMf4x6z/AMzOauJoAAAAAAAAAAAD9UOTLrSbfv8A1U6p8eEp1syTi/pXscKu712eoYogEUAAAAAAAAAAABNZRmar7Ez8c3TV/DOpqrS3rqmaqKZmd+Z+aFa8unotSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJp6wp7OLTMbpiekqPQrXl09DQrXl09CkaAEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
                );
              }
              axios
                .post(`${LOGIN_URI}/`, formData)
                .then((response) => {
                  console.log(response);
                  if (response.data.length > 0) {
                    alert(response.data);
                  } else {
                    alert("Registered Success!");
                    history("/");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              alert("Please fill email or mobile");
            }
          }}
        >
          Register Now
        </button>
        <p
          className="underline cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            history("/");
          }}
        >
          Click here to login
        </p>
      </div>
    </div>
  );
};

export default Login;
