// DATA
const SECRET = [
  "Nightwalker","Water","Dangerous","On Ten","Shadow","Lie With You",
  "Dream In A Dream","New Heroes","Paint Me Naked","Birthday",
  "Bambola","Stunner","Enough For Me","Sweet As Sin","Waves","Butterfly"
];

const relatedWords = {
  "Nightwalker": ["Nightwalker","Hour","Waiting","Power","Calm","Storm","Walking","Wire","Fire","Waves","Ocean","Emotions","Low","Fight","Holy","Story","Rising","Shallow","Devil","Higher","Blue","Eyes","Midnight","Strings","Beautiful","Monster","Royalty","Energy","Heart","Bow","Pray"],

  "Water": ["Flowing","Veins","Insane","Faucet","Cold","Night","Stars","Shine","Sky","Tongue-tied","Drop","Art","Cool","Temperature","Dive","Atmosphere","Games","Pain","New","Tide","Deep","Stay","Please","Let","Give","Turning","Back","In","Favorite","Acting"],

  "Dangerous": ["See","Games","Diva","Attention","People","Talking","Love","Morning","Waste","Patience","Pride","Entertaining","Eternity","Information","Listen","He","She","First","Page","Medusa","Better","Throw","Dirt","Know","Dangerous","Girl","So","Oh","Now","Take","Could"],

  "On Ten": ["Shy","Closer","Ride","Chauffeur","Live","Take","Hold","Move","Body","Wave","Motivate","Straight","Elevate","Run","Arenas","Respect","Team","Throne","Toast","Front","G.O.A.T.","Shining","Friends","City","Loud","Stop","Roll","Celebration","Name","Check","Fit"],

  "Shadow": ["Silhouette","Real","Dream","Power","Try","Leave","Shadow","Step","Key","Memories","Same","Empty","Voices","Echo","Hollow","Night","Face","Track","Someone","Moonlight","Pain","Falling","Chasing","Light","Dark","Weakness","Follow","Keep","Mind","Circling","Bare"],

  "Lie With You": ["Heart","Lie","Stars","Eyes","Sky","Last","Midnight","Bedroom","Dancing","Night","Need","Goodbye","Lonely","Love","Hold","Now","Perfect","Pretend","Kiss","Around","Playing","Cards","Truth","Lose","While","Met","Better","Swear","Tears","Hide"],

  "Dream In A Dream": ["Staying","Up","Love","Come","Down","Lost","Together","Fall","Flow","Ever","Let","Don't","Your","From","We","I","Me","Stay","Dream","Night","Stayup","Get","Falling","Flowing","Loveflow","Never","Want","Close","Eyes","Feel"],

  "New Heroes": ["Nobody","Knows","Dream","High","Lows","Stronger","Blows","Pains","Sweat","Dirt","Live","Day","Screaming","Names","Keep","Heroes","Fought","Wolves","Believed","Mess","Messages","Lessons","Fears","Price","Legends","Stage","Breaks","Future","Turn","Burning","All"],

  "Paint Me Naked": ["Heartbeat","Crazy","Fall","Line","Young","Love","Issues","Far","Tame","Lion","Prey","Baby","Fail","Fancy","Work","Figure","Weekend","Pose","Painting","Control","Luck","Miles","Redline","Drop","Top","Space","Attention","Show","Way","High","Rain"],

  "Birthday": ["Dance","Wrap","Devotion","Bad","Romance","Body","Slow","Motion","Tension","Attention","Self-control","All","Tonight","Celebrate","Perfect","First","Place","Sugar","Million","Wait","Hands","Hold","Deep","Ocean","Falling","Confession","Baby","Let","Go","Do","Best"],

  "Bambola": ["Fool","Friends","Groupie","Sing","Song","Karaoke","Tropical","Fancy","Cupid","Birds","Chirp","Yaba","Daba","Control","Mind","Play","Fun","Days","Stop","Go","Soul","Bite","Whatever","Get","Lit","Exciting","Wait","Type","Fall","Grab"],

  "Stunner": ["Baby","Start","Moment","Eyes","Step","Look","Feel","Real","Love","Touch","Time","Slow","Harder","Want","Dangerous","Tic","Toc","Bigger","Head","Groove","Move","Here","Sound","Star","Future","Angel","Disguise","Reset","Bang","100M"],

  "Enough For Me": ["Call","Good","Time","Bad","Last","Weekend","Secret","Deep","Ends","Dashboard","Fast","Forward","Scene","Crash","Course","Street","Watch","Move","Mind","Money","Green","Grind","Body","Dream","Chase","Life","Shine","Gimme","More","Together"],

  "Sweet As Sin": ["Trigger","Click","Mischievous","Fire","Low","Key","Dynamite","Tick","Dangerous","Close","Stop","Drop","Roll","Ocean","Dive","Energy","Flowing","Young","Love","Flash","Heads","Spin","Round","Scandalous","Starry-eyed","Napalm","Cherry","Top","Fuse","Luck"],

  "Waves": ["Skyline","Ocean","Flight","Home","Back","Swear","Stay","Close","Eyes","Reasons","Mind","Time","Excuses","Let","Dive","Feet","Imprint","Far","Place","Blue","Cool","Troubles","Wash","Days","Keep","Lose","Plans","Change","Only","Want","Song of the Year Award"],

  "Butterfly": ["Name","Spring","For","You","Eyes","Warmth","Hand","Time","Dream","Scent","Wind","Gone","Trace","Call","Shining","Days","Pain","Tears","Memory","Beautiful","Past","Greet","Springday","Night","Search","Embrace","Heart","Soft","Fall","Light"]
};

