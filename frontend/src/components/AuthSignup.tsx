import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


interface SignupInput {
  name?: string;
  email: string;
  password: string;
}

const AuthSignup = () => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();


  async function handleSignup() {
    try {
    const response = await  axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      name: postInputs.name,
      email: postInputs.email,
      password: postInputs.password
    });
    const jwt = response.data.jwt;
    localStorage.setItem("token", jwt);
    navigate("/blogs")
    } catch (e) {
      alert("error while signing up")
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col items-center">
      <div className="font-bold text-3xl">Create an account</div>
      <div className="text-slate-500">
         Already have an account? 
        <Link className="underline" to={"/signin"}>Sign in</Link> 
        </div>

      <div className="pt-4">

     <LabelledInput label="Name" placeholder="Enter your name" onchange={(e) => {
        setPostInputs({
          ...postInputs,
          name: e.target.value
         
          
        })
      }} /> 
      
      <LabelledInput label="Email" placeholder="abc@gmail.com" onchange={(e) => {
        setPostInputs({
          ...postInputs,
          email: e.target.value
        })
      }} />

      <LabelledInput label="Password" type={"password"} placeholder="Enter your password" onchange={(e) => {
        setPostInputs({
          ...postInputs,
          password: e.target.value
        })
      }} />
      </div>
      <div >
        <button onClick={handleSignup} type="button" className="bg-black w-80 text-white text-center mt-5 p-2 rounded-md">Sign up</button>
      </div>
    </div>

  )
}


interface LabelledInputType {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onchange, type }: LabelledInputType) {
  return <div>
    <div>
      <label className="block mb-2 text-sm pt-4 text-gray-900 font-bold">{label}</label>
      <input onChange={onchange} type={type || "text"} id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5  "  placeholder={placeholder} required />
    </div>

  </div>
}

export default AuthSignup