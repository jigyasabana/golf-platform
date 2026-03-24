import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { addScore } from "../services/score";
import { getCharities, selectCharity } from "../services/charity";
import { activateSubscription,getSubscription,} from "../services/subscription";
import { generateDraw, checkMatches } from "../utils/draw";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);

  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);
   const [subscription, setSubscription] = useState(null);
   const [drawNumbers, setDrawNumbers] = useState([]);
const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    getUser();
    fetchCharities();
  }, []);

  // 🔐 Get logged-in user
  async function getUser() {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    setUser(data.user);
    fetchScores(data.user.id);
    fetchSubscription(data.user.id);
  }
}

async function fetchSubscription(userId) {
  const { data, error } = await getSubscription(userId);

  if (!error && data) {
    setSubscription(data);
  }
}

async function handleSubscribe(plan) {
  await activateSubscription(user.id, plan);
  fetchSubscription(user.id);
}

function handleDraw() {
  if (scores.length < 5) {
    return alert("Add 5 scores first");
  }

  const draw = generateDraw();
  setDrawNumbers(draw);

  const matches = checkMatches(scores, draw);
  setMatchCount(matches);
}

  // 📊 Fetch scores
  async function fetchScores(userId) {
    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) console.log(error);
    else setScores(data);
  }

  // ➕ Add score
  async function handleAddScore() {
    if (!score || !date) {
      return alert("Please fill all fields");
    }

    if (score < 1 || score > 45) {
      return alert("Score must be between 1 and 45");
    }

    await addScore(user.id, score, date);
    fetchScores(user.id);

    setScore("");
    setDate("");
  }

  // ❤️ Fetch charities
  async function fetchCharities() {
    const { data, error } = await getCharities();

    if (error) console.log(error);
    else setCharities(data);
  }

  // ❤️ Select charity
  async function handleSelectCharity(charityId) {
    await selectCharity(user.id, charityId);
    setSelectedCharity(charityId);
  }

  // 🚪 Logout
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* 👤 User Info */}
      <p><strong>Email:</strong> {user?.email}</p>

      {/* 🚪 Logout */}
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <hr />

<h3>Subscription</h3>

{subscription?.status === "active" ? (
  <p>
    ✅ Active Plan: <strong>{subscription.plan}</strong>
  </p>
) : (
  <div>
    <button onClick={() => handleSubscribe("monthly")}>
      Subscribe Monthly
    </button>

    <button onClick={() => handleSubscribe("yearly")}>
      Subscribe Yearly
    </button>
  </div>
)}

      {/* 🏌️ Score Section */}
      <h3>Add Score</h3>

      <input
        type="number"
        placeholder="Score (1-45)"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleAddScore}>Add Score</button>

      <h3>Your Last 5 Scores</h3>

      {scores.length === 0 ? (
        <p>Add atleast 5 scores to participate in Draw</p>
      ) : (
        scores.map((s) => (
          <div key={s.id}>
            {s.score} — {s.date}
          </div>
        ))
      )}

      <hr />

<hr />

<h3>Monthly Draw</h3>

<button onClick={handleDraw}>Run Draw</button>

{drawNumbers.length > 0 && (
  <div>
    <p><strong>Draw Numbers:</strong> {drawNumbers.join(", ")}</p>
    <p><strong>Matches:</strong> {matchCount}</p>

    {matchCount >= 3 && <p>🎉 You are a winner!</p>}
  </div>
)}

      {/* ❤️ Charity Section */}
      <h3>Select Charity</h3>

      {charities.length === 0 ? (
        <p>No charities available</p>
      ) : (
        charities.map((c) => (
          <div key={c.id} style={{ marginBottom: "10px" }}>
            <p>
              <strong>{c.name}</strong> - {c.description}
            </p>

            <button onClick={() => handleSelectCharity(c.id)}>
  {selectedCharity === c.id ? "Selected ✅" : "Select"}
</button>
          </div>
        ))
      )}
    </div>
  );
}