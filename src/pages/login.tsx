import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { _auth } from "../utils/_firebase";

type newAccount = {
  email: string;
  senha: string;
};

const Login = () => {
  const [body, setBody] = useState<newAccount>({
    email: "",
    senha: "",
  });
  const router = useRouter();

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
    setBody((body) => ({ ...body, [name]: value }));
  };

  const loginEmail = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(_auth, body.email, body.senha);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen grid place-items-center bg-gradient-to-br from-blue-400 to-pink-400">
      <div className="bg-white drop-shadow flex flex-col items-center p-12">
        <p className="mb-16 text-3xl">Login</p>
        <form
          onSubmit={loginEmail}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-left w-full">
              E-mail
            </label>
            <input
              onChange={handleInput}
              type="text"
              name="email"
              className="bg-blue-100 h-8 px-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="senha" className="text-left w-full">
              Senha
            </label>
            <input
              onChange={handleInput}
              type="text"
              name="senha"
              className="bg-blue-100 h-8 px-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 w-full py-1 rounded mt-6"
          >
            Fazer login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
