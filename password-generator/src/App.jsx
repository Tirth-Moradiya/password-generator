import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);

  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const handlePasswordCopyClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*(){}[]/?<>;";

    for (let i = 0; i <= length; i++) {
      let character = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(character);
    }

    setPassword(pass);
  }, [number, char, length, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, char, number, setPassword]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-gray-500 text-center mt-32">
        Password Generator
      </h1>
      <div className="w-full max-w-md mx-auto text-center py-10 px-10 mt-0  bg-slate-800 text-purple-300">
        <div className="mb-8 flex">
          <input
            type="text"
            className="border w-full rounded px-4 py-2 text-lg  text-black"
            placeholder="Generated password"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={() => handlePasswordCopyClipboard()}
            type="submit"
            className="bg-blue-500 text-white w-20 rounded hover:bg-blue-600 transition duration-200"
          >
            Copy
          </button>
        </div>
        <div className="mb-4 flex items-center justify-start">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => setNumber((prev) => !prev)}
          />
          <label className="text-lg">Include Numbers</label>
        </div>

        <div className="mb-4 flex items-center justify-start">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => setChar((prev) => !prev)}
          />
          <label className="text-lg">Include Special Characters</label>
        </div>

        <div className="mb-2 mt-10 flex items-center justify-center">
          <label className="mr-2">Length:</label>
          <input
            type="range"
            className="w-3/4"
            min="8"
            max="99"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="ml-4 text-lg">{length}</label>
        </div>
      </div>
    </>
  );
}

export default App;
