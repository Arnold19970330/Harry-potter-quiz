import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

// 🎬 Harry Potter és a Halál ereklyéi – II. rész – movieId: 8

const questions = [
  {
    text: "Hol kezdődik a film?",
    options: [
      "A Shell Cottage-ben, Dobby sírjánál",
      "A Privet Drive-nál",
      "A Roxfortban",
      "A Tiltott Rengetegben"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mi az első horcrux, amit elpusztítanak a filmben?",
    options: ["A Gringottsban lévő serleg", "A medál", "A gyűrű", "A diadém"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Ki segít Harryéknek bejutni a Gringotts bankba?",
    options: ["Griphook, a kobold", "Bill Weasley", "Luna Lovegood", "Piton"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Milyen lény segít nekik megszökni a Gringottsból?",
    options: ["Egy sárkány", "Egy thesztrál", "Egy hippogriff", "Egy kentaur"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Melyik tárgyat keresik Roxfortban, mint horcruxot?",
    options: ["A Hollóhát diadémját", "A Hugrabug serlegét", "A kígyót", "A naplót"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Ki segíti őket Roxfortban megtalálni a diadémot?",
    options: ["Luna Lovegood", "Neville Longbottom", "McGalagony", "Piton"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Ki ölte meg Naginit, a kígyót?",
    options: ["Neville Longbottom", "Harry Potter", "Ron Weasley", "Hermione Granger"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Ki pusztítja el a Hollóhát diadémját?",
    options: ["Harry és Ron közösen", "Hermione", "Ginny", "Luna"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Ki menti meg a Roxfortot a tűz elől a Szükség Szobájában?",
    options: ["Harry, Ron és Hermione", "Luna és Ginny", "Neville", "McGalagony"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Ki vezeti Roxfort védelmét Voldemort ellen?",
    options: ["McGalagony professzor", "Kingsley Shacklebolt", "Piton", "Lupin"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Milyen varázslatot használ McGalagony, hogy életre keltse a szobrokat?",
    options: [
      "Piertotum Locomotor",
      "Protego Maxima",
      "Expecto Patronum",
      "Alohomora"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Ki árulja el Voldemortnak, hogy Harry Roxfortban van?",
    options: ["Piton", "Lucius Malfoy", "Bellatrix Lestrange", "Draco Malfoy"],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mi történik Pitonnal?",
    options: [
      "Voldemort megöli Naginivel",
      "Harry véletlenül sebesíti meg",
      "Bellatrix öli meg",
      "Lucius Malfoy átka találja el"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mit ad át Piton halála előtt Harrynek?",
    options: [
      "Emlékeit, hogy megtudja az igazságot",
      "A Pálcáját",
      "Egy varázsigét",
      "Egy horcruxot"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mit tud meg Harry Piton emlékeiből?",
    options: [
      "Hogy Piton végig Dumbledore oldalán állt és szerette Lilyt",
      "Hogy Piton árulta el a szüleit",
      "Hogy Piton egy horcrux",
      "Hogy Piton Harry apja"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mit jelent az, hogy Harry maga is horcrux?",
    options: [
      "Egy Voldemort-lelket hordoz magában",
      "A szíve fekete varázslatot tartalmaz",
      "Megölhetetlen",
      "Voldemort fia"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Miért hagyja Harry, hogy Voldemort megölje?",
    options: [
      "Hogy elpusztuljon benne Voldemort lelke",
      "Mert feladja a harcot",
      "Mert fél",
      "Mert Dumbledore így parancsolta"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Hol történik Harry és Voldemort végső összecsapása?",
    options: [
      "A Roxfort udvarán",
      "A Tiltott Rengetegben",
      "A Nagyteremben",
      "A Minisztériumban"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Hogyan hal meg Voldemort?",
    options: [
      "Saját varázslata visszafordul rá",
      "Harry megöli Avada Kedavrával",
      "Neville öli meg",
      "Dumbledore szelleme győzi le"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mi történik a Bodzapálcával a végén?",
    options: [
      "Harry kettétöri, hogy senki ne használhassa",
      "Elrejti a Roxfortban",
      "Neville örökli",
      "Elégeti"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Kinek a gyerekei szerepelnek az utolsó jelenetben?",
    options: [
      "Harry és Ginny, valamint Ron és Hermione gyerekei",
      "Neville és Luna gyerekei",
      "Piton gyerekei",
      "Malfoy gyerekei"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mi a film záró helyszíne?",
    options: [
      "A King’s Cross pályaudvar, 19 évvel később",
      "A Roxfort udvara",
      "A Tiltott Rengeteg",
      "A Főnix Rend székhelye"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mi Harry fiának a neve?",
    options: [
      "Albus Severus Potter",
      "James Sirius Potter",
      "Tom Harry Potter",
      "Arthur Potter"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mit mond Harry a fiának, amikor fél a Roxforttól?",
    options: [
      "„A Mardekárban is lehetsz nagyszerű ember.”",
      "„A Griffendél a legjobb választás.”",
      "„Ne félj, a mágia mindig megvéd.”",
      "„Én is féltem az első napon.”"
    ],
    correctIndex: 0,
    movieId: 8
  },
  {
    text: "Mit jelképez a záró jelenet?",
    options: [
      "Hogy a béke helyreállt, de a varázsvilág él tovább",
      "Hogy Voldemort visszatérhet",
      "Hogy a mágia véget ért",
      "Hogy Harry elfelejtette a múltat"
    ],
    correctIndex: 0,
    movieId: 8
  }
];

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const col = db.collection("questions");

    const result = await col.insertMany(questions);
    console.log(`✅ ${result.insertedCount} kérdés sikeresen feltöltve!`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
