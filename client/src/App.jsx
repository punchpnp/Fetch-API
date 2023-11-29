import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactLoading from "react-loading";

// Components
import FavPoke from "./components/FavPoke";

function App() {
  // เรียก data ทั้งหมดของ poke api
  const [poke, setPoke] = useState("");
  //
  const [loading, setLoading] = useState(false);
  //
  const [error, setError] = useState("");
  // ID poke
  const [number, setNumber] = useState(1);
  // favourite poke
  const [fav, setFav] = useState([]);

  // fetch data นอก react
  useEffect(() => {
    // Template การยิง request ไป API
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };

    loadPoke();
    return () => abortController.abort();
  }, [number]);

  // แสดงออกทาง console ว่าสามารถ fetch api มาได้รึเปล่า
  console.log(poke);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };

  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  // เรียก ...oldState เพราะส่ง state เก่ามาด้วย
  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
  };

  console.log("Pokemon ID: ", number);
  console.log("Your fav poke is : ", fav);

  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? (
            <ReactLoading
              type="spin"
              color="black"
              height={"20%"}
              width={"20%"}
            />
          ) : (
            <>
              <h1>{poke?.name}</h1>
              <button onClick={addFav}>Add to favourite</button>
              <br />
              <img src={poke?.sprites?.other?.home?.front_default} alt="" />

              {/* แสดงผลข้อมูลที่เป็นอาเรย์ */}
              <ul>
                {poke?.abilities?.map((abil, index) => (
                  <li key={index}>{abil.ability.name}</li>
                ))}
              </ul>

              <button onClick={prevPoke}>Previos</button>
              <button onClick={nextPoke}>Next</button>
            </>
          )}
        </div>

        <div>
          <h2> Your favourite Pokemon</h2>
          {/* ส่ง state ไปที่อีก components */}
          {fav.length > 0 ? (
            <FavPoke fav={fav} />
          ) : (
            <div className="flex h-full justify-center items-center">
              <p>No favourite pokemon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
