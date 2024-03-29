import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../sessionSlice";
import { Navigate } from "react-router-dom";

export const SignIn = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: unknown) => state.session.token);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      return;
    }

    fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password,
      }),
    })
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Invalid username or password");
      })
      .then((data) => {
        console.log("data");
        dispatch(login({ token: data.body.token }));
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });

    console.log("submit");
  };

  if (token) {
    return <Navigate to="/user" replace />;
  }

  return (
    <main className="flex flex-col items-center h-screen main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password </label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};
