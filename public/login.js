import Image from 'next/image'
import syles from '../styles/Home.module.css'

export default function Home(){
    return(
        <div>
            <head>
    //tags
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    //<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

    //css/scripts
    <link href="signin.css" rel="stylesheet" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
      integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
      integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk"
      crossorigin="anonymous"
    ></script>

    //JavaScript Bundle with Popper 
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
      crossorigin="anonymous"
    ></script>

    //Favicons
    <meta name="theme-color" content="#712cf9" />

    <style>
      
    </style>

    // Custom styles for this template
  </head>
  <body class="text-center">
    <main class="form-signin m-auto">
      <form class="sign-in-form">
        <div class="form-box">
          <h1 class="sign-in">Login</h1>
          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <ul></ul>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>
  
          <div class="remember-me">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          /* <ul>
            password is incorrect 
        </ul> */
          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
          <ul></ul>
          <p>Forgot <a href="#">Password</a></p>
          <p>Need to make an account? <a href="register.html">Create an account</a></p>
          <p class="from-too">UTD&copy; 2022–2022</p>
        </div>
      </form>
    </main>
  </body>
        </div>
    )
}