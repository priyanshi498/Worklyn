import { Link } from "react-router-dom";
import LandingNavbar from "../components/layout/LandingNavbar";
import heroImage from "../assets/hero.png";
import eventImage from "../assets/event.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#DDD6FE]">

      {/* NAVBAR */}
      <LandingNavbar
        loginHref="/auth?mode=signin"
        signupHref="/auth?mode=signup"
      />

      {/* HERO SECTION */}
      <section className="px-6 pt-20 pb-24">
        <div className="mx-auto max-w-5xl text-center">

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#2E1065]">
            Where work comes together
            <br />
            <span className="text-[#5B21B6]">From planning to progress.</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-[#4C1D95] max-w-2xl mx-auto">
            Bring people and tasks together to plan, track,
            and deliver work faster.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">

            {/* CREATE ACCOUNT */}
            <Link
              to="/auth?mode=signup"
              className="rounded-lg bg-white px-7 py-3 text-base font-semibold text-[#6D28D9] shadow-md hover:bg-purple-50 transition"
            >
              Get started
            </Link>

            {/* LOGIN */}
            <Link
              to="/auth?mode=signin"
              className="rounded-lg border border-[#6D28D9] px-7 py-3 text-base font-semibold text-[#6D28D9] hover:bg-[#EDE9FE] transition"
            >
              Login
            </Link>

            <button
              className="rounded-lg border border-[#6D28D9] px-7 py-3 text-base font-semibold text-[#6D28D9] hover:bg-[#EDE9FE] transition"
            >
              See how it works
            </button>

          </div>

          <div className="mt-16 flex justify-center">
            <img
              src={heroImage}
              alt="Dashboard preview"
              className="w-full max-w-5xl rounded-xl shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-[#1F1B4B]">
            Everything you need
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Powerful features to keep your team productive
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Kanban Boards",
                desc: "Visualize workflows with drag-and-drop boards",
              },
              {
                title: "Team Collaboration",
                desc: "Work together with shared tasks and updates",
              },
              {
                title: "Task Comments",
                desc: "Discuss tasks with real-time comments",
              },
              {
                title: "Real-time Updates",
                desc: "Instant updates as work progresses",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white p-6 shadow-md text-left"
              >
                <h3 className="text-lg font-semibold text-[#1F1B4B]">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#DDD6FE] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3B0764]">
            Ready to get started?
          </h2>

          <p className="mt-4 text-lg text-[#4C1D95]">
            Create your free account and start organizing your work today.
          </p>

          <div className="mt-8">
            <Link
              to="/auth?mode=signup"
              className="inline-block rounded-xl bg-[#6D28D9] px-10 py-4 text-lg font-semibold text-white shadow-lg hover:bg-[#5B21B6] transition"
            >
              Create free account
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Landing;
