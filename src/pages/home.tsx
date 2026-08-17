import { NavLink } from "react-router";

export const Home = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[url('desktop.jpg')] bg-cover bg-center px-4 text-white">
      <h1 className="text-center font-bold max-md:text-4xl max-sm:text-3xl md:text-5xl">
        Welcome to the Help Desk Project
      </h1>
      <div className="btns mt-6 grid grid-cols-2 gap-4">
        <NavLink
          to="/signup"
          className="flex h-10 cursor-pointer items-center justify-center rounded-md bg-gray-500 px-4 font-bold text-gray-200"
        >
          Sign up
        </NavLink>
        <NavLink
          to="/signin"
          className="bg-brand-blue-base flex h-10 cursor-pointer items-center justify-center rounded-md px-4 font-bold text-white"
        >
          Sign in
        </NavLink>
      </div>
      <div className="max-w-5xl flex-col gap-4 max-lg:grid-cols-2 max-md:flex md:grid lg:grid-cols-3">
        <div className="col-span-1 mt-4 rounded-xl border border-white/20 bg-white/10 px-4 py-2 shadow-xl backdrop-blur-md">
          <span className="block text-center text-xl font-bold italic">
            Author
          </span>
          <span className="spacing mt-2 block h-px bg-white"></span>
          <div className="mt-2 flex items-center gap-4">
            <img
              className="w-28 rounded-full"
              src="https://avatars.githubusercontent.com/u/186075751?v=4"
              alt="profile picture"
            />

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-2xl font-bold">Cleverson Sousa</p>
                <span className="text-brand-blue-base font-bold">
                  #OpenToWork
                </span>
              </div>
              <ul className="social-medias mt-2 flex gap-3">
                <li className="cursor-pointer">
                  <a>
                    <img className="w-6" src="/linkedin.svg" alt="" />
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a>
                    <img className="w-6" src="/github.svg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="description mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 shadow-xl backdrop-blur-md max-lg:col-span-1 lg:col-span-2">
          <h2 className="text-center text-xl font-bold">Description</h2>
          <span className="spacing my-2 block h-px bg-white"></span>
          <p>
            The HelpDesk is a project management system designed to optimize the
            technical support workflow. If you are accessing this page locally,
            the back-end must be configured, a setup guide is available in the
            following repository:
            https://github.com/CleversonCSousa/help-desk-back
          </p>
        </div>
      </div>
    </main>
  );
};