// สุ่มคำลับ
let secretWord = SECRET[Math.floor(Math.random() * SECRET.length)].toLowerCase();

// DOM
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resultBox = document.getElementById("result");

function isInRelatedWords(word) {
  word = word.toLowerCase();
  for (let key in relatedWords) {
    const list = relatedWords[key].map(w => w.toLowerCase());
    if (list.includes(word)) return true;
  }
  return false;
}

// ระบบคำนวณ % ใกล้
function similarityPercent(guess, target) {
  guess = guess.toLowerCase();
  target = target.toLowerCase();

  if (guess === target) return 100;

  let list = relatedWords[target] || [];
  let score = 0;

  list.forEach((w) => {
    if (guess.includes(w)) score += 20;
  });

  if (guess.length > 0 && target.includes(guess[0])) score += 10;
  if (guess[0] === target[0]) score += 10;

  return Math.min(score, 99);
}

// สี %
function percentColor(p) {
  if (p === 100) return "#00b7ff";
  if (p >= 91) return "#00c851";
  if (p >= 61) return "#ffeb3b";
  if (p >= 31) return "#ff9800";
  return "#ff4444";
}

// แสดงผล
function addResult(guess, percent, correct, unknown=false) {
  const div = document.createElement("div");
  div.className = "guess-item";

  if (unknown) {
    div.innerHTML = `
      <span class="word">${guess}</span>
      <span class="percent" style="color:#777">I'm sorry, I don't know this word</span>
    `;
  } else {
    div.innerHTML = `
      <span class="word">${guess}</span>
      <span class="percent" style="color:${percentColor(percent)}">${percent}%</span>
      ${correct ? `<span class="correct">✔</span>` : ""}
    `;
  }

  resultBox.prepend(div);
}

// เมื่อกดปุ่ม
guessBtn.addEventListener("click", () => {
  const guess = guessInput.value.trim().toLowerCase();
  if (!guess) return;

  const percent = similarityPercent(guess, secretWord);

  // 1) ถ้าคำนี้ไม่มีใน relatedWords เลย
  if (!isInRelatedWords(guess)) {
    addResult(guess, 0, false, true);
  }

  // 2) ถ้าทายถูกคำลับ
  else if (guess === secretWord) {
    addResult(guess, 100, true);
    alert("คุณทายถูกแล้ว!");
  }

  // 3) คำมีใน relatedWords → โชว์เปอร์เซ็น
  else {
    addResult(guess, percent, false);
  }

  guessInput.value = "";
});

