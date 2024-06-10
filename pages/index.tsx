import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import Toggle from "../components/Toggle";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedBios, setGeneratedBios] = useState<string>("");
  const [platform, setPlatform] = useState("Twitter");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate 3 ${
    vibe === "Casual" ? "relaxed" : vibe === "Funny" ? "silly" : "Professional"
  } ${platform.toLowerCase()} biographies with no hashtags and clearly labeled "1.", "2.", and "3.". Only return these 3 ${platform.toLowerCase()} bios, nothing else. ${
    vibe === "Funny" ? "Make the biographies humorous" : ""
  }Make sure each generated biography is less than 300 characters, has short sentences that are found in ${platform} bios, and feel free to use this context as well: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  // frontend/pages/index.ts
  const generateBio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);

    const response = await fetch("/api/mistral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    }).catch((error) => {
      console.error("Error generating bio at Index File:", error);
      setLoading(false);
    });

    if (response && response.ok) {
      const { bio } = await response.json();
      setGeneratedBios(String(bio));
    } else {
      console.error("Error status at Index File:", response?.status);
    }

    setLoading(false);
    scrollToBios();
  };

  // const generateBio = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setGeneratedBios("");
  //   setLoading(true);

  //   const response = await fetch("/api/mistral", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ prompt }),
  //   }).catch((error) => {
  //     console.error("Error generating bio:", error);
  //     setLoading(false);
  //   });

  //   if (response && response.ok) {
  //     const { bio } = await response.json();
  //     setGeneratedBios(String(bio));
  //   } else {
  //     console.error("Error status:", response?.status);
  //   }

  //   setLoading(false);
  //   scrollToBios();
  // };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>AI Bio Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 ">
          Generate your next <a className="text-[#1DA1F2]">Twitter</a> or{" "}
          <a className="text-[#0077B5]">Linkedin</a> bio using AI
        </h1>

        <div className="mt-7">
          <Toggle platform={platform} setPlatform={setPlatform} />
        </div>

        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Drop in your job{" "}
              <span className="text-slate-500">(or your favorite hobby)</span>.
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"e.g. Amazon CEO"}
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div>
          <form onSubmit={generateBio}>
            {!loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                type="submit"
                // onClick={(e) => generateBio(e)}
              >
                Generate your bio &rarr;
              </button>
            )}
          </form>
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your generated bios
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1."))
                  .split(/\n(?=\d\.)/)
                  .map((generatedBio, index) => {
                    const bioWithoutNumber = generatedBio.replace(
                      /^\d\.\s*/,
                      ""
                    );
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            bioWithoutNumber.trim()
                          );
                          toast("Bio copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={`generated-bio-${index}`}
                      >
                        <p>{bioWithoutNumber.trim()}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
