import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/Subheading";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useState } from "react"

export function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox onChange={e => setUsername(e.target.value)} placeholder={"john@gmail.com"} label={"Email"}/>
                <InputBox onChange={e => setPassword(e.target.value)} placeholder={"Min 6 characters"} label={"Password"}/>
                {error && <div className="text-red-500 text-sm pt-2 text-left">{error}</div>}
                <div className="pt-4">
                <Button onClick={async () => {
                    setError("");

                    if (!username || !password) {
                        setError("All fields are required.");
                        return;
                    }
                    if (!username.includes("@")) {
                        setError("Please enter a valid email.");
                        return;
                    }
                    if (password.length < 6) {
                        setError("Password must be at least 6 characters.");
                        return;
                    }

                    setLoading(true);
                    try {
                        const response = await axios.post("https://finflow-mc2e.onrender.com/api/v1/user/signin", {
                            username,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    } catch(e) {
                        setError(e.response?.data?.message || "Invalid email or password.");
                    } finally {
                        setLoading(false);
                    }
                }} label={loading ? "Please wait..." : "Sign In"}/>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}
