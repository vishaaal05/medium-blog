import { SigninInput } from "@vishaaal05/medium-common-update"
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

const AuthSignin = () => {

  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  async function handleSignin() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email: postInputs.email,
        password: postInputs.password
      });
      const jwt = response.data.jwt;
      console.log(jwt,"jwt found")
      localStorage.setItem("token", jwt);
      navigate("/blogs")
    } catch (e) {
      alert("error while sign in")
    }
  }


  return (
    <div className="h-screen flex justify-center flex-col items-center">
      <div className="font-bold text-3xl">Signin an account</div>
      <div className="text-slate-500">
        Don't have account?
        <Link className="underline" to={"/signup"}>Sign up</Link>
      </div>

      <div className="pt-4">


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
        <button onClick={handleSignin} type="button" className="bg-black w-80 text-white text-center mt-5 p-2 rounded-md">Sign in</button>
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
      <input onChange={onchange} type={type || "text"} id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5  " placeholder={placeholder} required />
    </div>

  </div>
}

export default AuthSignin