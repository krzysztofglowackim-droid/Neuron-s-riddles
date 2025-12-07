// Simple puzzle-sequence engine
// You can edit the `puzzleSequence` object below to define your own content.

const STORAGE_KEY = "puzzleSequence_v1"; // legacy single-sequence key (kept for migration)
const LIBRARY_KEY = "puzzleSequenceLibrary_v1";
const MUSIC_SPARTANS = "Dance of the Spartans - Ancient Greek Music.mp3";
const MUSIC_FOREST = "Fairy Lands _ FANTASY MUSIC in a Magical Forest _ Fantasy Ambience [syp6Lsd8HOo].mp3";
const MUSIC_MINECRAFT = "minecraft.mp3";
const MUSIC_SEND_IN_THE_DRUMS = "Send in the Drums.mp3";
const MUSIC_FANDANGO = "Fandango.mp3";
const MUSIC_IMITATION_GAME = "The Imitation Game.mp3";
const MUSIC_WINTER = "winter.mp3";
const MUSIC_JAZZ_HALLOWEEN = "jazz halloween.mp3";
const MUSIC_ABSOLUTE_ZERO = "Absolute Zero.mp3";
const MUSIC_EPIC_SPACE = "Epic Space Music - Discovery.mp3";
const MUSIC_BYZANTINE = "Byzantine Music.mp3";

// Per-sequence background music (starting from the second riddle sequence)
const MUSIC_BY_SEQUENCE_TITLE = {};
const SFX_FAIL = "Fail sound effect.mp3";
const SFX_REWARD = "Video Game Reward Sound  Sound Effect (HD).mp3";

/**
 * Types reference (for your content editing):
 *
 * Slide:
 * - { type: "intro", title?: string, text: string }
 *
 * Puzzle types (type: "puzzle", puzzleKind: "..."):
 *
 * - Closed question
 *   { type: "puzzle", puzzleKind: "closedQuestion",
 *     question: string,
 *     options: [string, string],
 *     correctIndex: 0 | 1 }
 *
 * - Basket question (2 baskets, 5 items)
 *   { type: "puzzle", puzzleKind: "basketQuestion",
 *     prompt: string,
 *     baskets: [string, string],
 *     items: [{ label: string, correctBasketIndex: 0 | 1 }, ...5] }
 *
 * - Chain builder (3 elements, correct order)
 *   { type: "puzzle", puzzleKind: "chainBuilder",
 *     prompt: string,
 *     elements: [string, string, string] } // correct order
 *
 * - Pair matching (4 left, 4 right)
 *   { type: "puzzle", puzzleKind: "pairMatching",
 *     prompt: string,
 *     left: [string, string, string, string],
 *     right: [string, string, string, string],
 *     // mapping[i] is index in right[] that correctly matches left[i]
 *     mapping: [number, number, number, number] }
 *
 * - Logic minefield (4 statements, only 1 correct)
 *   { type: "puzzle", puzzleKind: "logicMinefield",
 *     prompt: string,
 *     statements: [string, string, string, string],
 *     correctIndex: 0 | 1 | 2 | 3 }
 *
 * Step (one "main riddle" with second chance, explanation and optional context between steps):
 * - {
 *     name: string, // for display, e.g. "Main riddle 1"
 *     main: Puzzle,
 *     secondChance: ClosedQuestionPuzzle,
 *     explanation: { title?: string, text: string },
 *     context?: { title?: string, text: string } // scientific context shown between this step and the next main riddle
 *   }
 *
 * Full sequence:
 * - {
 *     title: string,
 *     introSlides: Array<IntroSlide>,
 *     steps: Array<Step>,
 *     endScreen?: { title?: string, text: string }
 *   }
 */

const defaultPuzzleSequence = {
  title: "The Nile That Carves Power",
  introSlides: [
    {
      type: "intro",
      title: "The River That Organizes Lives",
      text:
        "Each year a brown wall of water creeps over the sand, then crawls back and leaves a thin green scar.\n\n" +
        "People cling to that strip; beyond it, only stone and heat.\n\n" +
        "If the river’s mood decides hunger or plenty, who really commands the valley—the villages, or something larger?",
    },
    {
      type: "intro",
      title: "You, the Watcher of Water",
      text:
        "You are **Tarek**, a quiet observer who walks the Nile’s edge with ink-stained fingers and sharp eyes.\n\n" +
        "You watch fields, gates, and quarrels, caring only about who eats and who starves.\n\n" +
        "Again and again, people ask your advice. Your task is simple: follow the water, and decide which kind of power must grow along it.",
    },
  ],
  steps: [
    {
      name: "Step 1 – Rhythm of the Flood",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You walk a long, thin strip of green pinned between burning desert and the Nile. Each year the river swells over its banks, " +
          "drowns the fields, then quietly falls and leaves a brief moment of wet, black mud; if families miss that moment, their crops fail.\n\n" +
          "Some elders boast they can follow their own private moons and lucky days, while others beg you to help them shape the year around the river’s rise and fall.\n\n" +
          "What rhythm for the valley’s work do you advise them to follow?",
        options: [
          "A) Hold to one shared rhythm set by the flood.",
          "B) Let each family follow its own private calendar and ignore the river’s timing.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Water comes only once on its own schedule, soaking the fields and then draining away while one family plants too early into dry dust and another too late into cracked ground.\n\n" +
          "In a land where water visits briefly and leaves, how tightly must families fit their work to that visiting water?",
        options: ["A) Plant whenever they like.", "B) Fit their work tightly to the visiting water."],
        correctIndex: 1,
      },
      explanation: {
        title: "The River’s Clock",
        text:
          "You realise the flood is the real clock: if people ignore its brief, wet moment, no belief or private date can make seeds grow in dry sand.\n\n" +
          "To eat, they must bend their year to the river’s rhythm, not the other way around.",
      },
      context: {
        title: "Rhythm and environmental determinism",
        text:
          "This step illustrates environmental determinism in floodplain agriculture: crop success depends on synchronising labour with a regular but narrow natural window.\n\n" +
          "Calendrical coordination arises from the need to match human activity to an exogenous hydrological cycle. It foreshadows how shared timekeeping becomes a precondition for survival in the Nile valley.",
      },
    },
    {
      name: "Step 2 – Valley Jobs, Village Hands",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You travel downstream past many villages strung like beads along the same river. At a meeting of elders they hand you five little clay job‑cards and two baskets.\n\n" +
          "Basket 1 is for jobs one village can mostly handle alone. Basket 2 is for jobs that many villages or the whole river must share.\n\n" +
          "Look at the job‑cards and baskets below and decide where each job belongs.",
        baskets: ["One village mostly alone", "Many villages / whole river together"],
        items: [
          { label: "Fixing a tiny ditch into one family’s field.", correctBasketIndex: 0 },
          { label: "Measuring flood height along the river and warning if it is too high or too low.", correctBasketIndex: 1 },
          { label: "Cleaning mud from a small village well.", correctBasketIndex: 0 },
          { label: "Storing spare grain from many villages together for bad years.", correctBasketIndex: 1 },
          {
            label: "Choosing one shared ‘New Year’s Day’ when everyone starts counting the flood and farm year.",
            correctBasketIndex: 1,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Picture a single village, far up the valley, deciding alone how high the flood is “for everyone”, building its own tiny grain pile and setting its own New Year while dozens of other villages do something different.\n\n" +
          "In that picture, can one village by itself really decide the flood height for all, store food for many, and fix the calendar for the whole valley?",
        options: ["A) Yes, one village can do all that alone.", "B) No, those tasks must be shared along the river."],
        correctIndex: 1,
      },
      explanation: {
        title: "Jobs that stretch along the river",
        text:
          "You see that mending a ditch or cleaning one well serves just that village, but knowing the river’s behaviour, sharing grain across bad years, and sharing a starting day all bind many villages at once.\n\n" +
          "Those river-wide jobs must live in Basket 2, where many hands and shared rules reach along the Nile.",
      },
      context: {
        title: "Local versus supra-local public goods",
        text:
          "This step distinguishes local public goods (village wells, field ditches) from supra-local or regional public goods (flood monitoring, inter-village storage, shared calendars).\n\n" +
          "The latter require coordination across communities because benefits and risks are distributed along the river system. Such tasks naturally push societies toward larger-scale institutions.",
      },
    },
    {
      name: "Step 3 – When Rivers Cross Wills",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now know some flood jobs—measuring the whole river, storing grain from many places, choosing a shared calendar—tie dozens of villages together, each with its own proud elders.\n\n" +
          "Each year their arguments over rules send different opening and closing times down the line so that up‑river choices can flood or starve down‑river farmers.\n\n" +
          "The elders ask your advice about how decisions along the river should be made.",
        options: [
          "A) We need one shared center whose flood rules everyone along the river follows, even if some complain.",
          "B) It is enough to let equal villages argue from scratch every year and hope they agree in time.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine one village opening its canals early to grab water while a neighbour opens late to save theirs, and far down‑river farmers watching the level jerk and lurch instead of flowing steadily.\n\n" +
          "In that picture, can down‑river people count on a fair, predictable flow if every village just argues each year?",
        options: ["A) Yes, argument is enough.", "B) No, they need one shared rule-giver."],
        correctIndex: 1,
      },
      explanation: {
        title: "Why a center appears",
        text:
          "You realise that when one shared river links many fields, uncoordinated local rules become weapons, not customs, and down‑river farmers pay for up‑river quarrels.\n\n" +
          "A single, valley‑wide rule‑giver reduces those clashes, even if some villages grumble.",
      },
      context: {
        title: "Central coordination and externalities",
        text:
          "This step introduces the need for central coordination in managing common‑pool resources that cross jurisdictions.\n\n" +
          "Upstream–downstream externalities mean local decisions impose costs on others, making purely decentralised governance fragile. Central authority emerges as a solution to coordination and conflict in river‑basin management.",
      },
    },
    {
      name: "Step 4 – From Flood to Throne",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "Sitting by the river at dusk, you line up three clay tiles that tell parts of one story (shown below).\n\n" +
          "Drag the tiles into the correct because → therefore order.",
        elements: [
          "The Nile flood is strong, helpful, but risky and must be watched each year.",
          "People need valley‑wide planning: shared calendar, big canals, grain stores that link many villages.",
          "A permanent high authority (pharaoh plus officials) appears to organise and enforce that planning along the whole river.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Do people first invent a high authority and wide planning for no reason and only later notice that the river is dangerous, " +
          "or do they first face a powerful, risky flood and then build broader planning and, at last, someone to run it?\n\n" +
          "Which ordering feels more natural to you?",
        options: [
          "A) Authority and planning appear before the flood problem.",
          "B) The flood pushes people into planning, which then calls for authority.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Tiles in the causal chain",
        text:
          "You see that the ever‑returning, risky flood is the first shove, forcing villages into valley‑wide planning, and that once those wide tasks exist, a permanent authority grows to hold them together.\n\n" +
          "The throne is the last tile in a chain whose first piece is water, not ambition.",
      },
      context: {
        title: "Hydraulic state hypotheses",
        text:
          "This step sketches a causal narrative consistent with aspects of the “hydraulic state” hypothesis: environmental pressures (regular but risky floods) motivate large‑scale infrastructure and coordination.\n\n" +
          "Complex, valley‑wide projects then create demand for enduring central authority to plan and enforce them.",
      },
    },
    {
      name: "Step 5 – Tools for a Long River",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You now picture the Nile as a long, narrow ribbon of green with villages stretched in a line, all bound to the same flood.\n\n" +
          "Below you see four problems on the left and four social tools on the right. Drag each tool from the right onto the problem on the left that it best answers.",
        left: [
          "1) The river is long, with many villages one behind another that all need rules that reach far.",
          "2) In good flood years there is extra grain; in bad years there is almost none, and people risk starving.",
          "3) Huge canals and dikes need thousands of workers at the same time, not just one village’s few people.",
          "4) Farmers far apart share the same river water and must match their farm year if they open and close gates together.",
        ],
        right: [
          "A) Central storehouses that take some grain as tax and release it during famines.",
          "B) A shared written calendar announced for all Egypt.",
          "C) Officials who can call up labour from many villages at once.",
          "D) A single ruler whose commands are meant to run along the whole river.",
        ],
        // mapping[i] is index of right[] that correctly matches left[i]
        mapping: [3, 0, 2, 1],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Focus on the problem of feast and famine: in fat years grain overflows, in thin years people face empty jars.\n\n" +
          "For that specific problem, which tool directly moves grain **through time**?",
        options: [
          "A) A storehouse that fills in good years and empties in bad.",
          "B) A calendar that names the months.",
          "C) A ruler’s order with no granary behind it.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Matching problems to tools",
        text:
          "You realise long‑distance rules need commands that travel (the ruler), feast–famine cycles need granaries, giant works need officials to gather labour, and synchronised farming needs a shared calendar.\n\n" +
          "Each social tool answers a different wound that the river’s length and rhythm cut into village life.",
      },
      context: {
        title: "Functional responses to environmental problems",
        text:
          "This step maps concrete environmental and organisational problems to institutional responses: monarchy provides unified command, granaries smooth intertemporal shocks, bureaucrats mobilise large labour forces, and calendars synchronise distributed activities.\n\n" +
          "It illustrates functionalist reasoning: specific state tools evolve to solve specific coordination and risk‑management problems.",
      },
    },
    {
      name: "Step 6 – Why the Center Hardens",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You have traced a chain: dangerous but regular floods → need for valley‑wide planning and tools (calendars, canals, granaries) → need for someone whose orders and records stretch along the whole Nile.\n\n" +
          "Now four storytellers speak, and you must choose the one who doesn’t insult this chain:",
        statements: [
          "“The Nile’s flood made strong kings inevitable because people really loved fancy crowns and wanted kings only for decoration.”",
          "“The Nile’s flood made strong kings likely because only a central authority could reliably coordinate flood works, record harvests, and move food along the whole river year after year.”",
          "“The Nile’s flood had nothing to do with power; central rule came only from wars with neighbours, and flood work was added later just for fun.”",
          "“The Nile’s flood removed the need for any rulers, because the river watered farms perfectly without human planning.”",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Look back at your own tiles: flood → planning → authority. Ask whether the central authority in that chain appears as a toy added on top, or as the thing that keeps the whole flood‑planning system working.\n\n" +
          "What role best fits the ruler in that chain: decoration, or necessary glue for valley‑wide work?",
        options: ["A) Decoration.", "B) Necessary glue for valley‑wide work."],
        correctIndex: 1,
      },
      explanation: {
        title: "Kings as organisers, not ornaments",
        text:
          "You see that crowns alone explain nothing: in your chain, central power is the organiser of calendars, canals, and granaries that the flood demands, not a bauble pinned on later.\n\n" +
          "The sensible story is the one that treats kings as likely outcomes of managing the Nile, not as random ornaments or enemies of planning.",
      },
      context: {
        title: "Evaluating causal narratives",
        text:
          "This step evaluates competing causal narratives for state formation in ancient Egypt.\n\n" +
          "Environmental‑management accounts tie central power to the need for coordinated irrigation, taxation, and redistribution, whereas purely decorative or flood‑independent stories ignore those structural pressures.",
      },
    },
    {
      name: "Step 7 – Why Power Becomes a Cage",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now stand on a narrow strip of green pinned between deserts, where villages cannot easily wander off to find new farmland. Flood jobs and grain storing must be done every single year, and over centuries people grow used to central calendars, scribes, and granaries that help them survive bad times.\n\n" +
          "Which explanation better captures why, once built, strong central authority became hard to escape in Egypt?",
        options: [
          "A) Repeating flood work, narrow geography and dependence on granaries and scribes tie people into the system.",
          "B) Farmers simply enjoy being ordered about.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Think of the farmers you have watched: do they obey because commands feel fun, or because their water, grain, and timing now run through central hands that they rely on to live?\n\n" +
          "Is their obedience better explained by enjoyment of being ordered, or by dependence on a system that manages floods and famine?",
        options: ["A) Enjoyment of being ordered.", "B) Dependence on the flood‑management system."],
        correctIndex: 1,
      },
      explanation: {
        title: "Exit is costly",
        text:
          "You recognise that repeating flood work, narrow geography, and dependence on granaries and scribes all tie people into the central web, while the idea that farmers obey “for fun” ignores the hard facts of hunger and desert.\n\n" +
          "Power hardens because exit is costly and the system holds crucial survival tools, not because subjects love commands.",
      },
      context: {
        title: "Path dependence and structural coercion",
        text:
          "This step explores path dependence and structural coercion in state formation.\n\n" +
          "Annual tasks, geographic constraints, and institutional dependence create high exit costs and make central authority sticky.",
      },
    },
    {
      name: "Step 8 – The Shape Carved by Water",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "At last you gather what you have seen: (1) life clings to a narrow Nile strip with desert on both sides; (2) a risky but regular flood forces everyone into one shared rhythm; (3) big, repeated river jobs and grain storage link many villages; (4) a central ruler and officials are the simplest way found so far to keep these valley‑wide tasks running every year.\n\n" +
          "When someone says, “Egyptian central authority was just a random habit—villages could easily have done all flood work separately without long‑lasting rulers if they had simply chosen to,” how do you respond?",
        options: [
          "A) No, the Nile’s flood cycle and valley shape strongly pushed Egypt toward lasting central authority.",
          "B) Yes, it was just a habit; the river and valley didn’t push them much at all.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Imagine each village suddenly “going solo” with its own canals, its own calendar, its own grain store, all on a single shared river whose water and silt ignore village borders.\n\n" +
          "In that picture, would the shared river, shared canals, shared grain stores, and shared rhythm still work smoothly for everyone?",
        options: ["A) Yes, they would still work smoothly.", "B) No, the shared system would quickly break down."],
        correctIndex: 1,
      },
      explanation: {
        title: "The shape carved by water",
        text:
          "You see that the Nile’s narrow line and tireless floods carve a certain shape into human life, making valley‑wide planning not a luxury but a condition for survival.\n\n" +
          "Central authority is not an accident here; it is the simplest way these people found to live with their river.",
      },
      context: {
        title: "Structure versus whim",
        text:
          "This capstone contrasts voluntarist explanations (“they just chose kings”) with structural ones that stress environmental and infrastructural constraints.\n\n" +
          "In a tightly constrained ecology, decentralised alternatives may be technically possible but practically unstable. Centralisation becomes a likely outcome of Nile hydrology and valley geography rather than pure cultural whim.",
      },
    },
  ],
  endScreen: {
    title: "Your Walk Along the Nile",
    text:
      "Your walk along the Nile ends as the flood quietly drains back into its bed, leaving a green ribbon and a web of rules behind.\n\n" +
      "You have watched how a dangerous, regular river forces people into shared calendars, canals, granaries, and labour, and how those valley‑wide jobs call forth a central authority to hold them together.\n\n" +
      "You have seen that local versus regional tasks, upstream–downstream conflicts, geography, and institutional dependence all shape whether power can stay scattered or must harden into a pharaoh and officials.\n\n" +
      "In the end, the Nile is not just water: it is a machine that carves calendars, granaries, and kings out of mud, showing how environment, coordination, and centralised rule can grow from the same flood.",
  },
};

// Polish version of the same sequence
const defaultPuzzleSequencePL = {
  title: "Nil, który rzeźbi władzę",
  introSlides: [
    {
      type: "intro",
      title: "Rzeka, która porządkuje życie",
      text:
        "Każdego roku brązowa ściana wody powoli wylewa na piasek, potem się cofa i zostawia cienką zieloną bliznę.\n\n" +
        "Ludzie trzymają się tej wstęgi; dalej jest tylko kamień i żar.\n\n" +
        "Jeśli nastrój rzeki decyduje o głodzie albo sytości, to kto naprawdę rządzi doliną — wioski czy coś większego?",
    },
    {
      type: "intro",
      title: "Ty, obserwator wody",
      text:
        "Jesteś **Tarekiem**, spokojnym obserwatorem, który chodzi wzdłuż brzegu Nilu z atramentem na palcach i bystrym wzrokiem.\n\n" +
        "Patrzysz na pola, bramy i kłótnie, troszcząc się tylko o to, kto będzie jadł, a kto będzie głodował.\n\n" +
        "Wciąż na nowo ludzie proszą cię o radę. Twoje zadanie jest proste: śledzić wodę i zdecydować, jaki rodzaj władzy musi przy niej wyrosnąć.",
    },
  ],
  steps: [
    {
      name: "Krok 1 – Rytm powodzi",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Idziesz wąskim, zielonym pasem uwięzionym między płonącą pustynią a Nilem. Co roku rzeka wzbiera ponad brzegi, zalewa pola, potem cicho opada i zostawia krótką chwilę mokrej, czarnej ziemi; jeśli rodziny przegapią tę chwilę, plony się nie udają.\n\n" +
          "Jedni starcy chwalą się, że kierują się własnymi księżycami i szczęśliwymi dniami, inni błagają cię, byś pomógł im ułożyć rok według wznoszenia i opadania rzeki.\n\n" +
          "Jaki rytm pracy w dolinie im doradzisz?",
        options: [
          "A) Jeden wspólny rytm wyznaczany przez wylew.",
          "B) Niech każda rodzina trzyma się własnego kalendarza i ignoruje czas rzeki.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Woda przychodzi tylko raz, o własnej porze, zalewa pola, a potem odpływa, gdy jedna rodzina sieje zbyt wcześnie w suchy pył, a inna zbyt późno w spękaną ziemię.\n\n" +
          "W krainie, gdzie woda odwiedza pola krótko i odchodzi, jak ściśle rodziny muszą dopasować swoją pracę do tej wizyty?",
        options: [
          "A) Mogą siać, kiedy chcą.",
          "B) Muszą bardzo dokładnie dopasować pracę do czasu, kiedy jest woda.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Zegar rzeki",
        text:
          "Uświadamiasz sobie, że to wylew jest prawdziwym zegarem: jeśli ludzie zlekceważą krótką, wilgotną chwilę, żadne wierzenia ani prywatne daty nie sprawią, że ziarno urośnie w suchym piasku.\n\n" +
          "Żeby jeść, muszą nagiąć rok do rytmu rzeki, a nie odwrotnie.",
      },
      context: {
        title: "Rytm i determinizm środowiskowy",
        text:
          "Ten krok pokazuje determinizm środowiskowy w rolnictwie zalewowym: powodzenie plonów zależy od zsynchronizowania pracy z regularnym, ale wąskim oknem naturalnym.\n\n" +
          "Wspólna rachuba czasu wyrasta z potrzeby dopasowania ludzkiej aktywności do zewnętrznego cyklu hydrologicznego. Zapowiada to, że wspólne odmierzanie czasu staje się warunkiem przetrwania w dolinie Nilu.",
      },
    },
    {
      name: "Krok 2 – Prace doliny, ręce wioski",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "Wędrujesz w dół rzeki obok wielu wiosek nanizanych jak paciorki na tej samej wodzie. Na zebraniu starszyzny dostajesz pięć glinianych kart z zadaniami i dwa kosze.\n\n" +
          "Kosz 1 jest na prace, z którymi jedna wioska w większości poradzi sobie sama. Kosz 2 jest na zadania, które muszą dzielić liczne wioski lub cała dolina.\n\n" +
          "Spójrz na zadania i kosze poniżej i zdecyduj, gdzie powinno trafić każde z nich.",
        baskets: ["Jedna wioska w większości sama", "Wiele wiosek / cała dolina razem"],
        items: [
          { label: "Naprawa małego rowu prowadzącego wodę na pole jednej rodziny.", correctBasketIndex: 0 },
          {
            label: "Mierzenie wysokości wylewu wzdłuż rzeki i ostrzeganie, gdy jest zbyt wysoki lub zbyt niski.",
            correctBasketIndex: 1,
          },
          { label: "Czyszczenie błota ze studni w jednej wiosce.", correctBasketIndex: 0 },
          { label: "Magazynowanie zapasowego zboża z wielu wiosek na chude lata.", correctBasketIndex: 1 },
          {
            label: "Wybranie jednego wspólnego „Nowego Roku”, od którego wszyscy liczą wylew i rok rolniczy.",
            correctBasketIndex: 1,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Wyobraź sobie jedną wioskę wysoko w górze rzeki, która sama decyduje, jak wysoki jest wylew „dla wszystkich”, buduje własny mały spichlerz i wyznacza swój Nowy Rok, podczas gdy dziesiątki innych wiosek robią coś innego.\n\n" +
          "Czy w takim obrazie jedna wioska może naprawdę sama zdecydować o wysokości wylewu, o zapasach dla wielu i o kalendarzu dla całej doliny?",
        options: [
          "A) Tak, jedna wioska może zrobić to wszystko sama.",
          "B) Nie, te zadania muszą być dzielone wzdłuż rzeki.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Prace, które rozciągają się wzdłuż rzeki",
        text:
          "Widzisz, że naprawa rowu czy czyszczenie studni służy tylko tej jednej wiosce, ale znajomość zachowania rzeki, dzielenie się zbożem między dobrymi i złymi latami oraz wspólny początek roku łączą wiele wiosek naraz.\n\n" +
          "Te prace obejmujące całą rzekę muszą trafić do Kosza 2, gdzie spotykają się liczne ręce i wspólne zasady.",
      },
      context: {
        title: "Lokalne i ponadlokalne dobra publiczne",
        text:
          "Ten krok odróżnia lokalne dobra publiczne (studnie w wiosce, rowy na polach) od ponadlokalnych lub regionalnych dóbr publicznych (monitorowanie wylewu, międzywioskowe magazyny, wspólne kalendarze).\n\n" +
          "Te drugie wymagają koordynacji między wspólnotami, bo korzyści i ryzyko są rozproszone wzdłuż systemu rzecznego. Takie zadania naturalnie popychają społeczeństwa ku instytucjom o większej skali.",
      },
    },
    {
      name: "Krok 3 – Gdy rzeka przecina wole",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Wiesz już, że niektóre prace związane z wylewem — mierzenie całej rzeki, magazynowanie zboża z wielu miejsc, wybór wspólnego kalendarza — wiążą dziesiątki wiosek, z których każda ma własną dumną starszyznę.\n\n" +
          "Co roku ich spory o zasady wysyłają w dół rzeki różne terminy otwierania i zamykania kanałów, tak że decyzje u góry rzeki mogą zatopić lub zagłodzić rolników niżej.\n\n" +
          "Starszyzna prosi cię o radę: jak powinno się podejmować decyzje wzdłuż rzeki?",
        options: [
          "A) Potrzebujemy jednego wspólnego centrum, którego zasad wylewu pilnują wszyscy wzdłuż rzeki, nawet jeśli ktoś narzeka.",
          "B) Wystarczy, że równe wioski co roku się kłócą od zera i mają nadzieję, że zdążą się dogadać.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Wyobrażasz sobie wioskę, która otwiera kanały wcześniej, by zagarnąć wodę, podczas gdy sąsiad otwiera późno, by zachować ją dla siebie, a rolnicy daleko w dole rzeki patrzą, jak poziom wody skacze i szarpie się zamiast płynąć równomiernie.\n\n" +
          "Czy w takim obrazie ludzie w dole rzeki mogą liczyć na sprawiedliwy, przewidywalny przepływ, jeśli każda wioska po prostu się spiera co roku?",
        options: [
          "A) Tak, same spory wystarczą.",
          "B) Nie, potrzebują jednego wspólnego dawcy zasad.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Dlaczego pojawia się centrum",
        text:
          "Rozumiesz, że gdy jedna wspólna rzeka łączy wiele pól, nieskoordynowane lokalne zasady stają się bronią, a nie zwyczajem, i to rolnicy w dole rzeki płacą za spory u góry.\n\n" +
          "Jedno, ogólnodolinne centrum zasad zmniejsza te zderzenia, nawet jeśli część wiosek marudzi.",
      },
      context: {
        title: "Centralna koordynacja i efekty zewnętrzne",
        text:
          "Ten krok wprowadza potrzebę centralnej koordynacji przy zarządzaniu wspólnymi zasobami, które przekraczają granice wspólnot.\n\n" +
          "Efekty zewnętrzne między górnym a dolnym biegiem rzeki oznaczają, że lokalne decyzje nakładają koszty na innych, więc czysto zdecentralizowane rządzenie jest kruche. Władza centralna pojawia się jako rozwiązanie problemów koordynacji i konfliktów w zarządzaniu dorzeczem.",
      },
    },
    {
      name: "Krok 4 – Od powodzi do tronu",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "Siedzisz nad rzeką o zmierzchu i układasz trzy gliniane płytki, które opowiadają części jednej historii (widzisz je poniżej).\n\n" +
          "Przeciągnij płytki w poprawny porządek: bo → dlatego → więc.",
        elements: [
          "Powódź Nilu jest silna, pomocna, ale ryzykowna i co roku trzeba ją obserwować.",
          "Ludzie potrzebują planowania w skali doliny: wspólnego kalendarza, dużych kanałów, spichlerzy łączących wiele wiosek.",
          "Pojawia się trwała, wysoka władza (faraon z urzędnikami), która organizuje i egzekwuje to planowanie wzdłuż całej rzeki.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Czy ludzie najpierw z niczego wymyślają wysoką władzę i szerokie planowanie, a dopiero potem zauważają, że rzeka jest groźna,\n" +
          "czy też najpierw stają wobec silnej, ryzykownej powodzi, potem budują szerokie planowanie, a na końcu kogoś, kto tym kieruje?\n\n" +
          "Która kolejność wydaje ci się bardziej naturalna?",
        options: [
          "A) Władza i planowanie pojawiają się przed problemem powodzi.",
          "B) Powódź popycha ludzi do planowania, a ono wzywa władzę.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Płytki w łańcuchu przyczynowym",
        text:
          "Widzisz, że powracająca, ryzykowna powódź jest pierwszym pchnięciem, które zmusza wioski do planowania w skali doliny, a gdy takie szerokie zadania już istnieją, wyrasta trwała władza, by je utrzymać.\n\n" +
          "Tron jest ostatnią płytką w łańcuchu, którego pierwszym elementem jest woda, a nie ambicja.",
      },
      context: {
        title: "Hipotezy „państwa hydraulicznego”",
        text:
          "Ten krok szkicuje opowieść przyczynową zgodną z niektórymi wersjami hipotezy „państwa hydraulicznego”: presje środowiskowe (regularne, lecz ryzykowne wylewy) motywują powstawanie wielkich inwestycji i koordynacji.\n\n" +
          "Złożone, dolinowe projekty tworzą następnie zapotrzebowanie na trwałą władzę centralną, która je planuje i egzekwuje.",
      },
    },
    {
      name: "Krok 5 – Narzędzia dla długiej rzeki",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "Wyobrażasz sobie Nil jako długą, wąską wstęgę zieleni z wioskami ustawionymi w rzędzie, wszystkie związane tym samym wylewem.\n\n" +
          "Niżej widzisz cztery problemy po lewej i cztery społeczne narzędzia po prawej. Przeciągnij każde narzędzie z prawej strony na ten problem po lewej, do którego najlepiej pasuje.",
        left: [
          "1) Rzeka jest długa, z wieloma wioskami jedna za drugą, które wszystkie potrzebują zasad sięgających daleko.",
          "2) W latach obfitych zboże się przelewa, w chudych prawie go nie ma i ludzie ryzykują głód.",
          "3) Wielkie kanały i wały wymagają tysięcy robotników naraz, nie tylko kilku ludzi z jednej wioski.",
          "4) Rolnicy daleko od siebie dzielą tę samą wodę i muszą zgrywać rok rolniczy, jeśli wspólnie otwierają i zamykają bramy.",
        ],
        right: [
          "A) Centralne spichlerze, które zabierają część zboża jako podatek i wydają je w czas głodu.",
          "B) Wspólny, zapisany kalendarz ogłoszony dla całego Egiptu.",
          "C) Urzędnicy, którzy mogą wezwać pracę z wielu wiosek naraz.",
          "D) Jeden władca, którego rozkazy mają biec wzdłuż całej rzeki.",
        ],
        mapping: [3, 0, 2, 1],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Skup się na problemie lat tłustych i chudych: w tłustych latach zboże się przelewa, w chudych ludzie patrzą na puste naczynia.\n\n" +
          "Które narzędzie bezpośrednio przenosi ziarno **w czasie**?",
        options: [
          "A) Spichlerz, który zapełnia się w dobrych latach, a opróżnia w złych.",
          "B) Kalendarz, który nazywa miesiące.",
          "C) Rozkaz władcy bez spichlerza za plecami.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Dopasowywanie problemów do narzędzi",
        text:
          "Rozumiesz, że zasady na dalekim dystansie wymagają rozkazów, które podróżują (władcy), cykle tłusto‑chude potrzebują spichlerzy, ogromne roboty wymagają urzędników zwołujących pracę, a zsynchronizowane rolnictwo wymaga wspólnego kalendarza.\n\n" +
          "Każde społeczne narzędzie odpowiada na inną ranę, jaką długość i rytm rzeki zadają życiu wiosek.",
      },
      context: {
        title: "Funkcjonalne odpowiedzi na problemy środowiskowe",
        text:
          "Ten krok mapuje konkretne problemy środowiskowe i organizacyjne na instytucjonalne odpowiedzi: monarchia zapewnia jednolite dowodzenie, spichlerze wygładzają wstrząsy między latami, biurokraci mobilizują wielkie zasoby pracy, a kalendarze synchronizują rozproszone działania.\n\n" +
          "To ilustracja rozumowania funkcjonalistycznego: określone narzędzia państwa ewoluują, by rozwiązywać określone problemy koordynacji i zarządzania ryzykiem.",
      },
    },
    {
      name: "Krok 6 – Dlaczego centrum twardnieje",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "Prześledziłeś łańcuch: niebezpieczne, ale regularne wylewy → potrzeba planowania w skali doliny i narzędzi (kalendarze, kanały, spichlerze) → potrzeba kogoś, czyje rozkazy i zapiski sięgają wzdłuż całego Nilu.\n\n" +
          "Teraz mówią czterej opowiadacze i musisz wybrać tego, który nie obraża tego łańcucha:",
        statements: [
          "„Powodzie Nilu uczyniły silnych królów nieuchronnymi, bo ludzie naprawdę kochali błyszczące korony i chcieli władców tylko dla ozdoby.”",
          "„Powodzie Nilu uczyniły silnych królów prawdopodobnymi, bo tylko władza centralna mogła wiarygodnie koordynować prace przy wylewie, zapisywać zbiory i rok po roku przesuwać żywność wzdłuż rzeki.”",
          "„Powodzie Nilu nie miały nic wspólnego z władzą; rządy centralne wzięły się wyłącznie z wojen z sąsiadami, a prace przy wylewie dodano później dla zabawy.”",
          "„Powodzie Nilu usunęły potrzebę jakichkolwiek władców, bo rzeka idealnie nawadniała pola bez ludzkiego planowania.”",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Spójrz na własne płytki: powódź → planowanie → władza. Zastanów się, czy w tym łańcuchu władza centralna pojawia się jako zabawka dołożona z wierzchu, czy jako coś, co utrzymuje w ruchu cały system planowania wylewów.\n\n" +
          "Jaką rolę najlepiej oddaje ten łańcuch: ozdoby czy koniecznego spoiwa dla pracy w skali doliny?",
        options: ["A) Ozdoba.", "B) Konieczne spoiwo pracy w skali doliny."],
        correctIndex: 1,
      },
      explanation: {
        title: "Królowie jako organizatorzy, nie ozdoby",
        text:
          "Widzisz, że same korony niczego nie wyjaśniają: w twoim łańcuchu władza centralna jest organizatorem kalendarzy, kanałów i spichlerzy, których domaga się wylew, a nie błyskotką przypiętą później.\n\n" +
          "Rozsądna opowieść traktuje królów jako prawdopodobny wynik zarządzania Nilem, a nie jako przypadkowe ozdoby czy wrogów planowania.",
      },
      context: {
        title: "Ocenianie opowieści przyczynowych",
        text:
          "Ten krok ocenia konkurujące opowieści przyczynowe o powstaniu państwa w Egipcie.\n\n" +
          "Narracje środowiskowo‑zarządcze wiążą władzę centralną z potrzebą koordynacji nawadniania, podatków i redystrybucji, podczas gdy historie całkowicie niezależne od wylewów ignorują te strukturalne naciski.",
      },
    },
    {
      name: "Krok 7 – Dlaczego władza staje się klatką",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Stoisz teraz na wąskim zielonym pasie między pustyniami, gdzie wioski nie mogą łatwo odejść, by znaleźć nowe pola. Prace przy wylewie i magazynowanie zboża trzeba wykonywać co roku, a przez stulecia ludzie przyzwyczajają się do centralnych kalendarzy, skrybów i spichlerzy, które pomagają przetrwać złe czasy.\n\n" +
          "Które wyjaśnienie lepiej oddaje, dlaczego raz zbudowana silna władza centralna stała się w Egipcie trudna do porzucenia?",
        options: [
          "A) Powtarzalne prace przy wylewie, wąska geografia i zależność od spichlerzy oraz skrybów wiążą ludzi z systemem.",
          "B) Rolnicy po prostu lubią być rozkazywani.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Pomyśl o rolnikach, których obserwowałeś: słuchają, bo rozkazy są przyjemne, czy dlatego, że ich woda, zboże i czas teraz przechodzą przez ręce centrum, od którego zależy ich życie?\n\n" +
          "Czy ich posłuszeństwo lepiej wyjaśnia przyjemność z bycia rozkazywanym, czy zależność od systemu, który zarządza powodziami i głodem?",
        options: [
          "A) Przyjemność z bycia rozkazywanym.",
          "B) Zależność od systemu zarządzania powodzią i głodem.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Wyjście jest kosztowne",
        text:
          "Rozpoznajesz, że powtarzające się prace przy wylewie, wąska geografia i zależność od spichlerzy oraz skrybów wiążą ludzi w centralnej sieci, a pomysł, że rolnicy słuchają „dla zabawy”, ignoruje twarde fakty głodu i pustyni.\n\n" +
          "Władza twardnieje, bo wyjście jest kosztowne, a system trzyma kluczowe narzędzia przetrwania, nie dlatego, że poddani kochają rozkazy.",
      },
      context: {
        title: "Uzależnienie od ścieżki i przymus strukturalny",
        text:
          "Ten krok bada uzależnienie od ścieżki i przymus strukturalny w procesie powstawania państwa.\n\n" +
          "Coroczne zadania, ograniczenia geograficzne i instytucjonalna zależność tworzą wysokie koszty wyjścia i czynią władzę centralną lepką.",
      },
    },
    {
      name: "Krok 8 – Kształt wyrzeźbiony przez wodę",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Na koniec zbierasz to, co widziałeś: (1) życie trzyma się wąskiego pasa Nilu z pustynią po obu stronach; (2) ryzykowna, ale regularna powódź zmusza wszystkich do jednego wspólnego rytmu; (3) wielkie, powtarzalne prace rzeczne i magazynowanie zboża łączą wiele wiosek; (4) władca i urzędnicy są najprostszym dotąd znalezionym sposobem, by co roku utrzymywać te zadania w skali doliny.\n\n" +
          "Gdy ktoś mówi: „Egipska władza centralna była tylko przypadkowym zwyczajem — wioski mogły spokojnie wykonywać wszystkie prace przy wylewie osobno, bez trwałych władców, gdyby tylko tak wybrały”, jak odpowiadasz?",
        options: [
          "A) Nie, cykl wylewów Nilu i kształt doliny silnie pchały Egipt w stronę trwałej władzy centralnej.",
          "B) Tak, silna władza centralna była przypadkiem; środowisko Nilu wcale jej nie sprzyjało.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Pomyśl o całym łańcuchu, który śledziłeś: wąska dolina → ryzykowna, ale regularna powódź → wspólne odmierzanie czasu, kanały i spichlerze → władza centralna, która to wszystko koordynuje.\n\n" +
          "W tym pełnym obrazie, czy władza centralna wygląda na przypadkowy dodatek, który wioski łatwo mogłyby zastąpić, czy na wynik życia wewnątrz takiego łańcucha?",
        options: ["A) Przypadkowy dodatek.", "B) Prawdopodobny wynik tego łańcucha."],
        correctIndex: 1,
      },
      explanation: {
        title: "Gdy woda rysuje koronę",
        text:
          "Wnioskujesz, że szczególne połączenie zagrożenia, regularności i wąskiej geografii sprawia, że silne, trwałe centrum jest znacznie bardziej prawdopodobne niż łata kolorowych, równych wiosek.\n\n" +
          "Woda rzeźbi skałę w czasie; podobnie powtarzające się wylewy rzeźbią instytucje władzy, które trudno zmazać.",
      },
      context: {
        title: "Presje środowiskowe a powstawanie państwa",
        text:
          "Ten ostatni krok podsumowuje środowiskowo‑instytucjonalne wyjaśnienie powstania państwa egipskiego.\n\n" +
          "Zamiast widzieć władzę centralną jako czysto kulturowy kaprys, traktuje on reżim wylewów Nilu i geografię doliny jako głębokie naciski kształtujące trwałe struktury polityczne.",
      },
    },
  ],
  endScreen: {
    title: "Przeszedłeś argument rzeki",
    text:
      "Zacząłeś od rozproszonych wiosek wpatrzonych w groźną, ale życiodajną rzekę. Krok po kroku śledziłeś, jak rytm i ryzyko rzeki pcha ludzi do wspólnych kalendarzy, kanałów, spichlerzy, urzędników, a w końcu do korony, która twierdzi, że stoi ponad tym wszystkim.\n\n" +
      "Nie znaczy to, że Nil mechanicznie „stworzył” faraonów, ale że każda opowieść o egipskiej władzy musi zmierzyć się z wodą, błotem i czasem, a nie tylko z pragnieniami królów. Rzeka wyrzeźbiła nie tylko pola, lecz także kształt władzy, która próbowała nimi rządzić.",
  },
};

// Neuron integration & threshold sequence (English)
const neuronSequence = {
  title: "Little Calculator of Spikes – How a Neuron Decides to Fire",
  introSlides: [
    {
      type: "intro",
      title: "The Strange Vote",
      text:
        "Billions of cells sit in the dark of your skull, each silent until, suddenly, one erupts with a spike of electricity.\n\n" +
        "Most of the time, almost nothing happens—tiny whispers, brief flickers.\n\n" +
        "What pushes a single neuron from quiet murmur to an all-or-nothing shout?",
    },
    {
      type: "intro",
      title: "You Enter",
      text:
        "You walk through an imagined city of neurons, a curious wanderer with no degree, only patience.\n\n" +
        "Your name is **Niko**. You can’t see thoughts—only tiny signals arriving, fading, colliding.\n\n" +
        "Your task is simple: follow one neuron like a shadow, and decide when, and why, it finally fires.",
    },
  ],
  steps: [
    {
      name: "Step 1 – Whispers Before the Shout",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "In front of you glows a single neuron, quiet as an after-school classroom: each incoming signal from another cell gives its inside only a tiny, brief nudge before it slowly drifts back toward its resting level, and your meter shows a marked firing point where, if the total change ever gets big enough, the neuron will suddenly send a full action potential down its axon.\n\n" +
          "Watching one lone, tiny signal arrive, what do you tell yourself will usually happen?",
        options: [
          "This single small push will normally shove the neuron straight past the firing point and make it fire.",
          "One small push is usually not enough; many signals must add together to reach the firing point.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You see the trace jump just a little, then fade as the neuron’s voltage drifts back toward rest, the special firing mark still untouched on your screen.\n\n" +
          "Given how quickly this single bump shrinks, do you now think one such short push is likely to cross the firing point on its own, or that several pushes usually have to pile up?",
        options: [
          "One such short push is likely to cross the firing point on its own.",
          "Several such pushes usually have to pile up to cross the firing point.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Tiny shoves toward threshold",
        text:
          "You realize that each tiny signal is just a small, leaking shove toward the firing point; by itself it fades away before crossing the line, so the neuron normally needs many such whispers added together before it can shout with a full spike.",
      },
      context: {
        title: "Synaptic potentials and threshold",
        text:
          "This illustrates **synaptic potentials** and **threshold**. Individual excitatory postsynaptic potentials (EPSPs) are small and decay over time, so a single EPSP rarely reaches the action potential threshold.\n\n" +
          "Neurons typically require **summation** of many EPSPs to trigger an action potential.",
      },
    },
    {
      name: "Step 2 – Pushes Toward, Pulls Away",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You zoom in on the same neuron and feel its inside like a charged pond: some incoming signals make it a bit less negative and push it toward the firing point (excitatory), while others make it more negative and pull it away from firing (inhibitory).\n\n" +
          "You set down two bowls, “Excitatory (toward firing)” and “Inhibitory (away from firing)”, and must quietly drop in each effect described below—where do you place each?",
        baskets: ["Excitatory (toward firing)", "Inhibitory (away from firing)"],
        items: [
          { label: "The inside becomes a bit less negative than before.", correctBasketIndex: 0 },
          { label: "The inside becomes more negative than before.", correctBasketIndex: 1 },
          {
            label: "Channels open that let positive ions flow in, making the inside less negative.",
            correctBasketIndex: 0,
          },
          {
            label: "Channels open that let negative ions in or positive ions out, making the inside more negative.",
            correctBasketIndex: 1,
          },
          {
            label:
              "A signal tends to undo excitatory changes and bring the inside back down toward its resting level.",
            correctBasketIndex: 1,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Imagine the neuron has just been nudged upward toward firing, and then a new signal appears that pulls the voltage back down toward rest instead of letting it stay high.\n\n" +
          "Compared with staying excited, is that signal making firing easier or harder—so should you treat it as excitatory (toward firing) or inhibitory (away from firing)?",
        options: [
          "It is excitatory (toward firing), because it helps the neuron stay closer to threshold.",
          "It is inhibitory (away from firing), because it pulls the voltage back down toward rest.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Excitatory versus inhibitory",
        text:
          "You see that anything making the inside less negative or opening routes for positive charge to flow in helps the neuron approach threshold, while anything that makes it more negative—or quickly drags it back down toward rest—pushes it away from firing and counts as inhibitory.",
      },
      context: {
        title: "Excitatory and inhibitory synaptic effects",
        text:
          "This step contrasts **excitatory** and **inhibitory** synaptic effects. Excitatory inputs depolarize the membrane (make it less negative), often via inward positive currents (e.g. Na⁺), whereas inhibitory inputs hyperpolarize or counteract depolarization (e.g. Cl⁻ in or K⁺ out).\n\n" +
          "What matters for firing is the **direction** of the change relative to threshold.",
      },
    },
    {
      name: "Step 3 – Two Pushes, One Moment",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You watch the neuron receive small excitatory signals: each gives a modest upward bump toward the firing point, but between bumps the voltage slowly leaks back down toward rest, so two weak bumps that happen very close together in time can add up like two quick pushes on a swing, while two bumps far apart don’t add much because the first has mostly faded.\n\n" +
          "You deliver two equally weak excitatory signals to this neuron—when do you expect it to be more likely to reach the firing point?",
        options: [
          "When the two signals come far apart in time, after the first has almost fully faded.",
          "When the two signals come very close together in time so the second bump stacks on top of the first.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine yourself pushing a child on a swing: one push, then you wait until the swing nearly stops before pushing again, versus two pushes given in quick succession while it’s still moving.\n\n" +
          "When do your pushes work better—when they are spaced far apart, or when the second comes while the first still has momentum?",
        options: ["When they are spaced far apart.", "When the second comes while the first still has momentum."],
        correctIndex: 1,
      },
      explanation: {
        title: "Temporal summation",
        text:
          "You realize that, just like the swing, the neuron remembers a recent push for a short time; two signals close together can overlap and add, while widely separated ones act almost alone, making threshold much harder to reach.",
      },
      context: {
        title: "Summing over time",
        text:
          "This showcases **temporal summation** of EPSPs. Because synaptic potentials decay over time, inputs arriving within a short time window can summate at the trigger zone, increasing the chance of crossing threshold.\n\n" +
          "Inputs far apart in time largely fail to interact.",
      },
    },
    {
      name: "Step 4 – The Trigger Zone’s Verdict",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "You focus on a narrow region near the start of the axon—the trigger zone—where the neuron “votes”: excitatory input minus any inhibition make the inside near this zone steadily less negative; at some point the electrical state there may cross threshold, and then special channels open and create a big spike that travels along the axon.\n\n" +
          "Drag the tiles into the correct cause → effect order.",
        elements: [
          "Lots of excitatory input minus any inhibition has already made the inside near the trigger zone steadily less negative.",
          "The rising mix of inputs makes the electrical state at the trigger zone cross the neuron’s threshold level.",
          "A large, all-or-none action potential is generated and travels down the axon.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Ask yourself: can the trigger zone cross threshold before excitatory inputs have pushed its voltage upward, or must the upward push come first, then crossing threshold, and only then the big spike shooting down the axon?",
        options: [
          "The upward push from net excitation must come first, then threshold is crossed, then the big spike is generated.",
          "The trigger zone can cross threshold and fire before any excitatory input has pushed its voltage upward.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Integration, threshold, spike",
        text:
          "You see that the neuron must first be driven upward by net excitation at the trigger zone, then cross the threshold line, and only after that can it unleash the all-or-none action potential that travels away.",
      },
      context: {
        title: "From integration to action potential",
        text:
          "This step highlights the sequence of **integration at the axon initial segment**, **threshold crossing**, and **action potential generation**.\n\n" +
          "The trigger zone integrates excitatory and inhibitory input; once membrane potential crosses threshold there, voltage-gated Na⁺ channels open, creating the stereotyped spike that propagates along the axon.",
      },
    },
    {
      name: "Step 5 – Near Voices, Distant Echoes",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You now see that not all synapses whisper equally into the trigger zone’s ear: an excitatory synapse very close to it sends a strong signal with little loss, an excitatory synapse far out on a thin dendrite fades as it travels inward, an inhibitory synapse right at the trigger zone can almost veto many excitatory inputs upstream, and quiet leak channels everywhere slowly pull the voltage back toward rest between bursts.\n\n" +
          "On the left you see four features, and on the right four effects. Drag each effect from the right onto the feature on the left that it best matches.",
        left: [
          "An excitatory synapse very close to the trigger zone.",
          "An excitatory synapse far out on a thin dendrite.",
          "An inhibitory synapse right at the trigger zone.",
          "Background leak channels open all the time.",
        ],
        right: [
          "Has a strong influence on whether the neuron reaches threshold, because little is lost on the way.",
          "Often fades on the way in, so its effect on the final decision is weaker unless many of them act together.",
          "Can almost override many excitatory inputs, because it pulls the trigger zone directly away from threshold.",
          "Slowly drags the voltage back toward rest between bursts of input, so short inputs must be well-timed.",
        ],
        // mapping[i] is index of right[] that correctly matches left[i]
        mapping: [0, 1, 2, 3],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Think about a tiny excitatory signal starting far out on a thin dendritic branch and having to travel all the way in—does it usually arrive at full strength like a powerful shove, or more like a softened, partially faded nudge, and should you treat such a distant synapse as strongly decisive or as something that matters mainly when many act together?",
        options: [
          "It usually arrives at full strength and is strongly decisive on its own.",
          "It usually arrives faded, so it matters mainly when many such synapses act together.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Spatial summation and electrotonic decay",
        text:
          "You recognise that closeness to the trigger zone and direct inhibition there greatly amplify a synapse’s impact, while distant inputs are weakened by the cable-like dendrite and leak currents constantly tug the voltage back down, forcing inputs to be strong or well-timed to matter.",
      },
      context: {
        title: "Location and influence",
        text:
          "This illustrates **spatial summation** and **electrotonic decay**. Synapses nearer the trigger zone have more influence because signals traveling along dendrites attenuate.\n\n" +
          "Inhibitory synapses near the trigger zone can effectively veto excitation. Persistent leak conductances contribute to the membrane time and length constants, shaping how location and timing affect integration.",
      },
    },
    {
      name: "Step 6 – The Line in the Sand",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You now treat the neuron’s threshold as a decision line: if combined inputs at the trigger zone do not reach threshold, nothing big happens—just small bumps; if they do reach or pass threshold, the neuron fires a full action potential, and making the input slightly bigger than threshold doesn’t create a bigger spike, just makes firing more likely or earlier; after a spike, there is a short time when the neuron is less able to fire again.\n\n" +
          "Given this, only one of the four statements below fits the idea of a sharp decision line. Which one do you keep?",
        statements: [
          "If the inputs stay just below threshold, the neuron fires a smaller, “half-strength” action potential.",
          "Once threshold is crossed, the neuron fires a full action potential; making the input bigger mainly changes how soon it fires, not the size of the spike.",
          "The neuron’s action potentials can have any size at all; there is no special threshold point.",
          "If the neuron just fired, the very next moment it is more sensitive than usual and fires to even tiny inputs.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Ask yourself: if the neuron really produced “half-strength spikes” whenever inputs were just below threshold, would that still fit the idea of a special decision line where it either stays quiet or gives a full-size signal, or would it sound more like a smooth volume knob with no clear on/off point?",
        options: [
          "Half-strength spikes below threshold fit well with the idea of a sharp decision line.",
          "Half-strength spikes would blur the decision line; an all-or-none spike above threshold fits better with a sharp on/off point.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "All-or-none spikes and refractoriness",
        text:
          "You see that the premises describe an all-or-none device: below threshold, only small graded bumps; at or above threshold, a full spike of fixed size followed by a less excitable period, so only the statement about full action potentials and timing can be true.",
      },
      context: {
        title: "Threshold and the refractory period",
        text:
          "This step captures the **all-or-none nature** of action potentials and the **refractory period**. Subthreshold inputs produce graded potentials but no spike; suprathreshold inputs trigger a stereotyped action potential whose amplitude is largely invariant, while stronger input can alter firing probability or timing.\n\n" +
          "Immediately after a spike, refractory mechanisms reduce excitability.",
      },
    },
    {
      name: "Step 7 – Why the Neuron Holds Back",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You now know the rules: excitatory inputs push toward threshold, inhibitory inputs pull away, distant inputs fade, leak currents pull voltage back toward rest, and threshold behaves in an all-or-none way, yet you observe a neuron that receives lots of excitatory signals and still fires fewer action potentials than you expected.\n\n" +
          "Four candidate explanations are listed below. Three of them really can explain under-firing, but one is a trap. Which statement is the trap?",
        statements: [
          "Strong inhibitory synapses near the trigger zone are active at the same time, pulling the voltage away from threshold.",
          "Most excitatory synapses are far out on dendrites, so much of their effect fades before reaching the trigger zone.",
          "The neuron’s leak currents are very weak, so the voltage stays high for a long time once pushed up.",
          "The neuron has just fired several spikes and its membrane is in a period where it is harder than usual to fire again (relative refractory period).",
        ],
        // Here the “trap” is statement 3: weak leak would actually make firing easier.
        correctIndex: 2,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Focus on the leak currents: if they are weaker, do upward pushes disappear faster or more slowly, and would slower fading make it harder or easier for strong excitation to carry the neuron up to threshold?",
        options: [
          "Weaker leak makes upward pushes fade faster and makes threshold harder to reach, so weak leak is a good explanation for under-firing.",
          "Weaker leak makes upward pushes fade more slowly and makes threshold easier to reach, so weak leak cannot explain under-firing.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "What really suppresses firing",
        text:
          "You realise that strong near-trigger-zone inhibition, distant fading excitation, and recent refractory history can all blunt firing despite high excitatory input, whereas weak leak would actually help the neuron stay near threshold, not prevent it from firing.",
      },
      context: {
        title: "Inhibition, distance, leak, refractoriness",
        text:
          "This tuner combines **inhibition**, **distance-dependent attenuation**, **leak conductances**, and **refractoriness** in explaining firing rate.\n\n" +
          "Effective inhibition and distal synapses reduce net depolarization at the trigger zone, and relative refractoriness raises the effective threshold. Weak leak would prolong depolarization rather than suppress it, so it cannot explain reduced firing here.",
      },
    },
    {
      name: "Step 8 – Little Calculator of Spikes",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Putting everything together, you picture your neuron bombarded by many small excitatory and inhibitory signals of different sizes, at different places and times; these signals are added and subtracted, they fade with distance and time, and leak currents pull the voltage back toward rest, so that only when the total push at the trigger zone in some moment crosses the threshold does the neuron send a full action potential—otherwise it stays quiet at that moment.\n\n" +
          "Given this, which picture do you, Niko, carry away about how a neuron “decides” to fire?",
        options: [
          "It is a simple on–off switch that flips randomly, ignoring the size and timing of inputs.",
          "It is a tiny calculator that sums up all excitatory and inhibitory pushes in space and time, and fires only when that total passes a specific threshold.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Ask yourself: if the neuron ignored the size and timing of its inputs, would changing the amount of excitation or inhibition ever change its firing at all, or does our whole story of “adding up pushes until we cross threshold” fit better with the idea of a calculator-like decision?",
        options: [
          "Ignoring the size and timing of inputs fits well with the idea that firing depends on summing pushes to threshold.",
          "The story of adding up pushes until we cross threshold fits better with a calculator-like decision than with a random flip.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Integration and decision",
        text:
          "You recognise that firing depends sensitively on how many inputs arrive, where they land, and when they overlap, so the neuron behaves like a tiny integrator comparing the summed input to a threshold, not like a random coin flip.",
      },
      context: {
        title: "Neuronal integration and threshold dynamics",
        text:
          "This final step summarises **neuronal integration and threshold dynamics**. Neurons perform a weighted sum of synaptic inputs across space (dendritic and somatic locations) and time (temporal summation), with leak and refractory effects shaping the result.\n\n" +
          "An action potential occurs only when this integrated signal exceeds threshold at the trigger zone.",
      },
    },
  ],
  endScreen: {
    title: "Leaving the City of Spikes",
    text:
      "Your walk through the city of neurons ends: you watched tiny signals arrive, fade, clash, and occasionally ignite a full electrical shout. You saw how some synapses push toward firing, others pull away, and how distance, timing, leak, and refractory pauses sculpt the final verdict at the trigger zone.\n\n" +
      "In plain language, you’ve met **excitatory vs inhibitory inputs**, **temporal and spatial summation**, **threshold and all-or-none spikes**, and the roles of **leak currents and refractoriness**.\n\n" +
      "A single neuron is not a random switch, but a small, precise calculator that decides to fire only when the total of its many whispers crosses a sharp line.",
  },
};

// Population coding & distributed representation (English)
const populationCodingSequence = {
  title: "Choirs of Neurons – Why the Brain Codes with Crowds",
  introSlides: [
    {
      type: "intro",
      title: "The Strange Choir",
      text:
        "Neurons spark in dense crowds, never alone.\n\n" +
        "When you see an apple, hear a name, remember a face, it’s not one magic cell that whispers the answer but a whole burst of activity.\n\n" +
        "If a single neuron can fire for “grandma,” why does your brain insist on using a **chorus** instead of a lone, perfect soloist?",
    },
    {
      type: "intro",
      title: "You Enter the Lab",
      text:
        "You are **Lena**, an apprentice brain‑engineer in a dim workshop of wires, diodes, and tiny robot “brains.”\n\n" +
        "You don’t take slogans on faith—you watch what breaks, what survives, what remembers.\n\n" +
        "Your job is simple and ruthless: design codes, stress them, and decide whether a brain should trust one neuron or a **crowd**.",
    },
  ],
  steps: [
    {
      name: "Step 1 – One Bulb or a Constellation?",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "On your bench you wire a robot brain made of light bulbs: in Plan 1 you create one special bulb that lights only for “APPLE,” while in Plan 2 you create a pattern where many bulbs glow together for “APPLE,” each of those bulbs also helping with other things like “red” or “round,” and you know any one bulb might someday burn out forever.\n\n" +
          "When your mentor warns that a single bulb will eventually die and asks which wiring makes it less likely the robot will completely forget “APPLE” when that happens, what do you answer?",
        options: [
          "One special bulb that means APPLE all by itself.",
          "A shared pattern of many bulbs where no single bulb means APPLE by itself.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine Plan 1: the lone APPLE bulb burns out and APPLE never lights again; then Plan 2: one bulb in the APPLE pattern dies, but the rest of the pattern still appears when the robot sees an apple.\n\n" +
          "Seeing this, do you now think only the shared‑pattern plan keeps APPLE alive after one bulb dies, or that both plans lose APPLE completely after one bulb dies?",
        options: [
          "Only the shared‑pattern plan keeps APPLE alive after one bulb dies.",
          "Both plans lose APPLE completely after one bulb dies.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Why one bulb is brittle",
        text:
          "You realise that in Plan 1 the entire code is trapped in a single fragile part, so one failure erases it, while in Plan 2 the code is spread across many bulbs, so the pattern can survive even when one piece is gone.",
      },
      context: {
        title: "Population coding and robustness",
        text:
          "This illustrates why **distributed / population coding** is more robust than “grandmother cell” or single‑detector coding.\n\n" +
          "Information spread across many units can tolerate individual failures, whereas information stored in a single dedicated unit is brittle. In neuroscience, population codes improve fault tolerance in noisy, lossy biological hardware.",
      },
    },
    {
      name: "Step 2 – Lone Stars vs Teams",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You now name your two wiring styles: “single‑detector code” is one neuron per thing, like a unique “APPLE neuron,” and “population code” is a team pattern where many neurons share many things and each thing is a special pattern across the team.\n\n" +
          "You hold five idea‑cards you must drop into the right basket.",
        baskets: ["More like single‑detector coding", "More like population / team coding"],
        items: [
          {
            label: "If one neuron dies, the whole code for that one thing disappears at once.",
            correctBasketIndex: 0,
          },
          {
            label:
              "The same neuron can help represent many different things by firing more or less strongly in different patterns.",
            correctBasketIndex: 1,
          },
          {
            label:
              "The brain can still tell things apart even if a few neurons are noisy or tired, because the rest of the team still carries the pattern.",
            correctBasketIndex: 1,
          },
          {
            label: "Each thing needs its own private, unused neuron.",
            correctBasketIndex: 0,
          },
          {
            label:
              "You can represent far more things than the number of neurons, by mixing and matching neurons into many patterns.",
            correctBasketIndex: 1,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You picture a football team instead of one star player and ask yourself: if an idea says “one private neuron per thing,” does that sound more like a lone star or a team, and if an idea says “many neurons share many things and make patterns,” does that sound more like a lone star or a team working together?",
        options: [
          "Team = population coding, lone star = single‑detector coding.",
          "Team = single‑detector coding, lone star = population coding.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Stars versus teams",
        text:
          "You see that single‑detector coding is like giving each object a private, fragile star, while population coding is like a team where many players help in many games, so patterns and redundancy make the code flexible and resilient.",
      },
      context: {
        title: "Localist versus distributed representations",
        text:
          "This step contrasts **localist representations** (single‑detector, “grandmother cells”) with **distributed representations** (population codes).\n\n" +
          "Distributed codes let neurons participate in multiple representations, improving capacity, generalisation, and robustness to noise compared with strictly one‑to‑one mappings.",
      },
    },
    {
      name: "Step 3 – How Many Things Can a Brain Hold?",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You open a drawer labelled “100 neurons only” and imagine two designs: in the single‑detector scheme, each new object demands its own brand‑new private neuron and you know unused neurons are limited, while in the population scheme each neuron can be reused in many different patterns so that combinations of activity stand for different things.\n\n" +
          "If you only have 100 neurons, which code lets you represent many more than 100 different things?",
        options: ["The team‑pattern population code.", "The one‑neuron‑per‑thing single‑detector code."],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You picture a row of 100 lockers: in one plan each thing needs its own personal locker and you run out when all are used, in the other plan you use different combinations of lockers being open or shut to stand for many more codes than the number of lockers.\n\n" +
          "Do you now agree that patterns let you outgrow the neuron count, or that patterns never let you go past the neuron count?",
        options: [
          "Patterns let you outgrow the neuron count.",
          "Patterns never let you go past the neuron count.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Combinatorial explosion",
        text:
          "You realise that single‑detector codes scale only linearly with neuron number, while combinatorial patterns across many neurons can explode the number of distinct representations beyond the raw neuron count.",
      },
      context: {
        title: "Combinatorial capacity of population codes",
        text:
          "This riddle highlights the **combinatorial capacity** of population codes.\n\n" +
          "With 100 neurons, binary patterns already allow astronomically many possible activity combinations, far exceeding 100 one‑to‑one detectors. Distributed representation allows brains to encode vast stimulus spaces with limited neural resources.",
      },
    },
    {
      name: "Step 4 – Noise, Fragility, and the Shield of Many",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "Walking past humming equipment, you remember that real neurons are noisy and fragile—on any day a few may fire a bit too much or too little, and over a lifetime some will die.\n\n" +
          "You lay out three tiles of story and must arrange them into a cause → effect chain:",
        elements: [
          "On any day, a few neurons may be noisy or fail, so their signals are not perfectly reliable.",
          "Each stimulus is coded by many neurons at once, so no single neuron carries the entire message by itself.",
          "The whole neuron team can still make a clear pattern, because most neurons still respond correctly, so the brain keeps recognising the stimulus.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You ask yourself which must happen first: that neurons are sometimes noisy and fail, or that the brain decides to use many neurons at once, and which sounds like the final result: a problem description, or the happy ending where the brain still recognises the stimulus.\n\n" +
          "Do you now choose problem → design choice → good result, or good result → problem → design choice?",
        options: [
          "Problem → design choice → good result.",
          "Good result → problem → design choice.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Why crowds protect codes",
        text:
          "You see that unreliability comes first, then the brain’s design choice to use many neurons at once, and only then the payoff: a clear, recognisable pattern despite a few misbehaving cells.",
      },
      context: {
        title: "Error‑tolerant coding through redundancy",
        text:
          "This illustrates **error‑tolerant coding** through redundancy.\n\n" +
          "Biological neurons are stochastic and can fail, so population coding mitigates this by distributing information across many partially independent units. Robust pattern recognition emerges from averaging and majority voting among noisy elements.",
      },
    },
    {
      name: "Step 5 – What Each Pattern Buys You",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You sit before a wall of neuron‑activity maps and four little scenes on the left, and four advantages of population coding on the right.\n\n" +
          "Match each scene with the advantage it most clearly demonstrates.",
        left: [
          "Two faces look almost the same, but small differences in the pattern across many neurons still let you tell them apart.",
          "One neuron that used to help with “dog” dies, but the rest of the pattern for DOG is still mostly there.",
          "The brain needs to represent “red apple”, “green apple”, and “red ball” without needing a brand‑new neuron for every new combination.",
          "The same set of neurons helps with sights, sounds, and ideas at different times, instead of being locked forever into one fixed thing each.",
        ],
        right: [
          "Re‑using neurons in many different patterns lets you represent huge numbers of combinations.",
          "Sharing neurons across many tasks saves space and lets the brain flexibly reuse the same hardware.",
          "Fine‑grained patterns across many neurons allow tiny differences to be noticed.",
          "Spreading information over many neurons makes the code robust when some neurons fail.",
        ],
        // mapping[i] is index in right[] that correctly matches left[i]
        mapping: [2, 3, 0, 1],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Whenever you read “tiny differences between similar things,” which phrase on the right sounds closest in spirit—“fine‑grained patterns” or “robust when some neurons fail”?",
        options: ["Fine‑grained patterns.", "Robust when some neurons fail."],
        correctIndex: 0,
      },
      explanation: {
        title: "A bundle of advantages",
        text:
          "You recognise that distinguishing almost‑identical faces needs fine‑grained patterns, surviving a dead neuron needs robustness, combining features like colour and shape needs vast combinations, and sharing one pool of neurons across many jobs needs flexible reuse.",
      },
      context: {
        title: "Benefits of population coding",
        text:
          "This step unpacks multiple benefits of population coding: **high‑resolution** discrimination, **fault tolerance**, **combinatorial feature binding**, and **resource sharing**.\n\n" +
          "Neural populations can simultaneously support robustness, capacity, and flexibility by reusing units in different activity patterns.",
      },
    },
    {
      name: "Step 6 – Only One Story Fits",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "By now you’ve written in your notebook: single‑detector coding is fragile and limited—one neuron per thing, easy to lose—while population coding is robust, flexible, and combinatorial—patterns across many neurons can survive noise, share neurons, and encode many combinations.\n\n" +
          "You are handed four claims and told only one matches this story without sneaking in extra assumptions. Which single statement do you circle?",
        statements: [
          "If the brain used one detector neuron for each thing, losing one neuron would usually only slightly blur our memory of that thing.",
          "Population coding lets the brain represent many more things than it has neurons, by using different patterns of activity across the same neurons.",
          "Population coding is weaker than single‑detector coding because sharing neurons always makes memories clash and disappear.",
          "Single‑detector neurons are more robust to damage, because every important thing has its own private, perfectly protected cell.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You remember your light‑bulb robot and ask: when you shared bulbs in many patterns, did that make it easier or harder to run out of codes, and does that sound more like “many more things than neurons” or “always fewer things than neurons”?",
        options: [
          "Sharing lets you code more things than neurons.",
          "Sharing forces you to code fewer things than neurons.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "The one story that fits",
        text:
          "You see that only the statement about population coding allowing many more things than neurons fits everything you’ve seen about robustness and combinatorial capacity.",
      },
      context: {
        title: "High‑capacity distributed representation",
        text:
          "This minefield points to **distributed, high‑capacity representation** as the central virtue of population coding.\n\n" +
          "Localist schemes cannot exceed the number of neurons, whereas distributed patterns support exponentially many distinct states. The correct statement mirrors results from neural coding theory and connectionist models.",
      },
    },
    {
      name: "Step 7 – Why Brains Choose Crowds",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Leaning back, you list the brain’s three big problems: neurons are noisy and can die; the world has huge numbers of possible stimuli and combinations; and different stimuli often share features.\n\n" +
          "Thinking about these three problems, do you believe patterns across many neurons help with all three, or with none of them?",
        options: [
          "Patterns help with all three problems—noise and death, shared features, and too many things for too few neurons.",
          "Patterns help with none of the three problems.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You ask yourself again: if neurons are fragile, features repeat across objects, and the space of possible things is huge, is it better to rely on single‑detector neurons or on shared patterns across many neurons?",
        options: [
          "Shared patterns across many neurons.",
          "Single‑detector neurons for each thing.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Real pressures, real solutions",
        text:
          "You realise that robust patterns, feature reuse and enormous pattern capacity directly answer the brain’s three challenges, while one‑neuron‑per‑thing actually makes neuron death more dangerous, not safer.",
      },
      context: {
        title: "Why evolution favoured population codes",
        text:
          "This step links **computational advantages** of population codes to concrete biological constraints.\n\n" +
          "Redundancy combats noise and cell death, shared feature neurons enable compositional representations, and combinatorial coding addresses the huge dimensionality of sensory spaces. These pressures likely drove the evolution of distributed neural representations.",
      },
    },
    {
      name: "Step 8 – Judge or Jury?",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "At the end of the day, you sketch a final metaphor: a single‑detector neuron is like one judge whose yes/no decides everything about one thing, while a population code is like a jury, where a pattern of many votes together decides what is there.\n\n" +
          "You have seen that the jury style is more robust, can represent more things, and can mix features flexibly.\n\n" +
          "Thinking of what the brain has to do, when someone asks whether each important thing has one magic neuron that decides it or is coded by a pattern across many neurons that work together, what do you say?",
        options: [
          "One magic “judge” neuron per thing is the main way the brain works.",
          "Patterns of activity across many “jury” neurons together say what is there.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine the “judge” neuron for your favourite person’s face suddenly dying and compare that to a jury where many neurons share the job, so the pattern still makes sense even when one juror is missing.\n\n" +
          "Does it feel safer with a sharing jury or safer with a single fragile judge?",
        options: ["Safer with a sharing jury.", "Safer with a single fragile judge."],
        correctIndex: 0,
      },
      explanation: {
        title: "Brains trust juries",
        text:
          "You finally accept that brains trust juries, not lone judges: they rely on patterns across many neurons to store and recognise the world in a way that survives noise, death, and overload.",
      },
      context: {
        title: "From grandmother cells to population codes",
        text:
          "This closing riddle summarises the contrast between **localist “grandmother cell” models** and **population coding**.\n\n" +
          "Empirical and theoretical work suggest that most meaningful representations in cortex are distributed across many neurons, conferring robustness, flexibility, and combinatorial power.",
      },
    },
  ],
  endScreen: {
    title: "The Brain’s Choice",
    text:
      "Your night in the lab ends: light‑bulb robots dim, neuron maps fade from the screens, and you close your notebook on a simple verdict.\n\n" +
      "Again and again you saw that lone detectors are fragile and small, while crowds of neurons—patterns, teams, juries—are resilient and vast.\n\n" +
      "You’ve walked through the logic of **population coding** and **distributed representation**: they guard against noise and neuron death, explode storage capacity, reuse shared features, and let the brain carve tiny differences in a huge, overlapping world.\n\n" +
      "The brain does not trust a single voice—it listens to the **choir**.",
  },
};

// Excitation–inhibition balance & inhibitory control (English)
const inhibitionSequence = {
  title: "Quiet Guards – Why the Brain Needs Inhibition",
  introSlides: [
    {
      type: "intro",
      title: "The Quiet Brakes",
      text:
        "Neurons flash like city lights in the dark, tiny sparks jumping from cell to cell.\n\n" +
        "If the brain’s job is to send signals, why does it spend so much effort *stopping* them?\n\n" +
        "How can something whose whole purpose is to talk so loudly rely on constant, invisible “shushing” to stay sane?",
    },
    {
      type: "intro",
      title: "You Enter",
      text:
        "Your name is **Mika**.\n\n" +
        "You walk through a living brain as if through a glowing city, watching some cells push their neighbours to fire and others hold them back.\n\n" +
        "You don’t worship silence or noise—you only care which patterns carry *meaning*.\n\n" +
        "Your task: decide when the brain should unleash activity, and when it must **inhibit** it.",
    },
  ],
  steps: [
    {
      name: "Step 1 – All Lights or Hidden Letters?",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You stand in front of a brain area where each neuron either pushes its neighbours to fire or pulls them back, and you see messages carried not by “all on” but by patterns of some neurons lit and others quiet, like different letters made of light bulbs on a sign.\n\n" +
          "When every neuron fires at once the pattern collapses into a single blinding flash.\n\n" +
          "When the head scientist asks you how this area should behave to carry clear messages, what do you answer?",
        options: [
          "We must keep some neurons held back so patterns stand out.",
          "The more neurons fire at once, the clearer the message.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine a huge screen where every pixel is driven to pure white at the same time, wiping out all contrast and shape.\n\n" +
          "Looking at that blank white field, do you say it still shows a detailed picture, or that all the shapes vanish into nothing but brightness?",
        options: [
          "It still shows a detailed picture.",
          "All the shapes vanish into nothing but brightness.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Information lives in differences",
        text:
          "You realise that information lives in **differences**, not in raw intensity: if every neuron fires together, the pattern of “this on, that off” disappears, just like letters vanish on a sign when every bulb is lit.\n\n" +
          "Inhibition keeps some neurons quiet so the active ones actually **spell a message**.",
      },
      context: {
        title: "Patterns, not “all on”",
        text:
          "This illustrates **population coding and contrast**: neural information is carried by distributed patterns of activity across many neurons, not by global “all on” firing.\n\n" +
          "Without inhibition, excitation alone would drive everything toward uniform activation, destroying those patterns. Balanced excitation–inhibition allows **sparse, structured activity** that can encode useful signals.",
      },
    },
    {
      name: "Step 2 – Two Baskets of Trouble",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "Walking further, you carry two invisible baskets in your hands: Basket 1 for situations where the main danger is **too little firing** (you need excitation to boost or start activity) and Basket 2 for situations where the main danger is **too much or wrongly placed firing** (you need inhibition to quiet or shape activity).\n\n" +
          "Using only the idea “is the problem that firing is too weak and needs boosting, or that it is too strong or in the wrong channels and needs quieting?”, sort each situation into the basket where it belongs.",
        baskets: ["Needs more excitation (signal too weak)", "Needs inhibition / quieting (signal too strong or misplaced)"],
        items: [
          {
            label: "Yanking your hand from a hot stove before it burns.",
            correctBasketIndex: 0,
          },
          {
            label: "Trying to hear one friend’s voice in a noisy cafeteria.",
            correctBasketIndex: 1,
          },
          {
            label: "Drifting toward sleep as daytime chatter in your head must fade.",
            correctBasketIndex: 1,
          },
          {
            label: "Trying to notice a dim star in the sky from a weak retinal signal.",
            correctBasketIndex: 0,
          },
          {
            label: "Hearing a sudden loud sound from the fridge that shouldn’t make you jump every time.",
            correctBasketIndex: 1,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You focus on the cafeteria scene again: you’re straining to follow one friend’s voice while many other conversations roar around you.\n\n" +
          "To help yourself, would you rather make all conversations louder, including the distracting ones, or quiet down the distracting channels so the one voice stands out?",
        options: [
          "Make all conversations louder.",
          "Quiet down the distracting channels so the one voice stands out.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "When you need more, when you need less",
        text:
          "You notice that some tasks fail because **signals are too weak or too slow**, like pulling your hand away or detecting a dim star, where you want more excitation, but other tasks fail because **too many signals compete or linger**, like focusing in noise, falling asleep, or ignoring the fridge, where inhibition must carve away excess or misplaced activity.",
      },
      context: {
        title: "Matching problems to excitation or inhibition",
        text:
          "This step contrasts conditions where **excitatory drive** is crucial (fast reflexes, sensitivity to weak inputs) with conditions where **inhibitory control** is crucial (selective attention, sleep onset, suppression of unnecessary reactions).\n\n" +
          "The brain must constantly balance excitation and inhibition to match the demands of the situation. This is part of the broader concept of **excitation–inhibition balance in neural circuits**.",
      },
    },
    {
      name: "Step 3 – Sharpening the Spotlight",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You look at a sheet of cortex where one tight cluster of neurons carries a wanted signal and neighbouring clusters carry background chatter, and the circuit is wired so that when the signal cluster turns on, it sends inhibition sideways to those neighbours, pushing their activity down and quieting their noise.\n\n" +
          "When the lab asks for your judgement, do you say this added inhibition makes the wanted signal clearer, by quieting nearby noise and increasing contrast, or makes things more muddled, by randomly turning off more neurons?",
        options: [
          "It makes the wanted signal clearer, by quieting nearby noise and increasing contrast.",
          "It makes things more muddled, by randomly turning off more neurons.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You picture a stage where the actors stay lit while you dim the lights only in the background and wings around them.\n\n" +
          "In that theatre, does it become easier to see who is on stage, or harder because everything is darker?",
        options: ["Easier to see who is on stage.", "Harder, because everything is darker."],
        correctIndex: 0,
      },
      explanation: {
        title: "Dim the background, not the actors",
        text:
          "You see that targeted inhibition doesn’t randomly erase information; it **cuts down the noise** around a signal, much like dimming background lights so the actors stand out.\n\n" +
          "The signal pops out of the silence precisely because its competitors are pushed down.",
      },
      context: {
        title: "Lateral inhibition and contrast enhancement",
        text:
          "This illustrates **lateral inhibition and contrast enhancement** in neural circuits.\n\n" +
          "Active neurons can recruit inhibitory interneurons that suppress neighbouring activity, improving the signal‑to‑noise ratio. Such mechanisms are crucial in systems like vision and audition for sharpening edges, tuning receptive fields, and enhancing **selectivity**.",
      },
    },
    {
      name: "Step 4 – Storm Without Brakes",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "Deeper in, you see a small network where excitation spreads from neuron to neuron like sparks jumping across dry grass, and inhibition is the only thing that normally stops the chain reaction.\n\n" +
          "Now someone has removed the inhibitory neurons, so one strong excitatory spark in one spot can spread almost everywhere and the network is at risk of falling into a single roaring storm instead of precise patterns.\n\n" +
          "Arrange the three tiles in cause → effect order.",
        elements: [
          "A single strong excitatory signal starts in one spot, but there are no inhibitory neurons to contain it.",
          "Because nothing stops the spread, more and more neurons join in until almost the whole area fires together.",
          "The network can no longer form precise patterns; it falls into a kind of “storm” where all signals blur into one big surge.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You ask yourself which must logically come first: the very first local spark starting in one corner of the network, or almost the whole area already firing together like a storm.\n\n" +
          "Do you now place first the local spark, then the spread, then the storm, or the global storm first and only afterwards the single spark?",
        options: ["Spark → spread → storm.", "Storm → spread → spark."],
        correctIndex: 0,
      },
      explanation: {
        title: "Runaway excitation without brakes",
        text:
          "You realise that without inhibition, one local burst of excitation can **snowball** as more neurons join in, until the whole area fires together and any fine‑grained pattern is washed out.\n\n" +
          "The storm is not the cause but the **end result** of uncontained spreading activity.",
      },
      context: {
        title: "Preventing runaway activity",
        text:
          "This step shows how inhibition prevents **runaway excitation** and supports **stable, patterned dynamics**.\n\n" +
          "Without inhibitory feedback, recurrent excitatory networks are prone to global activation, reminiscent of epileptic seizures. Inhibitory circuits act as brakes that allow local activation without triggering a system‑wide storm.",
      },
    },
    {
      name: "Step 5 – Jobs of the Silent Guards",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You enter a control hall where four different scenes play at once on the left, and four job descriptions of inhibition appear on the right.\n\n" +
          "Match each scene with the inhibitory role that best explains it.",
        left: [
          "A small group of neurons coding where you’re looking suppresses other direction‑codes so only one direction wins.",
          "Overall brain activity is kept in a safe range, never exploding into seizure‑like firing even when many inputs arrive.",
          "Waves of inhibition make groups of neurons fire in rhythmic pulses, as if clapping in time.",
          "When you decide to move your eyes, signals to eye muscles are allowed through while competing motor commands are held back at the gate.",
        ],
        right: [
          "Global safety brake that keeps total activity within limits.",
          "Winner‑take‑all selection that helps one option beat competitors.",
          "Timing control that creates brain rhythms and synchrony.",
          "Gatekeeper that lets chosen pathways through and blocks others.",
        ],
        // mapping[i] is index in right[] that correctly matches left[i]
        mapping: [1, 0, 2, 3],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You zoom in on the first scene, where just one direction of gaze should win and all competing direction‑codes are pushed down by inhibition.\n\n" +
          "In that kind of competition, is inhibition acting more like a single “volume knob for everything” or a “competition judge” that lets one option beat the rest?",
        options: ["A single volume knob for everything.", "A competition judge between options."],
        correctIndex: 1,
      },
      explanation: {
        title: "Many masks of inhibition",
        text:
          "You see that inhibition wears different masks: sometimes it globally caps activity, sometimes it makes one pattern beat others, sometimes it paces firing into rhythms, and sometimes it acts as a gate that lets only selected commands through.\n\n" +
          "All these roles rely on the same basic power—making some neurons less likely to fire when others are active.",
      },
      context: {
        title: "Roles of inhibitory control",
        text:
          "This step summarises several classic roles of inhibition: **global gain control**, **winner‑take‑all competition**, **oscillatory timing**, and **selective gating**.\n\n" +
          "Inhibitory interneurons shape both the **amplitude** and **pattern** of neural activity. Such diversity of inhibitory functions is central to theories of **cortical computation and network stability**.",
      },
    },
    {
      name: "Step 6 – What Inhibition Is Not",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You sit at a desk covered in notes: inhibition helps avoid runaway activity, sharpens contrast between signals and noise, allows some pathways to pass while blocking others, and helps create useful timing patterns.\n\n" +
          "Yet four bold statements stare up at you and only one fits what you’ve seen. Which one do you choose?",
        statements: [
          "If you removed all inhibition, the brain would simply become faster and smarter, because nothing would ever slow signals down.",
          "Inhibition is useful mainly because it completely silences the whole brain every few seconds, so that neurons can rest.",
          "Inhibition helps the brain carry more information by shaping where and when neurons fire, instead of just blocking signals everywhere.",
          "Inhibition is only there to stop movement; it has no role in perception, attention, or thinking.",
        ],
        correctIndex: 2,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You think about a good editor who cuts sentences and paragraphs from a draft.\n\n" +
          "Does that editor’s job make the author say less by cutting away everything important, or say more clearly the things that matter by removing what gets in the way?",
        options: [
          "Say less by cutting away everything important.",
          "Say more clearly the things that matter by removing what gets in the way.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "An editor, not a mute button",
        text:
          "You realise inhibition is not a blunt off‑switch; like a skilled editor, it removes and reshapes activity so the remaining patterns are clearer, safer, and more informative.\n\n" +
          "Removing it would not make the brain smarter—it would make it **noisy, unstable, and confused**.",
      },
      context: {
        title: "Inhibition as a computational resource",
        text:
          "This step emphasises that inhibition is a **computational resource**, not mere suppression.\n\n" +
          "By shaping spatial and temporal patterns of firing, inhibition increases the brain’s **effective information capacity** and prevents catastrophic over‑excitation. It is involved in perception, attention, cognition, and motor control alike.",
      },
    },
    {
      name: "Step 7 – Real Causes of a Needed Brake",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Looking over the whole glowing network, you focus on this effect: a brain with balanced excitation and inhibition can send rich, precise, and safe signals, while a brain with only excitation quickly becomes noisy, unstable, and unselective.\n\n" +
          "Thinking about this, do you believe inhibition helps create that good outcome, or that it gets in the way of it?",
        options: [
          "Inhibition helps, by both capping overall activity and sculpting which patterns win.",
          "Inhibition gets in the way; a brain without it would send better signals.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You ask yourself: if the brain wants to send different messages over time, does it need a mechanism that treats all inputs identically so no pattern ever stands out, or one that boosts some and suppresses others so some patterns win and others fade?",
        options: [
          "Treat all inputs identically so no pattern ever stands out.",
          "Boost some and suppress others so some patterns win and others fade.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Stability and selectivity",
        text:
          "You see that inhibition is essential because it both **caps overall activity**, preventing storms, and **sculpts competition** so some patterns win cleanly instead of everything blurring together.",
      },
      context: {
        title: "Why balanced inhibition is necessary",
        text:
          "This step highlights two key contributions of inhibition: **stabilisation** (maintaining activity within safe bounds) and **selectivity** (supporting discriminative pattern formation).\n\n" +
          "Together, these allow complex networks to be both **responsive** and **stable**.",
      },
    },
    {
      name: "Step 8 – Choosing the Better Brain",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "At the end of your walk, two imagined brains are placed before you: Brain X has only excitation, so any active neuron just pushes others to fire and signals always spread and never get blocked, while Brain Y has both excitation and well‑placed inhibition, so it can **start signals, stop them, shape them, and keep overall activity stable**.\n\n" +
          "You care only about which brain can carry many different messages over time without collapsing into chaos or silence. Which brain do you choose as better for sending useful signals?",
        options: [
          "Brain Y: excitation plus inhibition, so signals can be started, shaped, and safely limited.",
          "Brain X: only excitation, so signals always spread and never get blocked.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You picture two telephone networks: one where every phone call automatically connects to every phone at once so every line rings with every message, and one where calls are directed and limited to specific lines that need them.\n\n" +
          "If you want clear conversations instead of constant noise, do you choose the one huge call where every phone rings for every message, or the network where calls go only to selected phones?",
        options: [
          "One huge call where every phone rings for every message.",
          "A network where calls go only to selected phones.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Better signalling with brakes",
        text:
          "You understand that a brain without inhibition is like a phone system where every call floods every line—no message can stay **targeted**.\n\n" +
          "Only a brain that can both excite and inhibit can route, shape, and stabilise signals so they remain meaningful over time.",
      },
      context: {
        title: "Excitation–inhibition balance for signalling",
        text:
          "This final step ties together the concept of **excitation–inhibition balance** as a precondition for functional signalling.\n\n" +
          "Inhibition enables routing, contrast, stability, and timing, all of which are essential for rich neural codes. Brains that lack inhibition are associated with pathological dynamics such as seizures and uncontrollable noise.",
      },
    },
  ],
  endScreen: {
    title: "Why the Brain Wants Its Own Brake",
    text:
      "Your walk through the brain‑city ends: you’ve watched sparks spread, storms build, and quiet guards step in to tame them.\n\n" +
      "Again and again, you chose to **hold some neurons back** so the patterns of activity stayed sharp, stable, and selective, instead of dissolving into one blazing surge.\n\n" +
      "You’ve seen that inhibition is not the enemy of signalling but its partner—sharpening contrasts, preventing runaway excitation, gating pathways, pacing rhythms, and keeping total activity safe.\n\n" +
      "In technical terms, you’ve explored **excitation–inhibition balance, lateral and global inhibition, winner‑take‑all selection, gating, and stabilising feedback**—the quiet forces that make neural communication **possible instead of chaotic**.",
  },
};

// Emergent brain rhythms & local rules (English)
const emergentRhythmsSequence = {
  title: "The Yard, the Loop, the Rhythm – How Local Rules Build Brain Beats",
  introSlides: [
    {
      type: "intro",
      title: "Where Does the Music Come From?",
      text:
        "You stand in a dark hall of screens where brain waves ripple like wind over grass, rising and falling in rhythms no single cell seems to control.\n\n" +
        "Each neuron only sees its tiny neighbours—yet whole storms of activity appear.\n\n" +
        "Where does the music come from if no one holds the baton?",
    },
    {
      type: "intro",
      title: "You Enter the Lab",
      text:
        "You are **Mira**, a quiet watcher in a lab of humming machines.\n\n" +
        "You don’t believe in magic—only in rules: who listens to whom, who excites, who silences.\n\n" +
        "Tonight your task is simple: follow those tiny local rules, step by step, and decide *how* they can build the brain’s global dances.",
    },
  ],
  steps: [
    {
      name: "Step 1 – Waves in a Leaderless Yard",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You stand by a huge school yard where every child follows one stubborn rule—“I clap only when both my neighbours clap”—and there is no teacher shouting “now!” and no big clock telling them when to start, just kids watching the two beside them.\n\n" +
          "If this is the only rule, and no one is in charge, do you say it is *impossible* for the whole yard to fall into waves or a shared rhythm, or that such yard-wide clapping patterns can still appear from this neighbour-copy rule?",
        options: [
          "No, without a leader or big clock, only random noise can happen.",
          "Yes, local “copy your neighbours” rules can sometimes create yard-wide patterns.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "For a moment you see four kids in a row clap together by chance, and then each surrounding child follows the rule “clap when both neighbours clap,” so that little patch can tug its neighbours into sync instead of vanishing.\n\n" +
          "Knowing this, do you still say such a patch must fade into randomness, or admit it can spread into a visible wave across the yard?",
        options: [
          "Such a patch must fade into randomness.",
          "It can spread into a visible wave across the yard.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Leaderless waves",
        text:
          "You realise that once a small region falls into sync, the neighbour-copy rule lets that pattern travel and grow.\n\n" +
          "The rhythm lives in the *network of children plus rule*, not in any single “boss.”",
      },
      context: {
        title: "Emergence in coupled systems",
        text:
          "This illustrates **emergence in coupled systems**: simple local update rules (“copy your neighbours”) can lead to global patterns such as waves or synchrony.\n\n" +
          "No central controller is required; the pattern is a property of the interaction network. Similar ideas appear in models of **cellular automata** and **synchronizing oscillators**.",
      },
    },
    {
      name: "Step 2 – What One Neuron Knows",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You now shrink into a brain, where each neuron only “sees” its own input spikes and the chemicals at its synapses, never the whole brain at once, and you carry two baskets: Basket L – Local neuron rules that can be done with only a neuron’s own inputs and state, and Basket G – Global brain rules that would need information about the entire network.\n\n" +
          "For each rule you hear—(1) “a neuron fires when enough of its input neurons are active at the same time”, (2) “a loudspeaker in the skull shouts ‘all neurons, fire now at 40 Hz!’ and every neuron hears it”, (3) “a synapse gets stronger when the sending and receiving neurons are active together many times in a row”, (4) “one special ‘brain manager’ neuron reads the activity of all other neurons and tells each one when to spike”, (5) “a neuron slowly becomes less excitable when it fires too often, because its own ion channels change”—you quietly place it into Basket L or Basket G.",
        baskets: ["Basket L – Local neuron rules", "Basket G – Global brain rules"],
        items: [
          {
            label: "A neuron fires when enough of its input neurons are active at the same time.",
            correctBasketIndex: 0,
          },
          {
            label: "A loudspeaker in the skull shouts “all neurons, fire now at 40 Hz!” and every neuron hears it.",
            correctBasketIndex: 1,
          },
          {
            label:
              "A synapse gets stronger when the sending and receiving neurons are active together many times in a row.",
            correctBasketIndex: 1,
          },
          {
            label:
              "One special “brain manager” neuron reads the activity of all other neurons and tells each one when to spike.",
            correctBasketIndex: 0,
          },
          {
            label:
              "A neuron slowly becomes less excitable when it fires too often, because its own ion channels change.",
            correctBasketIndex: 1,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Take any rule you were unsure about and imagine a single neuron with only its incoming spikes and its own membrane and synapses in view.\n\n" +
          "Can that neuron apply the rule just by looking at its own inputs and internal machinery (then it belongs in Basket L), or would it need to somehow “know” what all the other neurons are doing at once (then it belongs in Basket G)?",
        options: [
          "The rule can be applied using only local inputs and state, so it belongs in Basket L.",
          "The rule needs information about the whole network, so it belongs in Basket G.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "What counts as local",
        text:
          "You see that local rules depend only on signals that actually land on a neuron or synapse and on its own state, while global rules secretly assume some impossible broadcast or all-seeing element.\n\n" +
          "Real neurons implement only the local kind, so any story that needs “the whole brain state at once” is biologically suspicious.",
      },
      context: {
        title: "Local versus global control",
        text:
          "This step contrasts **local update rules** (based on a neuron’s inputs and internal biophysics) with hypothetical **global control rules**.\n\n" +
          "Actual neurons can only use local information to decide when to spike or change synapses. Emergent brain dynamics must therefore arise from the composition of these local rules, not from any neuron accessing the full network state.",
      },
    },
    {
      name: "Step 3 – A World with Only “Go”",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now watch two imaginary brain-worlds: in World X, every connection is excitatory, so neurons only make others more likely to fire, and in World Y, there are both excitatory and inhibitory neurons, with inhibition making targets less likely to fire, while all still follow the local rule “sum inputs and spike if the total is big enough.”\n\n" +
          "If you must pick which world is more likely to settle into organised rhythms or patterns instead of either exploding in endless firing or fading to silence, do you choose the pure-“go” world X, or the balanced “go–stop” world Y?",
        options: [
          "World X, with only excitation and no inhibition.",
          "World Y, with both excitation and inhibition.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Imagine every neuron in a network keeps making others more active, with nothing anywhere that ever pushes activity down; is it easier or harder for such a system to avoid runaway firing and empty calm and instead land in a stable, repeating rhythm?",
        options: [
          "Easier to avoid runaway firing and silence and find a stable rhythm.",
          "Harder to avoid extremes; without inhibition it tends to blow up or die out.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Why “go” needs “stop”",
        text:
          "You see that excitation alone tends to blow activity up or let it die, while inhibition provides the opposing force needed to shape and limit activity.\n\n" +
          "Balanced “go” and “stop” together can form the up–down cycles that look like clean patterns and oscillations.",
      },
      context: {
        title: "Excitation–inhibition balance",
        text:
          "This highlights the role of **excitation–inhibition (E–I) balance** in neural circuits.\n\n" +
          "Networks with both excitatory and inhibitory interactions can support stable, structured dynamics, including oscillations. Purely excitatory networks are typically unstable, tending toward runaway activity or quiescence.",
      },
    },
    {
      name: "Step 4 – The Little Loop that Beats",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "You zoom in on a tiny circuit where a clump of excitatory neurons is tightly connected to a clump of inhibitory neurons, all obeying “sum inputs, fire past threshold; inhibition subtracts from excitation,” and you lay out three tiles of their story:\n\n" +
          "• Excitatory neurons start firing together and drive the inhibitory neurons harder.\n" +
          "• Inhibitory neurons fire strongly and shut down the excitatory neurons for a short while.\n" +
          "• As excitatory neurons fall silent, inhibitory neurons also quiet down, so excitatory cells can slowly build up to firing again.\n\n" +
          "As Mira, you must arrange these into the causal order that produces a repeating up–down rhythm in this loop—what sequence do you build in your mind?",
        elements: [
          "Excitatory neurons start firing together and drive the inhibitory neurons harder.",
          "Inhibitory neurons fire strongly and shut down the excitatory neurons for a short while.",
          "As excitatory neurons fall silent, inhibitory neurons also quiet down, so excitatory cells can slowly build up to firing again.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Ask yourself: can inhibitory neurons strongly shut down excitation before they have been driven hard by excitatory firing, or must the excitatory burst come first to wake inhibition, which then pushes excitation down and later fades so excitation can rise again?",
        options: [
          "Inhibition can shut down excitation before excitation has ever driven it.",
          "Excitation must first drive inhibition, which then suppresses excitation before both quiet down.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "The E–I loop as an oscillator",
        text:
          "You realise the rhythm comes from a loop: excitation surges and drives inhibition, inhibition then suppresses excitation, and once both calm down, excitation slowly grows again.\n\n" +
          "This delayed push–pull cycle repeats, creating a local oscillation even though each neuron follows only simple local rules.",
      },
      context: {
        title: "E–I feedback loops and oscillations",
        text:
          "This is a classic **E–I feedback loop** generating oscillations.\n\n" +
          "Excitatory activity recruits inhibition, inhibition suppresses excitation, and their different time scales create recurrent cycles. Such motifs underlie many observed brain rhythms, including gamma oscillations in cortical circuits.",
      },
    },
    {
      name: "Step 5 – Shapes on the Neural Map",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You step back to survey different network-wide patterns: A – a small group of neurons stays active together while most others stay quiet, like a stable “cell assembly”; B – a bump of activity slowly moves across the network, like a wave rolling over cortex; C – fast, regular oscillations (for example in the gamma range) appear in a local circuit; D – several different rhythms (slow and fast) run at the same time in partly overlapping brain areas.\n\n" +
          "On your notepad you also list local wiring features: 1 – neurons arranged in a chain or ring, each exciting the next, with inhibition keeping the bump narrow so it can move; 2 – a tight loop of excitatory and inhibitory neurons with very short delays and strong feedback; 3 – clusters of neurons with stronger mutual excitation inside the cluster and inhibition that targets neurons outside the cluster; 4 – different subnetworks with different connection strengths and time constants, so their “go–stop” loops naturally beat at different speeds—and you must match each pattern (A–D) to the local feature (1–4) that best produces it.",
        left: [
          "A small group of neurons stays active together while most others stay quiet, like a stable “cell assembly”.",
          "A bump of activity slowly moves across the network, like a wave rolling over cortex.",
          "Fast, regular oscillations appear in a local circuit.",
          "Several different rhythms (slow and fast) run at the same time in partly overlapping brain areas.",
        ],
        right: [
          "Neurons arranged in a chain or ring, each exciting the next, with inhibition keeping the bump narrow so it can move.",
          "A tight loop of excitatory and inhibitory neurons with very short delays and strong feedback.",
          "Clusters of neurons with stronger mutual excitation inside the cluster and inhibition that targets neurons outside the cluster.",
          "Different subnetworks with different connection strengths and time constants, so their “go–stop” loops naturally beat at different speeds.",
        ],
        // mapping[i] is index in right[] that correctly matches left[i]
        mapping: [2, 0, 1, 3],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "For each pattern, ask yourself first what it looks like: a single stable clump, a moving clump, one very fast beat, or several beats at once, and then check whether the local wiring you chose naturally gives that behaviour—a ring for a moving bump, or different time scales for different rhythms, and so on.\n\n" +
          "Does a ring with inhibition more naturally give you a moving bump, and do different time-scales naturally give you multiple rhythms?",
        options: [
          "Yes, those local motifs line up with the patterns you see.",
          "No, local motifs and global patterns have nothing to do with each other.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "From wiring to patterns",
        text:
          "You discover that different global patterns come from specific local motifs: self-exciting clusters plus outside inhibition hold assemblies, chains and lateral inhibition move bumps, tight fast E–I loops make rapid oscillations, and subnetworks with varied time constants support multiple rhythms.",
      },
      context: {
        title: "Network motifs and emergent activity",
        text:
          "This step links **network motifs** to emergent activity patterns.\n\n" +
          "Different connectivity structures—clusters, rings, E–I microcircuits, and heterogeneous subnetworks—naturally generate cell assemblies, traveling waves, fast local rhythms, and multi-frequency dynamics. It shows how changing local wiring can reshape global brain activity.",
      },
    },
    {
      name: "Step 6 – Where the Pattern Lives",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You now remember that each neuron only obeys simple local rules—summing inputs, spiking past threshold, changing synapse strength based on local activity—while EEG and brain scans show large-scale rhythms and patterns, even though no neuron can see the whole brain.\n\n" +
          "You must pick the one statement that fits this: 1 – “Emergent patterns mean there is a hidden ‘conductor neuron’ that secretly tells everyone when to fire”; 2 – “Emergent patterns are just random noise; they only look organised because we draw lines on the graph”; 3 – “Emergent patterns are global rhythms or structures that come out of many neurons following local rules and interacting, without any one neuron holding the whole pattern”; 4 – “Emergent patterns are stored outside the brain, in the air around the head, and neurons just read them out”—which do you choose?",
        statements: [
          "Emergent patterns mean there is a hidden “conductor neuron” that secretly tells everyone when to fire.",
          "Emergent patterns are just random noise; they only look organised because we draw lines on the graph.",
          "Emergent patterns are global rhythms or structures that come out of many neurons following local rules and interacting, without any one neuron holding the whole pattern.",
          "Emergent patterns are stored outside the brain, in the air around the head, and neurons just read them out.",
        ],
        correctIndex: 2,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Imagine a big oscillating network where you quietly remove just one neuron: does the rhythm usually vanish completely and forever, or does it often keep going with only a slight change in shape—what does that suggest about whether the whole pattern lives in one neuron or in the web of interactions?",
        options: [
          "The whole rhythm must live in a single special neuron.",
          "The pattern must be a property of the whole web of interacting neurons.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Patterns of the whole network",
        text:
          "You see that if patterns survived the loss of any single neuron, they cannot be stored in a lone “conductor” nor be pure illusion or ghostly outside fields.\n\n" +
          "They must arise from the collective behaviour of many locally interacting neurons.",
      },
      context: {
        title: "Emergent patterns in networks",
        text:
          "This defines **emergent patterns** as properties of the network as a whole, not of individual units.\n\n" +
          "Global rhythms and structures in neural systems arise from interactions among many simple elements. The concept is central to **complex systems theory** and to understanding neural oscillations as collective phenomena.",
      },
    },
    {
      name: "Step 7 – Why the Brain Loves Oscillations",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You focus on one observed effect: in a healthy brain, certain networks often show fairly regular oscillations—alpha, beta, gamma—when they work on tasks or rest, even though there is no giant central metronome, only local E–I loops, synapses and neurons with different time-scales, and partly shared inputs nudging many cells together.\n\n" +
          "You are given four possible causes and must choose only the true ones: A – local feedback loops of excitation and inhibition, with small delays, naturally create up–down cycles in activity; B – many neurons receive partly shared inputs, so their local loops can become loosely synchronized and show a common rhythm; C – a single “clock neuron” sits in the middle of the brain and directly times every spike of every other neuron; D – oscillations only appear because scientists smooth data on their computers; they are not present in the real network at all—which causes do you keep?",
        options: [
          "A and B are real causes; C and D are not.",
          "C and D are real causes; A and B are not.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Given everything you’ve seen about E–I loops and shared inputs, is it more consistent to think that rhythms come from many small circuits interacting and nudging each other into sync, or from one magic neuron that must fire perfectly on time for the entire brain, or from graphs that somehow fake patterns that don’t exist?",
        options: [
          "They come from many small circuits interacting and nudging each other into sync.",
          "They come from one magic neuron or from graphs that fake patterns.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Real causes of brain beats",
        text:
          "You understand that local E–I feedback creates the basic beats, and shared inputs help align them across cells, so no single master clock or purely illusory smoothing is needed.",
      },
      context: {
        title: "Local circuits and shared input",
        text:
          "This step attributes brain oscillations to **local circuit dynamics** and **partial synchronisation via common input**.\n\n" +
          "Excitatory–inhibitory loops generate rhythmic activity, and shared drives can align phases across neurons. It rejects explanations based on a single pacemaker neuron or purely artefactual data processing.",
      },
    },
    {
      name: "Step 8 – The Source of the Brain’s Music",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You gather your notes: simple local rules in neurons and synapses can create big patterns like clapping waves; real brains use local rules such as input summation, E–I balance, and local synaptic plasticity; local E–I loops plus delays can make rhythms, different loops and time-scales can give different rhythms, and shared inputs can loosely sync them into larger oscillations.\n\n" +
          "Given all this, when someone asks where global brain rhythms really come from, do you answer that they are decided by a single neuron or tiny group that directly controls everyone else, or that they are emergent, arising from many neurons and synapses following simple local rules and influencing each other?",
        options: [
          "Global brain rhythms are decided by a single neuron or tiny group that directly controls everyone else.",
          "Global brain rhythms are emergent: they arise from many neurons and synapses following simple local rules and influencing each other.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Suppose you slowly change the strengths of many synapses across the network—without touching any special “boss” neuron—and watch the global rhythms gradually change with the wiring; does that fit better with the idea of a single ruler neuron, or with patterns that live in the whole changing network?",
        options: [
          "It fits better with a single ruler neuron controlling everything.",
          "It fits better with patterns that live in the whole changing network.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Patterns without a king",
        text:
          "You recognise that if changing many local connections reshapes the rhythms, those rhythms must be properties of the entire interaction web, not decisions handed down by one tiny centre.\n\n" +
          "The brain’s music is not played by a single king cell but by countless simple voices locked together by the rules between them.",
      },
      context: {
        title: "Emergent network dynamics",
        text:
          "This final step reinforces the idea of **emergent network dynamics**.\n\n" +
          "Global oscillations and patterns in the brain depend on distributed connectivity and local plasticity rules. They are not located in a single structure but arise from the cooperative behaviour of many elements.",
      },
    },
  ],
  endScreen: {
    title: "The Yard, the Loop, the Rhythm",
    text:
      "Your night in the lab ends: the clapping yard, the tiny E–I loops, and the rolling waves across cortex all fade from the screens.\n\n" +
      "You’ve seen that each neuron lives a small life, summing inputs, firing, and changing synapses with no view of the whole, yet together they weave yard-wide patterns, moving bumps, and layered rhythms.\n\n" +
      "This journey has named the key ideas of **local vs global rules**, **excitation–inhibition balance**, **E–I loops as oscillators**, and **emergent network dynamics**.\n\n" +
      "The brain’s music, you now know, is not played by a single king cell—but by countless simple voices, locked together by the rules between them.",
  },
};

// Relative coding & normalization (English)
const contrastNormalizationSequence = {
  title: "Walking the Edge of Contrast – How the Brain Measures Difference",
  introSlides: [
    {
      type: "intro",
      title: "The Loudness That Moves",
      text:
        "The same beep, the same square of light, the same bite of chocolate.\n\n" +
        "Sometimes they hit you like a shout in the dark; sometimes they vanish into noise and glare.\n\n" +
        "If nothing “out there” changes, why does your *experience* swing so wildly?\n\n" +
        "What is your brain really measuring?",
    },
    {
      type: "intro",
      title: "You Enter the Lab of Comparisons",
      text:
        "You walk through a small sensory lab with clear eyes and curious ears.\n\n" +
        "Your name is **Mira**; you trust what you *feel*, but you also trust quiet logic.\n\n" +
        "Your job is simple: watch beeps, lights, and voices move against their backgrounds, and decide what your brain is truly trying to keep steady.",
    },
  ],
  steps: [
    {
      name: "Step 1 – One Beep, Two Worlds",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "At night you lie in a silent bedroom, and your phone plays a short beep at a certain loudness into your ears and brain; the next day you stand in a noisy playground full of shouting kids while the very same phone plays the same beep to the same you—only the background sound has changed.\n\n" +
          "When a friend asks which place that identical beep *feels* louder to you, what do you say?",
        options: [
          "It feels equally loud in both; only its own physical loudness matters.",
          "It feels much louder in the silent bedroom than in the noisy playground, because your brain compares it to the background.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You replay the two moments in your mind: in the dark bedroom the beep cuts through stillness like a pin-drop, in the playground it is half-swallowed by shrieks and traffic.\n\n" +
          "In which place does the beep stand out more above everything else?",
        options: [
          "In the noisy playground.",
          "In the silence of the bedroom.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Loudness as contrast",
        text:
          "You notice that what matters to your experience is not just the beep’s raw energy but how much it rises above the background, so in silence it feels louder than in noise even though the physical beep is the same.",
      },
      context: {
        title: "Context-dependent perception",
        text:
          "This step introduces **context-dependent perception**: subjective loudness depends on contrast with the background, not only on physical intensity.\n\n" +
          "The brain performs **relative coding**, judging a stimulus against its context. This is a foundation for later ideas like **contrast** and **normalization** in sensory systems.",
      },
    },
    {
      name: "Step 2 – Machines and Comparers",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You now treat your brain as a comparer and carry two baskets: Basket 1 “Mostly absolute—context doesn’t change the judgment much” and Basket 2 “Mostly relative—the judgment shifts when the background changes”, while you examine five scenes: a small lamp that looks bright in a dark room but weak on a sunny balcony, a doctor’s thermometer measuring your body temperature, a chocolate that tastes very sweet after plain bread but not so sweet after sugary soda, a scale measuring your weight in kilograms, and a whisper that feels loud in a quiet library but barely noticed at a rock concert.\n\n" +
          "Using only the idea “absolute vs. relative to context”, how do you quietly drop each situation into Basket 1 or Basket 2?",
        baskets: [
          "Basket 1 – Mostly absolute (context changes little)",
          "Basket 2 – Mostly relative (judgment shifts with context)",
        ],
        items: [
          {
            label: "A small lamp that looks bright in a dark room but weak on a sunny balcony.",
            correctBasketIndex: 1,
          },
          {
            label: "A doctor’s thermometer measuring your body temperature.",
            correctBasketIndex: 0,
          },
          {
            label:
              "A chocolate that tastes very sweet after plain bread but not so sweet after sugary soda.",
            correctBasketIndex: 1,
          },
          {
            label: "A scale measuring your weight in kilograms.",
            correctBasketIndex: 0,
          },
          {
            label:
              "A whisper that feels loud in a quiet library but is barely noticed at a rock concert.",
            correctBasketIndex: 1,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You look at the thermometer in a loud, bright ER and in a calm, dim bedroom, and notice that for the same body temperature it shows the same number even though the surroundings change.\n\n" +
          "Does a thermometer show a different reading just because the room is louder or brighter?",
        options: [
          "Yes, it changes with the room’s noise or brightness.",
          "No, it shows the same temperature for the same body, regardless of the surroundings.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Absolute machines, relative brains",
        text:
          "You realize that tools like thermometers and scales use fixed units, so their readings are mostly absolute, while your brain often changes its judgment—brightness, sweetness, loudness—as the background shifts.",
      },
      context: {
        title: "Absolute devices vs relative judgments",
        text:
          "This step contrasts **absolute measurement devices** (thermometers, scales) with **relative neural judgments** (perceived brightness, sweetness, loudness).\n\n" +
          "Many perceptual systems encode stimuli relative to recent or surrounding context. This distinction underlies ideas like **adaptation**, **contrast**, and **context effects** in neuroscience and psychology.",
      },
    },
    {
      name: "Step 3 – The Special Pixel",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now imagine a single “brain cell” watching one tiny spot on the retina: it should fire strongly when that spot is special, meaning brighter than what’s around it, but the whole scene’s background brightness can swing from very dark to very bright.\n\n" +
          "You compare two possible rules—Rule 1: “Fire based only on the absolute brightness at that point”, and Rule 2: “Fire based on how much brighter than the local background that point is”.\n\n" +
          "If you want this neuron to keep saying “this spot is special” even when the whole screen gets brighter or darker together, which rule do you choose?",
        options: [
          "Rule 1 – Fire based only on absolute brightness at that point.",
          "Rule 2 – Fire based on how much brighter the spot is than the local background.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Picture the whole image getting brighter by the same amount at every pixel: the special spot and its neighbours are all lifted together.\n\n" +
          "In that case, does the difference between the special spot and its neighbours stay about the same, or disappear completely?",
        options: [
          "It stays about the same.",
          "It disappears completely.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Why contrast beats raw intensity",
        text:
          "You see that if the neuron tracks only absolute brightness, its signal will rise and fall with the whole scene and lose what’s special, but if it tracks the *difference* from neighbours, the spot can still stand out across different overall light levels.",
      },
      context: {
        title: "Contrast coding",
        text:
          "This riddle points to **contrast coding**: neurons often respond to differences from local background, not raw intensity.\n\n" +
          "Using relative rules makes representations robust to global changes, like overall illumination. This is a basic motivation for operations like **center-surround receptive fields** and, later, **normalization**.",
      },
    },
    {
      name: "Step 4 – When the Crowd Grows Loud",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "You now picture a small group of neurons looking at one patch of visual space: when the background gets brighter, all of them become more active together, and without adjustment their activity can grow so large that responses saturate.\n\n" +
          "The brain uses a trick called **normalization**, where each neuron’s response is scaled by the overall activity of the group so things don’t max out.\n\n" +
          "As Mira, you lay three tiles on the table and must put them in causal order:\n\n" +
          "• Tile A: “The background brightness rises, so many neurons in the area become more active together.”\n" +
          "• Tile B: “The network uses a ‘normalization’ step: each neuron’s response is scaled down based on the average activity of its neighbours.”\n" +
          "• Tile C: “Even though everything got brighter, the neuron for the ‘special spot’ still stands out compared to the others.”",
        elements: [
          "The background brightness rises, so many neurons in the area become more active together.",
          "The network uses a “normalization” step: each neuron’s response is scaled down based on the average activity of its neighbours.",
          "Even though everything got brighter, the neuron for the “special spot” still stands out compared to the others.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Ask yourself: can the brain rescale a pattern because many neurons are very active together, or must it somehow rescale them before it notices that overall activity is high?\n\n" +
          "Do you place first the tile where it senses that many neurons are highly active, or the one where it rescales them before sensing anything?",
        options: [
          "First sense that many neurons are highly active, then rescale them.",
          "First rescale them, then sense that many neurons are highly active.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Why normalization comes after crowding",
        text:
          "You arrange the story as: first the background makes many neurons fire more, then normalization scales their responses based on group activity, and then the “special” neuron can still stand out after rescaling.",
      },
      context: {
        title: "Divisive normalization",
        text:
          "This step illustrates **divisive normalization**: neuron outputs are adjusted by a measure of pooled activity in their neighbourhood.\n\n" +
          "Normalization prevents saturation and preserves relative differences when global drive changes. It’s a common computational motif in visual cortex and other sensory systems.",
      },
    },
    {
      name: "Step 5 – Same Note, Different Stage",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You now imagine a target neuron whose job is to say “this thing stands out”, and you compare four situations where the physical stimulus is the same but the backgrounds differ: a grey square on a very dark screen, the same grey square on a very bright screen, a medium-loud voice in total silence, and the same medium-loud voice in a very noisy factory.\n\n" +
          "On another page you list four possible responses—a very strong response (“this stands out a lot”), a moderate response (“it stands out a bit”), a very weak response (“almost blends into the background noise”), and almost no response (“the neuron barely notices it”).\n\n" +
          "Assuming the brain uses relative coding with normalization, how do you match each situation to the most sensible response pattern—so that the same grey or voice gets a stronger response when the background is dim/quiet and a weaker response when the background is bright/noisy?",
        left: [
          "A grey square on a very dark screen.",
          "The same grey square on a very bright screen.",
          "A medium-loud voice in total silence.",
          "The same medium-loud voice in a very noisy factory.",
        ],
        right: [
          "A very strong response (“this stands out a lot”).",
          "A moderate response (“it stands out a bit”).",
          "A very weak response (“almost blends into the background noise”).",
          "Almost no response (“the neuron barely notices it”).",
        ],
        // mapping[i] is index in right[] that correctly matches left[i]
        mapping: [0, 2, 1, 3],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Focus on the medium-loud voice: imagine hearing it once in a quiet bedroom and once in a roaring factory.\n\n" +
          "In which place would your “stands-out” neuron fire more strongly?",
        options: [
          "In the noisy factory.",
          "In the quiet room.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Same input, different salience",
        text:
          "You align strong responses with high contrast (grey on dark, voice in silence) and weak responses with low contrast (grey on bright, voice in noise), seeing that the same physical stimulus drives different neural strengths depending on how much it rises above the background.",
      },
      context: {
        title: "Salience and context",
        text:
          "This step shows how **normalization and contrast coding** transform identical stimuli into different response magnitudes depending on context.\n\n" +
          "Neural responses encode **salience**—how much a stimulus stands out relative to its surround—rather than just raw intensity. This supports robust perception across varying ambient conditions.",
      },
    },
    {
      name: "Step 6 – What Normalization Really Keeps",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You now define **normalization** more precisely in your notes: each neuron’s activity is adjusted using the overall activity of its group—if everyone is very active, each one is scaled down; if everyone is quiet, each one can be scaled up—so that the **ratios** between neurons matter more than the absolute numbers.\n\n" +
          "You face four claims about what this does. Which single statement do you, Mira, accept as correct?",
        statements: [
          "Normalization makes all neurons have exactly the same activity, so nothing can stand out.",
          "Normalization lets the pattern of “who is stronger than whom” stay similar, even when the overall background level changes.",
          "Normalization deletes the background completely, so the brain no longer knows how bright or loud the scene is.",
          "Normalization only works if the background never changes, so it is useless when contexts differ.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine dividing every neuron’s response by the same big number and notice that each one shrinks, but their relative sizes remain.\n\n" +
          "When you do that, do the ratios between neurons stay the same, or change randomly?",
        options: [
          "The ratios stay the same.",
          "The ratios change randomly.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Preserving the pattern",
        text:
          "You realize normalization changes overall scale but preserves the pattern of which neurons are stronger or weaker, so contrast relationships survive even when the global level swings.",
      },
      context: {
        title: "Gain control and stable coding",
        text:
          "Normalization is a **gain-control** mechanism: it adjusts overall response magnitude while preserving relative structure.\n\n" +
          "This keeps coding stable under global changes in input strength. The important information lies in the **pattern**, not the absolute firing rates.",
      },
    },
    {
      name: "Step 7 – Why Normalization Helps",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now write down the outcome you care about: “Thanks to normalization, the brain can keep using the same code for a stimulus even when the whole scene gets brighter, darker, louder, or noisier,” and you test four possible causes:\n\n" +
          "1) Normalization keeps the network from saturating when everything gets strong at once, so neurons still have room to respond differently.\n" +
          "2) Normalization forces every neuron to always fire at exactly the same rate, no matter what happens outside.\n" +
          "3) Normalization makes neurons care mostly about **differences and ratios**, not raw physical size, so the same contrast pattern maps to a similar response pattern.\n" +
          "4) Normalization tells each neuron to ignore its neighbours completely and act as if it were alone.\n\n" +
          "Which description best captures the real reasons normalization helps the brain keep a stable code across changing backgrounds?",
        options: [
          "Because (1) and (3) are true while (2) and (4) are false.",
          "Because all four (1), (2), (3), and (4) are true.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You return to your “special spot” neuron and ask: to know whether its spot is special, does it need to look only at its own absolute activity, or also compare itself to its neighbours’ activity?",
        options: [
          "Look only at its own absolute activity.",
          "Also compare itself to its neighbours’ activity.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Preventing saturation and preserving ratios",
        text:
          "You keep (1) because preventing saturation leaves space for differences, and (3) because focusing on ratios preserves contrast patterns, but you discard (2) and (4) since making all rates equal or ignoring neighbours would destroy the very contrasts normalization is meant to protect.",
      },
      context: {
        title: "Why normalization is useful",
        text:
          "This step clarifies why normalization is useful: it **prevents saturation** and shifts coding toward **relative differences**.\n\n" +
          "It does not erase contrast or decouple neurons; instead, it uses pooled activity to stabilize representation. These properties explain how the same physical stimulus can be encoded similarly across changing backgrounds.",
      },
    },
    {
      name: "Step 8 – The Thing That Stays the Same",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You review your journey: the same beep, light, or taste can feel different in different contexts; the brain often uses **relative coding**, comparing inputs to their background; normalization rescales responses based on neighbours so that **contrast patterns are preserved** even as overall levels change.\n\n" +
          "You now ask what the brain is really trying to keep steady. When you write your final sentence, do you say the brain tries to keep the exact physical value (exact loudness or brightness) of each stimulus the same inside, no matter the background, or the **relationship** between stimulus and background—how much it stands out—similar, even when the overall level changes?",
        options: [
          "The exact physical value of each stimulus, regardless of background.",
          "The relationship between stimulus and background—how much it stands out—across backgrounds.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Imagine you dim an entire screen but keep one spot a bit brighter than its neighbours: the photons at that spot are fewer than before, but its edge against the surround is still sharp.\n\n" +
          "Does your brain care more about the exact number of photons at that spot, or how much brighter it is than what’s around it?",
        options: [
          "The exact number of photons at that spot.",
          "How much brighter it is than what’s around it.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Preserving contrast, not raw magnitude",
        text:
          "You see that perception follows contrast: the brain preserves “how much this stands out” rather than the raw physical magnitude, so the same pattern of relationships can survive across wildly different backgrounds.",
      },
      context: {
        title: "Relative, contrast-based coding",
        text:
          "This final step summarizes **relative, contrast-based coding** and the role of **normalization**.\n\n" +
          "Neural systems aim to keep **informative relationships** stable, not raw intensities. This explains why the same stimulus can feel different in different contexts, yet still carry a consistent *meaning* inside the brain.",
      },
    },
  ],
  endScreen: {
    title: "Walking the Edge of Contrast",
    text:
      "Your walk through the lab ends: the beep in the bedroom, the grey square on bright and dark screens, the voice in silence and in a factory all blur into one insight.\n\n" +
      "You have watched neurons compare each signal to its background, rescaling themselves so that what *stands out* stays visible even as the world brightens, darkens, quiets, or roars.\n\n" +
      "Behind it all lie the ideas of **relative coding**, **contrast**, and **divisive normalization**—mechanisms that protect patterns and relationships when raw intensities are unreliable.\n\n" +
      "Your senses, you now know, are less rulers of absolute strength and more storytellers of difference.",
  },
};

// Change detection & efficient coding (English)
const changeDetectionSequence = {
  title: "The Quiet Background, The Loud Change – Why the Brain Loves Differences",
  introSlides: [
    {
      type: "intro",
      title: "The World That Only Moves",
      text:
        "A room hums with lights, fans, fridge, distant traffic.\n\n" +
        "Most of it never changes, yet your brain barely notices it.\n\n" +
        "But the tiniest new hiss or crack makes you turn your head.\n\n" +
        "If the world is mostly steady, why does your mind care so fiercely about what breaks the pattern?",
    },
    {
      type: "intro",
      title: "You Enter",
      text:
        "Your name is **Mira**.\n\n" +
        "You’re a quiet watcher of rooms, streets, and signals, more curious than afraid.\n\n" +
        "You trust your senses, but you’ve started to notice they wake up for changes and grow sleepy with sameness.\n\n" +
        "Tonight, your task is simple: follow what your own brain chooses to highlight—and judge *why*.",
    },
  ],
  steps: [
    {
      name: "Step 1 – The Smell That Matters",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You stand in a kitchen where the air has smelled the same for ten long minutes, calm and familiar, when suddenly a sharp new smell of smoke slips in from the hall, and you remember your brain cannot track every tiny detail at once, only a few things that might matter.\n\n" +
          "In that moment, when you decide where to focus your attention, do you care more about the steady smell from 10 minutes ago, or the sudden new smell of smoke right now?",
        options: [
          "The steady smell from 10 minutes ago.",
          "The sudden new smell of smoke right now.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine ignoring the fresh smoke and thinking only, “Well, ten minutes ago it smelled fine in here,” while the new smell grows stronger.\n\n" +
          "Which smell actually tells you that something new and possibly dangerous is happening now?",
        options: [
          "The old background smell.",
          "The sudden smoke.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Why change wins",
        text:
          "You realize the old smell carries no new information, while the sudden smoke is a change that might signal fire, so your brain treats it as more urgent.\n\n" +
          "The past baseline is context; the new difference is warning.",
      },
      context: {
        title: "Change detection",
        text:
          "This step introduces **change detection**: nervous systems prioritize new or changing stimuli over constant background input.\n\n" +
          "Absolute past values are less informative than current deviations that may signal danger or opportunity. This is a foundation for understanding why the brain emphasizes differences over static levels.",
      },
    },
    {
      name: "Step 2 – Alarms and Meters",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You sit at a workbench with two labeled trays: Tray 1 – “Change detectors” that react when something changes, and Tray 2 – “Absolute value meters” that keep telling you the exact level all the time.\n\n" +
          "In front of you are five devices: a fire alarm that rings when smoke appears, a thermometer showing exact temperature, a motion-sensor light that turns on when you move, a ruler measuring length, and a security camera that only records when something moves.\n\n" +
          "Using only the idea “Does this mostly shout ‘Something just changed!’ or calmly report ‘Here is the exact value’?”, how do you sort each device into Tray 1 or Tray 2?",
        baskets: ["Tray 1 – Change detectors", "Tray 2 – Absolute value meters"],
        items: [
          {
            label: "A fire alarm that rings when smoke appears.",
            correctBasketIndex: 0,
          },
          {
            label: "A thermometer showing exact temperature.",
            correctBasketIndex: 1,
          },
          {
            label: "A motion-sensor light that turns on when you move.",
            correctBasketIndex: 0,
          },
          {
            label: "A ruler measuring length.",
            correctBasketIndex: 1,
          },
          {
            label: "A security camera that only records when something moves.",
            correctBasketIndex: 0,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You pick up just the fire alarm and hold it to your ear: it stays silent for hours, then suddenly screams when smoke appears.\n\n" +
          "Does this behave more like a device measuring exact smoke level all the time, or a device that mainly shouts when smoke starts or changes?",
        options: [
          "A device measuring exact smoke level all the time.",
          "A device that mainly shouts when smoke starts or changes.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Alarms versus meters",
        text:
          "Devices like the fire alarm, motion light, and motion-only camera stay quiet until something changes, while the thermometer and ruler keep reporting exact values even if nothing changes.\n\n" +
          "So the first group are “change detectors”, and the second are “absolute value meters”.",
      },
      context: {
        title: "Event-triggered vs continuous measurement",
        text:
          "This step contrasts **event-triggered detectors** with **continuous measurement devices**.\n\n" +
          "Change detectors emphasize *differences over time* (onset, motion), whereas meters track **absolute values** regardless of change. The brain’s sensory systems are more similar to event detectors than to constant meters.",
      },
    },
    {
      name: "Step 3 – Your Brain’s Favorite Tool",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine your own brain has to choose one “job” while using limited energy: it could act like a ruler that constantly reports exact levels of light, sound, and smell even when nothing changes, or like a fire alarm that mostly reacts with strong signals when something changes.\n\n" +
          "When you think about how tired your attention feels and how strongly you react to new events, which picture fits your brain better?",
        options: [
          "The always-reporting ruler.",
          "The mostly-quiet fire alarm that bursts into activity at changes.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You picture a ruler shouting every millisecond, “Still 24.000 cm, still 24.001 cm…”, never resting, versus a fire alarm that stays silent until real smoke appears.\n\n" +
          "If your brain tried to measure everything exactly, all the time, would it save energy—or quickly run out of energy and attention, making the change-focused alarm picture more realistic?",
        options: [
          "Measuring everything exactly all the time would save energy.",
          "Measuring everything exactly all the time would quickly run out of energy and attention.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Why brains act like alarms",
        text:
          "A ruler-style brain would waste energy broadcasting constant, boring sameness, while an alarm-style brain can stay mostly quiet and shout only when something changes.\n\n" +
          "Your real brain behaves much more like a change detector than a perfect continuous meter.",
      },
      context: {
        title: "Efficient coding and resource limits",
        text:
          "This riddle highlights the brain’s **resource constraints** and preference for **efficient coding**.\n\n" +
          "Instead of tracking all absolute levels continuously, neural systems emphasize changes that carry more information per unit of energy. This aligns with theories of **sparse coding** and **information efficiency** in sensory processing.",
      },
    },
    {
      name: "Step 4 – The Fading Smell",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "You walk into a room where a new smell appears and then simply stays the same, and at first the neurons in your nose fire strongly but, as they get used to it, they slow down, until finally your brain mostly stops sending signals about that smell even though the air hasn’t changed.\n\n" +
          "As Mira, when you lay out the tiles:\n\n" +
          "• Tile B: “The smell begins and then stays the same in the room.”\n" +
          "• Tile A: “Neurons in your nose fire strongly at first, then more slowly as they get used to the smell.”\n" +
          "• Tile C: “Your brain mostly stops sending signals about that smell.”\n\n" +
          "In what time order do you arrange them to make the story flow?",
        elements: [
          "The smell begins and then stays the same in the room.",
          "Neurons in your nose fire strongly at first, then more slowly as they get used to the smell.",
          "Your brain mostly stops sending signals about that smell.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Ask yourself: can your nose neurons “get used to” a smell before the smell appears, or must the smell first arrive and stay, then the neurons calm down, and only then does your brain stop signaling it?",
        options: [
          "The smell must arrive and stay, then neurons adapt, then the brain stops signalling it.",
          "Neurons adapt and the brain stops signalling before the smell arrives.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Adaptation needs a steady input",
        text:
          "First the smell must appear and remain in the room, then your nose neurons fire strongly and slowly adapt, and only after this adaptation does your brain largely stop signaling the unchanged smell.\n\n" +
          "The fading signal is an effect of continuous, unchanging input.",
      },
      context: {
        title: "Sensory adaptation",
        text:
          "This step illustrates **sensory adaptation**: neural responses are strong at onset and weaken when a stimulus remains constant.\n\n" +
          "The sequence “constant input → neural adaptation → reduced central signaling” is a standard pattern in sensory systems. It explains why persistent, unchanging stimuli often fade from conscious awareness.",
      },
    },
    {
      name: "Step 5 – When the World Jumps vs When It Stays",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You sit in a dark room when someone suddenly switches on a very bright light; later, soft background music plays for a long time without changing; you remember the first moment you put on a T-shirt and feel the cloth on your skin; and then a ball suddenly flies toward your face, making you flinch.\n\n" +
          "Match each situation with the brain reaction that best fits what your brain actually tends to do.",
        left: [
          "The room is dark, then someone suddenly switches on a very bright light.",
          "Soft background music plays for a long time and doesn’t change.",
          "You put on a T-shirt and feel the cloth on your skin.",
          "A ball suddenly flies toward your face.",
        ],
        right: [
          "Brain mostly ignores the steady touch so attention is free for other things.",
          "Brain keeps strong “act now!” signals going while the danger is happening.",
          "Brain slowly reduces the signals, so after a while you hardly notice it.",
          "Brain gives a sharp, strong burst of signals to the sudden change.",
        ],
        // mapping[i] is index in right[] that correctly matches left[i]
        mapping: [3, 2, 0, 1],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Think just about the ball flying toward your face: your body jerks and stays tense until it’s safe.\n\n" +
          "Does your brain treat this more like a short, harmless background you can fade out, or an urgent danger where strong “move now!” signals must stay active while it lasts?",
        options: [
          "A short, harmless background you can fade out.",
          "An urgent danger where strong “move now!” signals must stay active.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Bursts for jumps, fading for steady",
        text:
          "Sudden changes like bright light or a fast ball trigger sharp bursts or urgent sustained signals, while steady, harmless inputs like background music or clothes are gradually turned down or ignored.\n\n" +
          "Your brain saves its loudest reactions for changes and threats, not for safe, stable sensations.",
      },
      context: {
        title: "Transient versus sustained responses",
        text:
          "This step maps concrete situations onto **transient vs sustained** neural responses and **threat monitoring**.\n\n" +
          "Sudden onsets evoke strong phasic responses; ongoing benign stimuli are subject to adaptation or suppression. Urgent, potentially harmful events maintain high-priority signals to drive rapid action.",
      },
    },
    {
      name: "Step 6 – The Brain’s Energy Budget",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You now know that signals in the brain cost energy, most of the world around you stays roughly the same for long stretches, and the most useful news often comes when something changes.\n\n" +
          "Which single statement best explains why the brain cares more about differences and changes than about absolute values?",
        statements: [
          "Because the brain cannot sense anything that stays the same.",
          "Because sending signals about every unchanging detail would waste energy and clog the brain’s “wires”.",
          "Because changes only happen when someone is watching.",
          "Because changes are always dangerous, and steady things are always safe.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Look for the statement that talks about saving energy and not sending the same boring message again and again about things that haven’t changed.\n\n" +
          "Which option is really about avoiding wasted signaling?",
        options: ["A", "B", "C", "D"],
        correctIndex: 1,
      },
      explanation: {
        title: "Energy and information",
        text:
          "The brain can sense steady things, and not all changes are dangerous, but constantly broadcasting unchanging details would waste energy and bandwidth.\n\n" +
          "Focusing signals on changes is a way to compress information and use limited resources efficiently.",
      },
      context: {
        title: "Efficient, energy-limited coding",
        text:
          "This step captures the principle of **efficient coding** and **energy-limited signaling** in neural systems.\n\n" +
          "Neurons reduce redundancy by emphasizing changes or prediction errors instead of absolute, unchanging input. This allows the brain to represent more useful information with fewer spikes and less metabolic cost.",
      },
    },
    {
      name: "Step 7 – Why the Brain Became a Change Detector",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You list four possible reasons your brain evolved to notice differences and changes:\n\n" +
          "1) The body has limited energy for sending brain signals.\n" +
          "2) Most useful information for survival comes from changes in the environment.\n" +
          "3) The brain likes to be bored, so it ignores new things.\n" +
          "4) Ignoring steady, harmless inputs leaves more space for important events.\n\n" +
          "Which combination really explains why your brain is built as a change detector?",
        options: [
          "1 and 3 only.",
          "2 and 4 only.",
          "1, 2, and 4.",
          "1 and 4 only.",
        ],
        correctIndex: 2,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Read them again: which statements talk about limited energy, changes carrying useful new information, and freeing attention by ignoring harmless steady inputs, instead of pretending the brain just “likes being bored”?",
        options: ["A", "B", "C", "D"],
        correctIndex: 2,
      },
      explanation: {
        title: "Real pressures for change detection",
        text:
          "Limited energy (1), the special usefulness of changes (2), and the benefit of ignoring safe, steady inputs to free up space (4) all push the brain toward change detection, while “liking boredom” (3) does not explain anything.\n\n" +
          "So 1, 2, and 4 together give the real cause.",
      },
      context: {
        title: "Metabolic, informational, and attentional drivers",
        text:
          "This step combines **metabolic constraints**, **information value**, and **attentional selection** as drivers of sensory adaptation and change sensitivity.\n\n" +
          "Brains evolved under energy limits, where constant signaling of stable inputs is costly and uninformative. Focusing on changes improves survival by highlighting events that may require action.",
      },
    },
    {
      name: "Step 8 – The Brain as a Guard, Not a Meter",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You have seen that neurons fire strongly at changes, then calm down if stimuli stay the same, saving energy and freeing attention for new events, and that your senses behave like alarms and filters rather than like perfect rulers.\n\n" +
          "Thinking about all the steps, which is the better picture of your brain— a machine that constantly reports exact brightness, sound, and touch levels even when nothing changes, or a smart guard that mostly reports when things change or become different from before?",
        options: [
          "A machine that constantly reports exact levels even when nothing changes.",
          "A smart guard that mostly reports when things change or become different from before.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Remember how the smell faded, the clothes on your skin disappeared from awareness, and only sudden dangers kept strong signals.\n\n" +
          "In your own experience, does your brain feel more like a boring meter that never shuts up, or a guard who wakes up and shouts when something new happens?",
        options: [
          "A boring meter that never shuts up.",
          "A guard who wakes up and shouts when something new happens.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Guard over meter",
        text:
          "Across all your senses, constant, harmless inputs fade while changes and threats call out loudly, so the “guard who reacts to differences” picture fits far better than the “perfect meter” picture.\n\n" +
          "Your brain is tuned to differences, not to absolute levels.",
      },
      context: {
        title: "Difference detector, not absolute meter",
        text:
          "This final step summarizes the brain as a **difference detector** rather than an **absolute value meter**.\n\n" +
          "Sensory systems adapt to steady inputs, emphasize onsets and changes, and allocate resources according to information value and survival relevance. This is central to concepts like **sensory adaptation**, **change detection**, and **efficient coding** in neuroscience.",
      },
    },
  ],
  endScreen: {
    title: "The Quiet Background, The Loud Change",
    text:
      "Your walk through rooms of smells, lights, touches, and flying balls is over.\n\n" +
      "Again and again, you watched your own senses dim steady, harmless inputs and flare up when something shifted, threatened, or surprised you.\n\n" +
      "You’ve seen that the brain is energy-limited and information-hungry, so it prefers to signal **differences and changes** rather than repeat the same message about unchanging scenes.\n\n" +
      "This is the essence of **sensory adaptation**, **change detection**, and **efficient coding**: your nervous system is not a perfect meter of the world—it is a watchful guard tuned to what *just* became different.",
  },
};

// Multiplexed coding in a single pathway (English)
const multiplexedCodingSequence = {
  title: "Many Stories in One Line – Multiplexed Codes in a Single Pathway",
  introSlides: [
    {
      type: "intro",
      title: "One Line, Many Questions",
      text:
        "Your nerves fire in thin, silent wires under your skin; one path, one cable—yet somehow your brain knows what touched you, where, and how hard.\n\n" +
        "Is each path hiding extra layers of code, or are we simply missing how much a single line can say?",
    },
    {
      type: "intro",
      title: "You Enter the Spike Lab",
      text:
        "You are **Nira**, a quiet observer in a humming lab, watching screens filled with spikes and waves while people tap drums, shine lights, and brush your skin.\n\n" +
        "You don’t trust jargon, only what patterns you can see and what choices you make, and tonight your task is simple: decide what one pathway can truly carry.",
    },
  ],
  steps: [
    {
      name: "Step 1 – One Drum, Many Tongues",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "In a dark studio you sit with a single drum you can hit once per second, five times per second, or in special tap–tap–pause patterns, and your friend already knows that each of these patterns has been agreed to mean something different.\n\n" +
          "With just this one drum in your lap, when your friend is listening for those learned patterns, do you tell yourself that different patterns on the same drum can send many messages, or that one drum must always mean only one message?",
        options: [
          "Yes, different patterns on the same drum can send many messages.",
          "No, one drum must always mean only one message.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You tap once per second and your friend nods “start”, you switch to five taps per second and they move to “hurry”, and when you play tap–tap–pause they walk to “danger” exactly as planned.\n\n" +
          "Seeing them react differently to each learned pattern, do you now think one drum can carry many messages with patterns, or only a single message?",
        options: [
          "One drum can carry many messages with patterns.",
          "One drum can only ever send one message.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Channel versus code",
        text:
          "You realize the drum itself is just a channel, and by changing how often and in what rhythm you strike it, you and your friend can assign different meanings and use the same drum to talk about many things.",
      },
      context: {
        title: "Temporal patterns carry information",
        text:
          "This step illustrates that a **single physical channel** can carry multiple messages by using different **temporal patterns** rather than a single on/off signal.\n\n" +
          "In neuroscience this foreshadows **multiplexed coding**, where spike trains encode information not just by presence, but by rate and temporal structure.",
      },
    },
    {
      name: "Step 2 – Blink or Just Be",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You imagine one brain pathway like that drum and carry two invisible baskets in your mind—Basket 1 for “one thing can carry many messages with patterns over time” and Basket 2 for “one thing can only say a simple on/off message”—while you picture a light that can blink in Morse, a door that is just open or closed, a whistle that can toot long or short, a coin lying heads or tails, and a phone that can vibrate in different rhythms.\n\n" +
          "As Nira, for each item you quietly ask “can this make different patterns over time, or is it stuck as one fixed state?” and drop it into Basket 1 if it can pattern, or Basket 2 if it is just on/off.",
        baskets: [
          "Basket 1 – Many messages with patterns over time",
          "Basket 2 – Simple on/off only",
        ],
        items: [
          {
            label: "A light that can blink in Morse.",
            correctBasketIndex: 0,
          },
          {
            label: "A door that is just open or closed.",
            correctBasketIndex: 1,
          },
          {
            label: "A whistle that can toot long or short.",
            correctBasketIndex: 0,
          },
          {
            label: "A coin lying heads or tails.",
            correctBasketIndex: 1,
          },
          {
            label: "A phone that can vibrate in different rhythms.",
            correctBasketIndex: 0,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You replay each object: the blinking light, patterned whistle, and buzzing phone can dance through many sequences, while the door and the coin only sit as “this or that” with no rhythm to play with.\n\n" +
          "When something can make different time patterns, do you now treat it as belonging in the “many messages” basket, or in the “simple on/off” basket?",
        options: [
          "In the “many messages” basket.",
          "In the “simple on/off” basket.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Patterns multiply messages",
        text:
          "Things that can change in patterns over time—blinks, toots, vibration rhythms—can carry many different messages, while pure either/or states like open/closed or heads/tails can only speak a single simple bit.",
      },
      context: {
        title: "Binary states versus temporal patterns",
        text:
          "This step contrasts **binary state signals** with **temporally patterned signals**.\n\n" +
          "Systems that can vary over time can encode multiple distinct messages (a form of **temporal multiplexing**), whereas purely static binary variables can only represent one bit at a time.",
      },
    },
    {
      name: "Step 3 – Clicks That Tell Two Stories",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "On the screen you watch a neuron sending identical tiny “spikes” down one pathway—no spike is ever taller than another—but you see that it can send them faster or slower, and in special patterns like click–click–pause.\n\n" +
          "In this experiment “strong touch” makes the path fire very fast while “touch on the left” switches the pattern to a distinct click–click–pause shape.\n\n" +
          "When you think about this one pathway, do you decide that its spike speed can carry “how strong” while its pattern carries “where” at the same time, or that one pathway must carry either strength or place, but never both together?",
        options: [
          "Yes, its spike speed can carry “how strong” while its pattern carries “where” at the same time.",
          "No, one pathway must carry either strength or place, but never both together.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You notice that whenever the touch grows stronger the spikes crowd closer together, and whenever the touch is on the left their timing jumps into that recognisable click–click–pause rhythm, even though the spike size never changes.\n\n" +
          "Seeing speed reliably follow strength and pattern reliably follow side, do you now think one pathway is telling two things at once, or still only one?",
        options: [
          "It is telling two things at once.",
          "It is still only telling one thing.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Two stories in one train",
        text:
          "You see that even with identical spikes, a single pathway can use **rate** to code intensity and **temporal pattern** to code location, layering multiple messages without changing spike size.",
      },
      context: {
        title: "Rate and temporal coding together",
        text:
          "Neurons typically encode information using **rate coding** (spikes per second) and **temporal coding** (precise timing patterns), rather than spike amplitude.\n\n" +
          "This example shows **multiplexed neural coding**, where different stimulus dimensions (strength, position) are simultaneously represented via distinct aspects of a single spike train.",
      },
    },
    {
      name: "Step 4 – From Red Dot to Thought",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "You imagine a red dot suddenly appearing on the right side of your world (Tile Y: “something happens in the world, like a red dot appearing on the right”), a neuron that turns that event into spikes with a certain speed and time pattern and sends them down one pathway (Tile Z), and then a next brain area that reads those spikes and works out what happened, where, and how hard it was (Tile X).\n\n" +
          "As Nira, when you lay the tiles Y, Z, X in some order, in what causal chain do you arrange them so that the world event leads to spikes and then to understanding?",
        elements: [
          "Something happens in the world, like a red dot appearing on the right.",
          "A neuron turns that event into spikes with a certain speed and time pattern and sends them down one pathway.",
          "A next brain area reads those spikes and works out what happened, where, and how hard it was.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You ask yourself whether the brain can read spikes before the world event happens, or whether the neuron can send spikes before it has anything to encode.\n\n" +
          "Do you now place them as “world event → neuron makes spikes → next area reads them”, or in the reverse order?",
        options: [
          "World event → neuron makes spikes → next area reads them.",
          "Neuron makes spikes → next area reads them → world event happens.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Encoding follows the world, decoding follows encoding",
        text:
          "First something happens outside, then a neuron converts that event into a specific speed and pattern of spikes, and only after that can another brain area read those spikes to infer what, where, and how strong.",
      },
      context: {
        title: "From stimulus to code to readout",
        text:
          "This chain-builder reflects the basic **sensory processing pipeline**: external events are transduced into neural signals, which are then decoded by downstream structures.\n\n" +
          "The step emphasizes that **encoding (spikes)** must follow **stimulus occurrence**, and **decoding** follows encoding.",
      },
    },
    {
      name: "Step 5 – Four Questions, Four Tricks",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You picture one pathway whose spikes ride on top of a slow up-and-down wave and can change in four ways: the spikes can come faster or slower overall, they can bunch into a special short–short–long rhythm, they can shift a little earlier or later inside the slow repeating beat, and that slow wave itself can be present as a background rhythm the spikes always sit on.\n\n" +
          "As Nira, you match four questions—WHAT kind of thing it is, WHERE it is, HOW STRONG it is, and the BACKGROUND rhythm they ride on—to these four signal tricks, deciding which trick best answers which question.",
        left: [
          "WHAT kind of thing it is.",
          "WHERE it is.",
          "HOW STRONG it is.",
          "BACKGROUND rhythm they ride on.",
        ],
        right: [
          "Spikes bunch into a special short–short–long rhythm.",
          "Spikes shift a little earlier or later inside a slow repeating beat.",
          "Spikes come faster or slower overall.",
          "A slow up-and-down wave that spikes always sit on.",
        ],
        // mapping[i] is index in right[] that correctly matches left[i]
        mapping: [0, 1, 2, 3],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You think about everyday rhythms: when something gets stronger it usually shows up as “more per second”, when two things happen in different places they often mark different points in a beat, and when you clap a special pattern you recognise “what song” it is.\n\n" +
          "With that in mind, do you pair HOW STRONG with faster/slower, WHERE with earlier/later in the beat, WHAT with a distinct rhythm shape, and the BACKGROUND with the slow wave?",
        options: [
          "Yes, that pairing makes sense.",
          "No, that pairing does not make sense.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Dividing the work across code features",
        text:
          "You assign global speed to intensity, phase shifts within a beat to location, rhythm shape to identity, and the slow wave itself to background, letting each “part” of the spike train answer a different question.",
      },
      context: {
        title: "Components of a multiplexed code",
        text:
          "This step dissects a spike train into components: **overall firing rate**, **temporal patterning**, **phase relative to an oscillation**, and **oscillatory background**.\n\n" +
          "These map onto different informational roles, illustrating how neural circuits can **multiplex stimulus features** (identity, location, strength, context) in parallel along one pathway.",
      },
    },
    {
      name: "Step 6 – One Train, Many Codes",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You now read four claims about how one pathway could tell “what, where, how strong” all at once:\n\n" +
          "A) One spike for “what”, then after a long wait another spike for “where”, then a third for “how strong”, so they never mix.\n" +
          "B) Same-size spikes, using speed for “how strong”, pattern shape for “what”, and timing in a slow beat for “where”, all in one train.\n" +
          "C) Tiny, medium, and big spikes, each size meaning different mixtures of weak/strong/left/right.\n" +
          "D) Only one of “what/where/how strong” per pathway, so three different pathways are required.\n\n" +
          "As Nira, remembering that spikes in real neurons keep the same size while speed and timing change, which single statement do you keep and which three do you quietly cross out?",
        statements: [
          "One spike for “what”, then after a long wait another spike for “where”, then a third for “how strong”, never mixing.",
          "Same-size spikes, using speed for “how strong”, pattern shape for “what”, and timing in a slow beat for “where”, all in one train.",
          "Tiny, medium, and big spikes, each size meaning different mixtures of weak/strong/left/right.",
          "Only one of “what/where/how strong” per pathway, so three different pathways are required.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You remind yourself that throughout the lab you have seen spikes keep the same height but change in how often they appear and exactly when they arrive inside background rhythms.\n\n" +
          "Given that, is the idea that fits best the one using speed and timing codes with equal-sized spikes, or one that depends on changing spike size or forbidding multiplexing altogether?",
        options: [
          "The one using speed and timing codes with equal-sized spikes.",
          "One that depends on changing spike size or forbidding multiplexing.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Multiplexing with equal-sized spikes",
        text:
          "Only the statement that keeps spike size fixed while letting speed, pattern shape, and timing inside a beat carry different messages matches what you’ve seen; the others either invent spike sizes or forbid the very multiplexing you’re trying to explain.",
      },
      context: {
        title: "Rate and timing versus amplitude",
        text:
          "This minefield tests understanding that biological neurons generally use **all-or-none spikes** and encode information in **rate and temporal structure**, not in amplitude.\n\n" +
          "True multiplexing uses multiple independent aspects of the spike train to represent different stimulus dimensions, rather than segregating them across separate spikes or pathways.",
      },
    },
    {
      name: "Step 7 – What Truly Adds Channels?",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You list four possible changes to a pathway and wonder which ones really help it pack more information at once:\n\n" +
          "1) The neuron fires spikes faster when the touch is stronger.\n" +
          "2) The neuron shifts its spikes a little earlier or later in a repeating slow wave when the touch is in different places.\n" +
          "3) The neuron changes the shape of its spike rhythm (short–short–long vs long–long–short) for different kinds of objects.\n" +
          "4) The neuron randomly skips spikes so the brain cannot predict anything from them.\n\n" +
          "When you circle the changes that actually create clear extra channels for “how strong”, “where”, and “what kind”, and cross out the ones that just add noise, which combination do you choose?",
        options: [
          "1, 3, and 4.",
          "1 and 2.",
          "2 and 4.",
          "1, 2, and 3.",
        ],
        correctIndex: 3,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You look again and see that 1, 2, and 3 each give a systematic code—more spikes for stronger, earlier/later for place, different patterns for type—while 4 only makes the spikes less reliable and harder to read.\n\n" +
          "Do you now mark 1, 2, and 3 as the real information-adding changes, or still include the random skipping of 4 as if confusion were a useful channel?",
        options: [
          "Mark 1, 2, and 3 as real information-adding changes.",
          "Include 4 as if confusion were a useful channel.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Information versus noise",
        text:
          "You recognise that structured changes in rate, phase, and pattern add readable codes for strength, location, and type, while random skipping just destroys patterns and makes decoding harder.",
      },
      context: {
        title: "Informative variability versus noise",
        text:
          "This tuner distinguishes **informative variability** (systematic changes in rate, phase, and temporal pattern linked to stimuli) from **noise** (random unreliability).\n\n" +
          "Effective multiplexing relies on consistent mappings from stimulus dimensions to distinct aspects of the spike train, not on randomness.",
      },
    },
    {
      name: "Step 8 – The Pathway’s Secret Trick",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Standing at the end of the lab night, you think back: all along the spikes kept the same size, but the pathway used speed to follow “how strong”, pattern shapes to mark “what”, and timing inside slow beats to point to “where”, so that one thin wire seemed to whisper several answers at once.\n\n" +
          "When someone asks you what the brain’s main trick is for letting a single pathway carry “what”, “where”, and “how strong” together, do you say it keeps spikes the same size but uses their speed and timing patterns like layered codes, or that it sends one giant spike that somehow contains everything?",
        options: [
          "It keeps spikes the same size but uses their speed and timing patterns like layered codes.",
          "It sends one giant spike that somehow contains everything.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You recall that you never once saw a giant spike, only normal ones speeding up, slowing down, and slipping into different patterns and phases.\n\n" +
          "Given that history, do you now think the brain’s trick is speed and timing patterns as layered codes on one pathway, or a single huge spike that magically holds all answers?",
        options: [
          "Speed and timing patterns as layered codes on one pathway.",
          "A single huge spike that magically holds all answers.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Layers of code in one line",
        text:
          "You conclude that the brain’s trick is not bigger spikes, but **richer patterns**—using rate, rhythm, and timing relative to background waves so that one pathway becomes a stack of codes carrying several messages at once.",
      },
      context: {
        title: "Multiplexed neural codes",
        text:
          "This final step summarises **multiplexed neural coding**: a single axonal pathway can simultaneously encode multiple stimulus features by exploiting different aspects of spike timing and rate.\n\n" +
          "Rather than embedding everything in one massive event, the nervous system relies on structured spike trains over time to transmit complex, multidimensional information.",
      },
    },
  ],
  endScreen: {
    title: "Many Stories in One Line",
    text:
      "Your night in the lab ends; the screens dim, but you can still almost hear the spike trains you watched, like tiny drums encoded with secret rhythms.\n\n" +
      "You’ve seen how one pathway, with spikes all the same size, can still speak about **strength** through rate, **place** through timing in a beat, and **identity** through rhythm shape, all riding on a shared background wave.\n\n" +
      "In scientific terms you have walked through **rate coding**, **temporal coding**, and **multiplexed neural codes**, where multiple stimulus dimensions share a single channel without getting lost.\n\n" +
      "Now, when someone mentions “one nerve for one thing”, you know to look deeper—into the patterns hiding inside the line.",
  },
};

// Efference copy & self-generated vs external change (English)
const efferenceCopySequence = {
  title: "The Brain’s Shadow Notes – How It Knows You Moved",
  introSlides: [
    {
      type: "intro",
      title: "Who Moved First?",
      text:
        "When you turn your eyes, the world seems steady; when you tickle yourself, it mostly doesn’t work; yet the same nerves and muscles are involved.\n\n" +
        "Somehow your brain knows which changes *you* caused and which belong to the outside world.\n\n" +
        "What secret messages is it sending to itself?",
    },
    {
      type: "intro",
      title: "You Enter the Moving Room",
      text:
        "You move through this world as **Lira**, a quiet observer who trusts what you feel more than any textbook.\n\n" +
        "You notice each sway of your head, each jump of your eyes, and the strange calm of the room around you.\n\n" +
        "Your task is simple: for every change you see, decide whether it’s *you* or the world that moved, and discover what your brain is hiding from itself.",
    },
  ],
  steps: [
    {
      name: "Step 1 – Which Usually Moves First?",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You turn your head, and your brain sends a sharp “move now” command down to your neck muscles, while the room itself—walls, table, window—usually stays nailed in place, yet your eyes might suddenly see the whole room slide to the left, which could mean either your own head/eyes moved or the entire room really slid.\n\n" +
          "When you ask yourself what is usually more likely in real life, do you say the whole room suddenly slid across the ground, or that your own brain moved your head and eyes?",
        options: [
          "The whole room suddenly slid across the ground.",
          "My own brain moved my head and eyes.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You think about your day: countless little nods and glances versus almost zero times the entire building has glided sideways like a train.\n\n" +
          "Given that, which do you now admit is more common: your head moves, or the whole room moves like a train?",
        options: [
          "The whole room moves like a train.",
          "My head moves.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "What usually moves",
        text:
          "You realize your body is constantly making small movements while the room almost never slides under you, so a shifting image on your eyes is much more likely to come from you moving than from the whole world gliding.",
      },
      context: {
        title: "Prior probabilities of self-motion",
        text:
          "This step highlights the brain’s use of **prior probabilities**: self-motion is far more frequent than global world-motion.\n\n" +
          "Perceptual systems lean on this asymmetry to interpret ambiguous sensory changes as self-generated rather than external. It sets up why tracking your own motor commands is a useful strategy for perception.",
      },
    },
    {
      name: "Step 2 – Two Kinds of Change",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You picture two invisible baskets in your hands: Basket 1 = “Looks different because I moved”, Basket 2 = “Looks different even though I stayed still”, and then you live through five little moments: 1) you spin fast on a chair and the whole room seems to whirl, 2) you sit still and suddenly all the lights go out, 3) you move your hand toward your face and it looks bigger as it approaches, 4) you sit on a chair and a huge truck roaring past shakes the whole room, 5) you quickly flick your eyes to look at the clock on the wall.\n\n" +
          "Quietly, using only the idea “Did *I* purposefully move a body part, or did I stay still while the world changed?”, how do you sort each story—1, 2, 3, 4, 5—into Basket 1 (“because I moved”) or Basket 2 (“I stayed still”)?",
        baskets: [
          "Basket 1 – Looks different because I moved",
          "Basket 2 – Looks different even though I stayed still",
        ],
        items: [
          {
            label: "You spin fast on a chair and the whole room seems to whirl.",
            correctBasketIndex: 0,
          },
          {
            label: "You sit still and suddenly all the lights go out.",
            correctBasketIndex: 1,
          },
          {
            label: "You move your hand toward your face and it looks bigger as it approaches.",
            correctBasketIndex: 0,
          },
          {
            label: "You sit on a chair and a huge truck roaring past shakes the whole room.",
            correctBasketIndex: 1,
          },
          {
            label: "You quickly flick your eyes to look at the clock on the wall.",
            correctBasketIndex: 0,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You replay them and circle only the moments where you chose to move something: spinning your chair, reaching your hand toward your face, snapping your eyes to the clock.\n\n" +
          "Given that, which stories clearly belong to the “because I moved” basket: the ones where your body parts moved on purpose (1, 3, 5), or the ones where you were just sitting there and something else changed (2, 4)?",
        options: [
          "The ones where my body parts moved on purpose (1, 3, 5).",
          "The ones where I was still and something else changed (2, 4).",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Reafference versus exafference",
        text:
          "You see that stories 1, 3, and 5 all begin with a deliberate movement from you, while 2 and 4 happen while you sit still, so the first group are image changes caused by your own motion and the second group are true outside events.",
      },
      context: {
        title: "Self-caused vs external changes",
        text:
          "This step trains the distinction between **reafference** (sensory changes caused by one’s own movement) and **exafference** (sensory changes caused by external events).\n\n" +
          "Correctly categorizing experiences this way is crucial for interpreting sensory input. It foreshadows why the brain needs to tag its own motor commands to separate self-caused from world-caused changes.",
      },
    },
    {
      name: "Step 3 – Why “Change!” Isn’t Enough",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Imagine your brain only ever received messages from the eyes saying “picture changed!”, but it never received any note about whether it had just ordered the eyes or head to move, so every flicker—whether from your own quick glance or a sudden world shift—would look identical from the inside.\n\n" +
          "To make it easier to tell “I moved” changes from “the world moved” changes, do you think your brain should ignore its own “move now” messages and listen only to the eyes, or also keep track of which “move now” orders it just sent?",
        options: [
          "Ignore its own “move now” messages and listen only to the eyes.",
          "Also keep track of which “move now” orders it just sent.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "If you never remember what actions you just triggered, then every wobble in the picture might be either your own doing or a real outside event, and you’d have no way to tell.\n\n" +
          "Given that, is it smarter to pretend your own commands don’t exist, or remember them as clues about which changes you caused?",
        options: [
          "Pretend my own commands don’t exist.",
          "Remember them as clues about which changes I caused.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Why motor context matters",
        text:
          "You realize that without knowing which movements you ordered, you can’t separate self-caused visual shifts from genuine outside surprises, so tracking your own “move now” messages is essential.",
      },
      context: {
        title: "Motor context for perception",
        text:
          "This step points to the need for **motor context** in interpreting sensory signals.\n\n" +
          "Sensory input alone is ambiguous: a retinal shift could be due to eye movement or object motion. Linking sensory changes to recent motor commands is a core idea behind **efference copy** and **corollary discharge** in sensorimotor control.",
      },
    },
    {
      name: "Step 4 – The Quiet Copy and the Guess",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "You picture your brain doing something clever: first it sends a “move now” message to your muscles (Tile C), at the same time it keeps a quiet inside copy of that exact command (Tile A), and then it uses that copy to predict what the senses should feel after the move—what new sight or touch should appear if everything goes as planned (Tile B).\n\n" +
          "As Lira, when you lay these tiles on the table—A: “keeps an inside copy”, B: “predicts what the senses should feel after the move”, C: “sends a ‘move now’ message”—in what causal order do you place them?",
        elements: [
          "Sends a “move now” message to your muscles.",
          "Keeps a quiet inside copy of that exact command.",
          "Uses that copy to predict what the senses should feel after the move.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Ask yourself: can your brain sensibly predict the feeling of a move before it has even decided to send a “move now” signal, or does it first decide to move, then keep a copy of that decision, and only then use the copy to guess the coming sensation?",
        options: [
          "It first decides to move, then keeps a copy, then predicts the sensation.",
          "It predicts the sensation before deciding to move.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Command → copy → prediction",
        text:
          "You see that the brain must first choose to move, then store a copy of that choice, and only then use that copy to predict the sensory outcome, so “send command → keep copy → make prediction” is the only causal order that makes sense.",
      },
      context: {
        title: "Forward models in motor control",
        text:
          "This step formalizes the sequence behind **forward models** in motor control.\n\n" +
          "A motor command is issued, an efference copy is stored, and that copy drives a prediction of expected sensory consequences. This causal chain underlies how the brain prepares for and evaluates the results of its own actions.",
      },
    },
    {
      name: "Step 5 – Four Pieces of the Trick",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You now write four ideas down the left side of your notebook—1) Motor command, 2) Efference copy (inside copy of the command), 3) Predicted sensation, 4) Difference signal (“surprise”)—and four “jobs” on the right: a) “Stays inside the brain as a record of the move”, b) “How different the real feeling is from what was expected”, c) “Goes out to muscles to make the move”, d) “What the brain *expects* to see or feel after the move”.\n\n" +
          "Using everything you’ve built so far, how do you match each left item (1–4) to exactly one right job (a–d)?",
        left: [
          "Motor command.",
          "Efference copy (inside copy of the command).",
          "Predicted sensation.",
          "Difference signal (“surprise”).",
        ],
        right: [
          "Stays inside the brain as a record of the move.",
          "How different the real feeling is from what was expected.",
          "Goes out to muscles to make the move.",
          "What the brain expects to see or feel after the move.",
        ],
        // mapping[i] is index in right[] that correctly matches left[i]
        mapping: [2, 0, 3, 1],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You focus on the traffic: one thing must leave the brain to push muscles, some things must stay inside as records and expectations, and one last thing must measure mismatch between expectation and reality.\n\n" +
          "Which item is the only one that can be the “go out to muscles” piece, and which ones obviously belong to “stay inside the brain” work?",
        options: [
          "The motor command goes out to muscles; the others stay inside as record, prediction, and mismatch.",
          "The predicted sensation goes out to muscles; the others stay inside.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Who does what in the loop",
        text:
          "You realize the motor command is the only signal that actually drives muscles, the efference copy is the same plan kept inside as a record, the predicted sensation is the brain’s expectation, and the difference signal is the measure of surprise.",
      },
      context: {
        title: "Components of predictive control",
        text:
          "This step lays out the components of **predictive motor control**: commands, internal copies, predicted sensory feedback, and prediction error.\n\n" +
          "In computational neuroscience, these map to **forward models** and **prediction-error signals** that drive learning and correction. The difference signal is especially important for updating internal models and detecting unexpected external events.",
      },
    },
    {
      name: "Step 6 – Why Keep the Copy At All?",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You now know the brain sends commands, keeps copies, predicts sensations, and measures surprise, and you’re told it keeps this inside copy of its own move messages for a special reason.\n\n" +
          "You face four explanations and must choose exactly one:\n\n" +
          "1) It is mainly so the muscles can rest more and not get tired.\n" +
          "2) It lets the brain predict and cancel the expected part of its own movement, so it can notice what is unexpected from the outside.\n" +
          "3) It makes the pictures from the eyes brighter and more colorful all the time.\n" +
          "4) It allows you to move without using any energy from food.",
        statements: [
          "It is mainly so the muscles can rest more and not get tired.",
          "It lets the brain predict and cancel the expected part of its own movement, so it can notice what is unexpected from the outside.",
          "It makes the pictures from the eyes brighter and more colorful all the time.",
          "It allows you to move without using any energy from food.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Think back to your diagram: you used the efference copy to create a predicted sensation and then compared that to what really arrived, so you could focus on what didn’t match.\n\n" +
          "Which statement talks about predicting and unexpected events in exactly that way?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
      },
      explanation: {
        title: "The real reason for the copy",
        text:
          "You see that only the idea about predicting and cancelling expected self-caused sensations matches your diagram; the others talk about muscles resting, brighter pictures, or free energy that don’t fit the role of the copy at all.",
      },
      context: {
        title: "Efference copy as prediction engine",
        text:
          "This step captures the core function of **efference copy / corollary discharge**: to subtract predicted self-generated sensory consequences from incoming signals.\n\n" +
          "By cancelling expected components, the system enhances sensitivity to unpredicted, externally caused inputs. This mechanism is thought to operate in vision, audition, and somatosensation.",
      },
    },
    {
      name: "Step 7 – Where the Trick Shows Up in Life",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now look for real-world effects of this “inside copy + prediction” trick and consider four possibilities:\n\n" +
          "A) Your view of the world doesn’t jump wildly every time your eyes move, because the brain expected that jump.\n" +
          "B) You are less surprised by the sound of your own voice than by someone suddenly shouting your name from behind.\n" +
          "C) You never ever drop anything by accident.\n" +
          "D) The brain can notice small, unexpected touches while you are moving, because it cancels the touch it predicted from your own move.\n\n" +
          "Which option lists only the effects that truly fit the “predict what should happen, then notice what doesn’t match” story?",
        options: [
          "Option 1: A and C.",
          "Option 2: A, B, and D.",
          "Option 3: B, C, and D.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Ask yourself whether efference copy makes you perfect and mistake-free, or whether it mainly helps you tell expected self-made changes from surprising outside changes.\n\n" +
          "Given that, which collection fits better: the one with “never drop anything”, or the one with expected self-moves being toned down and surprises standing out?",
        options: [
          "The collection with “never drop anything”.",
          "The collection with expected self-moves toned down and surprises standing out.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Real-life fingerprints of prediction",
        text:
          "You realize A, B, and D all involve predicted self-caused sensations being down-weighted so unexpected changes stand out, while “never dropping anything” is unrealistic and not a direct effect of efference copy.",
      },
      context: {
        title: "Examples of efference copy in perception",
        text:
          "This step connects efference copy to phenomena like **visual stability during saccades**, reduced response to **self-generated sounds**, and selective attention to unexpected tactile events during movement.\n\n" +
          "These examples illustrate how prediction enables the nervous system to distinguish self-generated input from external stimuli and reduce sensory “clutter” from one’s own actions.",
      },
    },
    {
      name: "Step 8 – The Rule You’d Choose as a Brain",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Imagine you are the brain and must choose one rule forever for every move you make: Rule 1: “Just send move messages and never remember them”, or Rule 2: “Send move messages and keep an inside copy to predict what should happen and compare it with what actually came in”.\n\n" +
          "Based on everything you’ve seen in this story, which rule would actually help you tell self-made changes from outside surprises?",
        options: [
          "Rule 1 – Just send move messages and never remember them.",
          "Rule 2 – Send move messages and keep an inside copy to predict and compare.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "If you never remember what orders you just gave, then every flicker, shake, and sound could be either your own doing or the world’s, and you’d have no way to tell them apart.\n\n" +
          "Knowing that, do you now keep “forget your own move messages”, or switch to “keep an inside copy and use it to predict and compare”?",
        options: [
          "Keep “forget your own move messages”.",
          "Switch to “keep an inside copy and use it to predict and compare”.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "The only sensible rule",
        text:
          "You conclude that only the rule that keeps and uses an internal copy of motor commands lets the brain separate its own actions from true external events.",
      },
      context: {
        title: "Predictive sensorimotor control",
        text:
          "This final step summarizes **predictive sensorimotor control**: motor commands plus efference copies plus prediction error.\n\n" +
          "Such internal copies are central to modern models of perception and action, including **forward models**, **corollary discharge**, and **predictive coding** frameworks. They explain why the brain “needs” an internal record of its own motor output.",
      },
    },
  ],
  endScreen: {
    title: "The Brain’s Shadow Notes",
    text:
      "Your walk through this moving world ends: you turned your head, flicked your eyes, felt the room shake, and kept asking whether it was you or the world that moved.\n\n" +
      "Step by step, you discovered that the brain quietly keeps a shadow copy of its own motor commands, uses it to predict what its senses should feel, and then listens hardest to what breaks that expectation.\n\n" +
      "In scientific terms, you’ve met **efference copy / corollary discharge**, **forward prediction of sensory consequences**, and **prediction-error signals** that highlight unexpected external events.\n\n" +
      "The brain’s internal copy of its own motor commands is not a diary—it’s a tool for subtracting the expected, so the truly new and surprising can be heard.",
  },
};

// Associative memory & attractor networks – “Cat in the Web”
const associativeMemorySequence = {
  title: "The Cat in the Web – Associative Memory and Attractors",
  introSlides: [
    {
      type: "intro",
      title: "The Cat That Lives in One Piece",
      text:
        "You glimpse a scrap of fur, a curve of whisker, a broken tune of dots and lines.\n\n" +
        "Somehow, your mind whispers, *“Cat.”*\n\n" +
        "How can a brain leap from a fragment to the whole picture, filling in eyes, tail, and pose that are nowhere on the page?",
    },
    {
      type: "intro",
      title: "You Enter the Memory Hall",
      text:
        "You are **Lena**, a quiet observer in a strange museum of minds.\n\n" +
        "Rooms of puzzles, glowing webs of neurons, shifting patterns of light wait for you.\n\n" +
        "Your task is simple: each time you’re shown a fragment, you must decide how the hidden whole is stored, found, and completed.",
    },
  ],
  steps: [
    {
      name: "Step 1 – One Shard, One Whole",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You once sat at a table and finished a jigsaw of a bright-eyed cat, every piece locked into place so the full picture burned into your memory; later, you find just one lonely puzzle piece with a bit of cat fur and whisker on it lying on the floor in your hand.\n\n" +
          "Now that you’ve already seen the full cat, what do you trust your mind to do when you stare at this single shard?",
        options: [
          "Only see this piece and never recall any bigger picture.",
          "Remember the full cat picture that this piece belongs to.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You close your eyes and recall how the whole cat looked when the puzzle was once complete—ears, eyes, tail, background—then open them again to that single furry piece.\n\n" +
          "If your mind truly forgot the whole every time you saw just one part, would you be able to picture the cat at all now?",
        options: [
          "No, the whole would vanish whenever you saw only one part.",
          "Yes, the whole can still be recalled from that part.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "From a part back to the whole",
        text:
          "Because you once saw the completed cat, your brain can store the whole pattern; a single familiar piece can act as a cue that pulls the entire remembered image back into view.",
      },
      context: {
        title: "Associative memory",
        text:
          "This step illustrates that brains can store structured patterns, not just isolated fragments.\n\n" +
          "A partial cue can trigger reactivation of a full stored representation. This is the basic intuition behind **associative memory**: remembering a whole from one of its parts.",
      },
    },
    {
      name: "Step 2 – Threads That Tie the Cat Together",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You stand before two baskets: Basket M (Memory) for features that actually help you recall the cat picture when you see one piece, and Basket R (Random) for things that don’t help at all.\n\n" +
          "You handle edges that fit neatly with other cat pieces, pieces from a totally different puzzle, colours and shapes that often appear together in the cat picture, a strange piece that fits nowhere, and little whisker lines that clearly match other whisker pieces.\n\n" +
          "Using only the idea “does this feature really connect to the cat picture and other cat pieces, or not?”, how do you sort each item into Basket M or Basket R?",
        baskets: ["Basket M – Helps recall the cat", "Basket R – Random / doesn’t help"],
        items: [
          {
            label: "Edges that fit neatly with other cat pieces.",
            correctBasketIndex: 0,
          },
          {
            label: "Pieces from a totally different puzzle.",
            correctBasketIndex: 1,
          },
          {
            label: "Colours and shapes that often appear together in the cat picture.",
            correctBasketIndex: 0,
          },
          {
            label: "A strange piece that fits nowhere.",
            correctBasketIndex: 1,
          },
          {
            label: "Little whisker lines that clearly match other whisker pieces.",
            correctBasketIndex: 0,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine trying to rebuild the cat using just what’s in the memory basket: edges that lock with other cat pieces, colours and shapes that often appear together on the cat, and whisker lines that clearly continue into other whiskers, while ignoring pieces from another puzzle and the piece that fits nowhere.\n\n" +
          "Which kind of items truly belong in the memory basket?",
        options: [
          "Only those that really match and connect to the cat picture.",
          "Also the pieces from another puzzle or ones that don’t fit anywhere.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Useful threads versus noise",
        text:
          "Only features that genuinely belong to the cat picture and link pieces together help your mind reconstruct the whole; random or unfitting pieces don’t support that pattern and just add noise.",
      },
      context: {
        title: "Co-occurring features",
        text:
          "Associative memory relies on **consistent feature co-occurrences**: elements that repeatedly appear together (edges, whiskers, shared colours) are bound into one pattern.\n\n" +
          "Irrelevant or incompatible features do not strengthen that pattern. Useful memories encode **relationships between matching parts**, not arbitrary items.",
      },
    },
    {
      name: "Step 3 – Web of “This Goes With That”",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now walk into a glowing web where dots (neurons) are joined by lines, and every strong line quietly says, “these two things usually appear together”—fur with whiskers, whiskers with ears, ears with the curve of a head.\n\n" +
          "When many such links in the web say “these features go together”, what do you conclude the network is really storing?",
        options: [
          "Full patterns made of many pieces that belong together.",
          "Only single isolated pieces, each floating alone with no connection.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine erasing all the links so every dot stood alone, and realise nothing would say “this belongs with that” anymore.\n\n" +
          "If the meaning of the web is inside the links that tie features together, is it treating information as connected patterns of pieces, or as lonely, independent fragments with no grouping?",
        options: [
          "As connected patterns of pieces.",
          "As lonely, independent fragments with no grouping.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Meaning in the links",
        text:
          "The strength of the web lies in its connections: by reinforcing “goes with” links among features, it stores entire patterns rather than unconnected single bits.",
      },
      context: {
        title: "Distributed representations in a network",
        text:
          "Neural networks encode information in **connection weights** that link units representing different features.\n\n" +
          "Strongly correlated features become bound into a single stored configuration. This is the idea of a **distributed representation** of a pattern across many neurons.",
      },
    },
    {
      name: "Step 4 – From Hint to Whole",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "In another room, the network has already stored the cat as a pattern of many neurons firing together.\n\n" +
          "You now show it only a hint—ears and a bit of fur—then let it slowly adjust its activity according to its learned links until it settles into a stable pattern that matches the stored cat.\n\n" +
          "Arrange the tiles below in the correct cause → effect order.",
        elements: [
          "You give the network a small hint: a few cat features (ears, fur).",
          "The network uses its links to “complete” the missing parts of the pattern.",
          "The network finds a stable activity pattern that matches the stored cat.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Look at the tiles again and ask yourself which one must come first as the starting hint, which one describes the in‑between filling‑in, and which one clearly feels like the final result where nothing changes anymore.\n\n" +
          "Do you order them as hint → completion → stable cat, or some other sequence that wrongly puts the result before the process?",
        options: [
          "Hint → completion → stable cat.",
          "Stable cat → completion → hint.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Cue, process, attractor",
        text:
          "The network first receives a partial cue, then its internal links work to fill in the missing pieces, and only after that process does it land in a stable pattern that matches the stored cat.",
      },
      context: {
        title: "Pattern completion dynamics",
        text:
          "This illustrates **pattern completion dynamics** in an attractor network.\n\n" +
          "A partial input moves the system into the basin of attraction of a stored pattern; recurrent interactions then iteratively adjust activity until a stable configuration is reached.",
      },
    },
    {
      name: "Step 5 – The Pull of the Bowl",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You see four scenes on the left and four labels on the right.\n\n" +
          "Match each scene with the description that best fits it.",
        left: [
          "A ball rolling into a deep bowl and stopping at the bottom.",
          "A network pattern that stays the same once reached.",
          "Starting from a noisy, half‑right pattern.",
          "The network slowly fixing mistakes until it matches a stored pattern.",
        ],
        right: [
          "Cleaning up errors using stored links.",
          "The attractor state itself.",
          "Being pulled toward the attractor.",
          "A picture of how an attractor works.",
        ],
        // mapping[i] is index in right[] that correctly matches left[i]
        // 1 → D, 2 → B, 3 → C, 4 → A
        mapping: [3, 1, 2, 0],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Picture the deep bowl with the ball resting at the bottom and compare it to the idea of a stable pattern that keeps itself once reached, versus the messy start and the slow error‑fixing.\n\n" +
          "Which scene is really the metaphor (the picture) of an attractor, and which is the attractor state itself?",
        options: [
          "The bowl picture is the metaphor; the bottom of the bowl is the attractor state.",
          "The bowl picture is the error‑cleaning process; the bottom is just noise.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Reading the bowl picture",
        text:
          "The deep bowl scene is a metaphor for an attractor landscape; the bottom of the bowl matches the stable attractor state, the half‑right noisy start is like beginning on a slope, and the slow error‑fixing is the cleaning‑up process as the ball rolls to the bottom.",
      },
      context: {
        title: "Attractors as energy minima",
        text:
          "An **attractor** is a stable state of a dynamical system toward which neighbouring states evolve.\n\n" +
          "The energy‑bowl metaphor shows how trajectories move “downhill” toward such states. Pattern completion corresponds to trajectories being pulled toward an attractor while internal interactions clean up errors.",
      },
    },
    {
      name: "Step 6 – What “Associative Memory” Really Says",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You remind yourself: the network has learned links between features that belong to the same pattern, and when you show it part of that pattern, its activity moves toward the full stored pattern, cleaning up noise along the way.\n\n" +
          "Which statement below best matches this idea of associative memory?",
        statements: [
          "Associative memory means the network can only remember things if you show it everything exactly the same as before.",
          "Associative memory means the network can guess a full pattern even when it sees only a part that matches its stored links.",
          "Associative memory means the network forgets its stored patterns as soon as there is any noise or missing pieces.",
          "Associative memory means the network randomly chooses any stored pattern, no matter what input you give.",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You think back to the cat puzzle: you showed just ears and fur and the network completed the whole, instead of demanding a perfect copy or panicking at noise.\n\n" +
          "Does “associative” sound more like “I need a perfect replica to remember anything”, or more like “I can connect a small hint to a bigger thing I already know”?",
        options: [
          "It means needing a perfect replica to remember anything.",
          "It means connecting a small hint to a bigger thing already stored.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Content‑addressable recall",
        text:
          "Associative memory is precisely about using partial, possibly noisy cues to retrieve a full stored pattern; it is neither demanding a perfect duplicate nor collapsing into forgetfulness or randomness when pieces are missing.",
      },
      context: {
        title: "Content‑addressable memory",
        text:
          "Associative memory describes systems that perform **content‑addressable recall**, where stored patterns are accessed by similarity rather than by explicit addresses.\n\n" +
          "Given a fragment that matches a stored association structure, the network’s dynamics recover the complete pattern.",
      },
    },
    {
      name: "Step 7 – Ingredients of Pattern Completion",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now list four possible causes for why the network can fill in blanks from a partial cue: (a) strong, learned links between features that belong together; (b) attractor states that are stable and pull nearby activity toward them; (c) totally random links that change every time you show something; and (d) the network ignoring its stored links and always copying the input exactly as it is.\n\n" +
          "Which combination really explains reliable pattern completion from a hint?",
        options: [
          "Strong, learned links plus stable attractor states (a and b).",
          "Random links and blind copying of the input (c and d).",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Imagine trying to complete a cat picture when the links between features are random, or when the network simply freezes the partial input without using any links at all.\n\n" +
          "Could you reliably jump from “ears and fur” to “whole cat” that way, or do you need both structured links and attractor states to pull activity toward the right pattern?",
        options: [
          "You need both structured links and attractor states.",
          "Random links or blind copying are enough.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "What completion really needs",
        text:
          "Reliable pattern completion needs meaningful, learned connections tying features together and stable attractor states that pull nearby activity into the right whole; random links or blind copying of the input cannot systematically fill in missing pieces.",
      },
      context: {
        title: "Weights and attractors together",
        text:
          "Pattern completion in associative networks depends on **structured synaptic weights** and **attractor dynamics**.\n\n" +
          "Learned weights encode which features co‑occur, while attractors provide stable endpoints that nearby states converge to.",
      },
    },
    {
      name: "Step 8 – The Mind’s Jump From Hint to Whole",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now see the big picture: the network has learned patterns as stable attractor states through links between features, a partial input pushes its activity near one of these stored patterns, and then its internal dynamics pull the activity the rest of the way, cleaning noise and filling blanks until it lands in that attractor.\n\n" +
          "When this neural network “fills in the blanks” from a partial cue, what is it really doing?",
        options: [
          "Using associative memory and attractor states to move from a small, noisy hint to the closest stored whole pattern.",
          "Ignoring past learning and inventing a completely new pattern every time from random guesses.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine feeding in the same fragment many times: each time, the network settles into the same familiar cat pattern rather than some wild new animal.\n\n" +
          "If it were inventing new patterns at random, would the result look like a neat completion of something it already knows, or like unpredictable noise each time?",
        options: [
          "It would look like a neat completion of something already stored.",
          "It would look like unpredictable noise each time.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "From fragment to whole",
        text:
          "Because the network has stored patterns as attractors and linked features associatively, a partial cue pushes it into the right basin, and its dynamics carry it to the closest learned whole rather than to a random invention.",
      },
      context: {
        title: "Associative attractor networks",
        text:
          "This step integrates **associative memory** with **attractor network dynamics**.\n\n" +
          "Stored patterns act as attractors, and partial cues serve as initial conditions within their basins of attraction. The network’s update rules then deterministically complete the pattern, implementing content‑addressable recall.",
      },
    },
  ],
  endScreen: {
    title: "The Cat in the Web",
    text:
      "Your walk through the memory hall ends: you started with a single furry puzzle piece in your hand and watched entire cats and other patterns snap back into place.\n\n" +
      "You’ve seen how the brain can store patterns as **distributed links**, how **partial cues** can launch activity toward **attractor states**, and how these dynamics **clean up noise and fill in blanks**.\n\n" +
      "This is the essence of **associative memory in attractor networks**: from a fragment and a learned web of “this goes with that”, the mind can reliably reconstruct a whole.",
  },
};

// Balanced plasticity – learning without breaking
const balancedPlasticitySequence = {
  title: "The Brain That Learns Without Breaking – Balanced Plasticity",
  introSlides: [
    {
      type: "intro",
      title: "The Brain That Shouts Forever",
      text:
        "Tiny gaps between neurons quietly decide who gets heard and who is ignored.\n\n" +
        "Turn their “volume knobs” only upward and the whole forest of cells might start screaming; turn them only downward and thought could sink into silence.\n\n" +
        "How does a brain stay awake, yet never burn itself into chaos or fade into nothing?",
    },
    {
      type: "intro",
      title: "You Enter the Network",
      text:
        "You are **Mira**, a quiet caretaker walking through an imagined brain where each synapse is a glowing knob between two cells.\n\n" +
        "Your task is simple and cruel: let this network learn rich patterns, but never let it spiral into noise or fall into permanent hush.\n\n" +
        "Every choice you make—what to turn up, what to turn down—changes how this brain will think tomorrow.",
    },
  ],
  steps: [
    {
      name: "Step 1 – Knobs That Only Creep Up",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You walk between two neurons joined by a little glowing knob that works like a volume dial—turning it up makes signals pass more easily, turning it down makes them struggle—and in this strange brain every time two neurons fire together, the knob only turns up and never down.\n\n" +
          "As you watch thousands of such pairs talk over and over under this rule, what do you expect over time?",
        options: [
          "Almost all the used connections grow very strong and shout all the time.",
          "The connections nicely spread themselves into strong, medium, and weak all on their own.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You find one knob that has been turned up again and again until it blazes with strength, and you notice there is no rule anywhere that can nudge it back down once it gets loud.\n\n" +
          "If nothing can ever turn this loud knob down, do you think it will ever become quiet again on its own?",
        options: ["Yes, it will quiet down on its own.", "No, it will stay loud unless something can turn it down."],
        correctIndex: 1,
      },
      explanation: {
        title: "Only‑up means runaway",
        text:
          "You realise that if every used synapse can only get stronger, more and more of them will end up stuck on “loud,” so the brain fills with shouting connections that never calm down.",
      },
      context: {
        title: "Purely Hebbian growth",
        text:
          "This step illustrates how purely Hebbian, “only‑up” plasticity (long‑term potentiation without weakening) leads to runaway growth of synaptic strengths.\n\n" +
          "Without mechanisms to reduce or cap synaptic weights, positive feedback can push most active synapses toward saturation, creating unstable, noisy network activity.",
      },
    },
    {
      name: "Step 2 – Two Cities of Neurons",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You now imagine two whole brains: in Brain STEADY, some invisible caretaker quietly weakens connections that are used too much while still allowing useful ones to grow stronger, keeping overall shouting under control; Brain RUNAWAY simply lets any used connection strengthen, never weaken, until neurons start firing almost all the time and signals get mixed and noisy.\n\n" +
          "Using the clues below, sort them into Brain STEADY or Brain RUNAWAY.",
        baskets: ["Brain STEADY", "Brain RUNAWAY"],
        items: [
          {
            label: "Can quietly weaken some connections that are used too much.",
            correctBasketIndex: 0,
          },
          {
            label: "Neurons start firing almost all the time, even for tiny inputs.",
            correctBasketIndex: 1,
          },
          {
            label: "Can still make some connections stronger when they are useful.",
            correctBasketIndex: 0,
          },
          {
            label: "Signals get so mixed and noisy that patterns are hard to tell apart.",
            correctBasketIndex: 1,
          },
          {
            label: "Uses only strengthening, never weakening.",
            correctBasketIndex: 1,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You stare at Brain STEADY and ask yourself whether it could really stay stable if it never weakened over‑used connections and only ever pushed them upward.\n\n" +
          "Can a “steady” brain keep control without the ability to turn too‑loud synapses back down?",
        options: ["Yes, it can stay steady without any weakening.", "No, it needs both strengthening and weakening."],
        correctIndex: 1,
      },
      explanation: {
        title: "What makes a brain steady",
        text:
          "You see that a truly steady brain must be able to both strengthen useful pathways and gently weaken those that shout too much, while a runaway brain that only strengthens ends up noisy, overactive, and full of tangled signals.",
      },
      context: {
        title: "Potentiation, depression and stability",
        text:
          "This step contrasts networks with both potentiation and depression against ones with only potentiation.\n\n" +
          "A system that can increase and decrease synaptic strengths can support learning while keeping overall activity bounded, whereas one that only strengthens risks runaway excitation and loss of signal clarity.",
      },
    },
    {
      name: "Step 3 – When Practice Erases the Path",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Now you walk into a different nightmare brain where the rule is flipped: every time a synapse is used, its knob only turns down, never up, so every passage of a signal wears the path away a little more and nothing can ever be strengthened.\n\n" +
          "In such a brain, what do you expect for important pathways with practice over time?",
        options: [
          "They slowly fade and stop carrying signals well.",
          "They become clearer and stronger the more they are used.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You picture a forest trail that loses a thin layer of ground every time someone walks it, with nothing ever rebuilding the path.\n\n" +
          "If each step scrapes the trail away, does walking it many times make it easier or harder to use?",
        options: ["Easier.", "Harder."],
        correctIndex: 1,
      },
      explanation: {
        title: "Only‑down means erasure",
        text:
          "You understand that with only weakening, even useful synapses get worn down by use, so practice actually erases the very paths that should carry strong signals.",
      },
      context: {
        title: "Purely depressive plasticity",
        text:
          "This step shows that purely depressive plasticity cannot support learning.\n\n" +
          "If activity only decreases synaptic strength, repeated use will eventually abolish even important connections, preventing long‑term retention of information.",
      },
    },
    {
      name: "Step 4 – From Extremes to Broken Signals",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "You now line up three tiles of your journey: Tile A says “only upward plasticity makes many synapses very strong”, Tile C says “only downward plasticity makes many synapses very weak”, and Tile B says “signals become either chaotic noise or too faint to use”.\n\n" +
          "Build a chain that shows how both extremes—only up or only down—lead to trouble.",
        elements: [
          "Only upward plasticity makes many synapses very strong.",
          "Only downward plasticity makes many synapses very weak.",
          "Signals become either chaotic noise or too faint to use.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Ask yourself which tile clearly describes the final outcome—a world where activity is either noisy chaos or fading silence.\n\n" +
          "Should the tile about chaotic noise or too‑faint signals go at the end of the story?",
        options: ["Yes, it belongs at the end.", "No, it belongs at the start."],
        correctIndex: 0,
      },
      explanation: {
        title: "Two bad roads, one bad end",
        text:
          "You see that both extremes—exclusive potentiation or exclusive depression—eventually point to the same problem: brain activity becomes either chaotic or unusably faint.",
      },
      context: {
        title: "Why extremes fail",
        text:
          "This chain emphasises that both extremes destabilise network function.\n\n" +
          "Excessive strengthening drives saturation and noise, while excessive weakening erodes functional connectivity, leading to signal loss.",
      },
    },
    {
      name: "Step 5 – Calling the Knobs by Their True Names",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You now stand before four labels on the left and four descriptions on the right.\n\n" +
          "Match each plasticity term with its definition.",
        left: ["LTP", "LTD", "Homeostatic plasticity", "Runaway plasticity"],
        right: [
          "Gently adjusts all connections so average activity stays in a good range.",
          "Only pushes strengths in one direction until activity becomes too high or low.",
          "Long‑lasting increase in synaptic strength.",
          "Long‑lasting decrease in synaptic strength.",
        ],
        // Correct mapping: 1→c, 2→d, 3→a, 4→b
        mapping: [2, 3, 0, 1],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You focus on the description that sounds like “only pushes in one direction until it’s too much” and ask which left‑hand label that really fits.\n\n" +
          "Does that sound more like homeostatic plasticity or runaway plasticity?",
        options: ["Homeostatic plasticity.", "Runaway plasticity."],
        correctIndex: 1,
      },
      explanation: {
        title: "Naming up, down, and balance",
        text:
          "You correctly pair “up” with long‑term potentiation, “down” with long‑term depression, “gentle averaging” with homeostatic plasticity, and “only‑one‑way until it breaks” with runaway plasticity.",
      },
      context: {
        title: "LTP, LTD and homeostasis",
        text:
          "This step explicitly names LTP (long‑term potentiation) as persistent strengthening of synapses and LTD (long‑term depression) as persistent weakening.\n\n" +
          "Homeostatic plasticity refers to mechanisms that adjust synaptic strengths globally to keep average neuronal activity within a target range, while runaway plasticity describes unbalanced changes that drive activity toward pathological extremes.",
      },
    },
    {
      name: "Step 6 – The Three‑Partner Pact",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "By now you know that the brain actually has LTP, LTD, and homeostatic plasticity working together: average activity must stay in a safe zone, but connections still need to change so learning can happen without exploding or vanishing.\n\n" +
          "Which single statement best captures this three‑partner pact?",
        statements: [
          "If LTP is strong enough, the brain doesn’t need LTD or homeostatic plasticity.",
          "If LTD is strong enough, the brain doesn’t need LTP or homeostatic plasticity.",
          "The brain uses LTP, LTD, and homeostatic plasticity together so connections can change while overall activity stays stable.",
          "The brain avoids both LTP and LTD, because any long‑term change is dangerous.",
        ],
        correctIndex: 2,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You think back to your noisy “only up” world and your fading “only down” world and ask whether a brain with only one kind of change could both learn and avoid runaway noise or silence.\n\n" +
          "Can a brain both learn new patterns and avoid disaster if it has only‑up or only‑down changes?",
        options: ["Yes, one direction is enough.", "No, it needs both directions plus stabilising rules."],
        correctIndex: 1,
      },
      explanation: {
        title: "Partners, not rivals",
        text:
          "You realise the brain must coordinate LTP, LTD, and homeostatic rules so synapses can be strengthened and weakened while the whole network’s activity remains within a safe operating band.",
      },
      context: {
        title: "Plasticity and stability together",
        text:
          "This step highlights the cooperative role of multiple plasticity mechanisms.\n\n" +
          "LTP and LTD provide direction‑specific changes for encoding information, while homeostatic plasticity stabilises overall firing rates.",
      },
    },
    {
      name: "Step 7 – The Quiet Reasons Behind Balance",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now list four possible reasons why having both “up and down” plasticity, plus homeostatic rules, is actually useful: (1) it lets some synapses get stronger for important patterns while others weaken to reduce noise; (2) it keeps the average firing level of neurons near a healthy target range; (3) it completely freezes all synapses so nothing ever changes again; (4) it allows the brain to keep learning new things over time without breaking its own activity levels.\n\n" +
          "Which set of reasons do you keep as good ones?",
        options: [
          "Reasons 1, 2, and 4 – strengthen important paths, keep firing near a target, and keep learning possible.",
          "Reasons 2 and 3 – hold activity near a target by freezing synapses.",
          "Reasons 1 and 3 – pick out important patterns but stop learning.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine a brain where synapses are frozen, unable to grow or shrink, and ask what that would do to learning.\n\n" +
          "Would synapses that never change again help learning or stop it?",
        options: ["Help learning.", "Stop it."],
        correctIndex: 1,
      },
      explanation: {
        title: "Why balance is useful",
        text:
          "You see that balanced “up and down” rules help pick out important patterns, hold firing rates near a healthy target, and let learning continue over a lifetime—while freezing synapses would kill learning altogether.",
      },
      context: {
        title: "Benefits of balanced plasticity",
        text:
          "This step spells out the functional benefits of balanced plasticity.\n\n" +
          "Selective potentiation and depression refine representations, homeostatic control preserves overall excitability, and together they permit ongoing learning without destabilising activity.",
      },
    },
    {
      name: "Step 8 – Learning on the Edge of Stability",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Looking back over the network you’ve walked through, you remember: “only‑up” plasticity drives many synapses to become too strong and noisy, “only‑down” plasticity makes connections fade and prevents learning, and real brains use LTP, LTD, and homeostatic plasticity together so connections can both change and keep activity in a healthy range.\n\n" +
          "So when someone asks you why synaptic plasticity must go both “up” and “down” for the brain to remain stable and still learn, what do you say?",
        options: [
          "Because changing in both directions lets the brain strengthen useful paths, weaken less useful ones, and keep overall activity in a safe zone.",
          "Because the brain is indecisive and randomly flips synapses up and down with no purpose.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You flip through your notes and see clear aims in every step: avoiding runaway shouting, avoiding fading silence, and keeping patterns clear while still learning new ones.\n\n" +
          "Do those steps show a purpose (avoiding noise and silence while learning) or just random flipping?",
        options: ["They show a clear purpose.", "They show only random flipping."],
        correctIndex: 0,
      },
      explanation: {
        title: "Why up and down must work together",
        text:
          "You conclude that “up” and “down” plasticity are not indecisive noise but carefully tuned tools for sharpening important connections, quieting unhelpful ones, and holding the whole brain in a stable, learnable state.",
      },
      context: {
        title: "Resolving plasticity–stability tension",
        text:
          "This final step summarises the interplay of LTP, LTD, and homeostatic plasticity.\n\n" +
          "Bidirectional synaptic changes, constrained by global stability mechanisms, allow neural circuits to encode information while maintaining controlled overall activity.",
      },
    },
  ],
  endScreen: {
    title: "The Brain That Learns Without Breaking",
    text:
      "Your walk through the glowing forest of synapses ends: you have seen brains that only shout, brains that fade into silence, and one that walks a tightrope between them.\n\n" +
      "You learned that long‑term potentiation and long‑term depression pull synapses up and down, while homeostatic plasticity keeps average activity in a safe band.\n\n" +
      "Only when these mechanisms work together can a brain both sharpen useful pathways and quiet useless ones without boiling over into chaos or sinking into stillness.\n\n" +
      "The secret of a stable, learning brain is not choosing change or control—but weaving both into one balanced plasticity system.",
  },
};

// Fill per-sequence music mapping once sequences are defined
MUSIC_BY_SEQUENCE_TITLE[populationCodingSequence.title] = MUSIC_MINECRAFT;
MUSIC_BY_SEQUENCE_TITLE[inhibitionSequence.title] = MUSIC_SEND_IN_THE_DRUMS;
MUSIC_BY_SEQUENCE_TITLE[emergentRhythmsSequence.title] = MUSIC_FANDANGO;
MUSIC_BY_SEQUENCE_TITLE[contrastNormalizationSequence.title] = MUSIC_IMITATION_GAME;
MUSIC_BY_SEQUENCE_TITLE[changeDetectionSequence.title] = MUSIC_WINTER;
MUSIC_BY_SEQUENCE_TITLE[multiplexedCodingSequence.title] = MUSIC_JAZZ_HALLOWEEN;
MUSIC_BY_SEQUENCE_TITLE[efferenceCopySequence.title] = MUSIC_ABSOLUTE_ZERO;
MUSIC_BY_SEQUENCE_TITLE[associativeMemorySequence.title] = MUSIC_EPIC_SPACE;
MUSIC_BY_SEQUENCE_TITLE[balancedPlasticitySequence.title] = MUSIC_BYZANTINE;

// Map each sequence title to a visual theme class on <body>
const THEME_BY_TITLE = {
  [neuronSequence.title]: "theme-neuron",
  [populationCodingSequence.title]: "theme-population",
  [inhibitionSequence.title]: "theme-inhibition",
  [emergentRhythmsSequence.title]: "theme-rhythms",
  [contrastNormalizationSequence.title]: "theme-contrast",
  [changeDetectionSequence.title]: "theme-change",
  [multiplexedCodingSequence.title]: "theme-multiplex",
  [efferenceCopySequence.title]: "theme-efference",
  [associativeMemorySequence.title]: "theme-associative",
  [balancedPlasticitySequence.title]: "theme-plasticity",
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadSequenceFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // basic sanity check
    if (!parsed || typeof parsed !== "object" || !parsed.steps || !parsed.introSlides) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function loadLibraryFromStorage() {
  let library = [];

  // Try to load any existing library from storage
  try {
    const rawLib = window.localStorage.getItem(LIBRARY_KEY);
    if (rawLib) {
      const parsedLib = JSON.parse(rawLib);
      if (Array.isArray(parsedLib)) {
        library = parsedLib;
      }
    }
  } catch {
    // ignore and fall back
  }

  // Keep only known sequences (drop any old Nile or legacy content)
  const allowedTitles = [
    neuronSequence.title,
    populationCodingSequence.title,
    inhibitionSequence.title,
    emergentRhythmsSequence.title,
    contrastNormalizationSequence.title,
    changeDetectionSequence.title,
    multiplexedCodingSequence.title,
    efferenceCopySequence.title,
    associativeMemorySequence.title,
    balancedPlasticitySequence.title,
  ];
  library = library.filter((seq) => seq && allowedTitles.includes(seq.title));

  // Ensure each of the target sequences is present at least once
  function ensureSequence(template) {
    const exists = library.some((seq) => seq && seq.title === template.title);
    if (!exists) {
      const clone = deepClone(template);
      clone.id = `seq-${library.length + 1}`;
      library.push(clone);
    }
  }

  ensureSequence(neuronSequence);
  ensureSequence(populationCodingSequence);
  ensureSequence(inhibitionSequence);
  ensureSequence(emergentRhythmsSequence);
  ensureSequence(contrastNormalizationSequence);
  ensureSequence(changeDetectionSequence);
  ensureSequence(multiplexedCodingSequence);
  ensureSequence(efferenceCopySequence);
  ensureSequence(associativeMemorySequence);
  ensureSequence(balancedPlasticitySequence);

  // Ensure every remaining sequence has an id
  library.forEach((seq, idx) => {
    if (seq && !seq.id) {
      seq.id = `seq-${idx + 1}`;
    }
  });

  return library;
}

function saveLibraryToStorage(library) {
  try {
    window.localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  } catch {
    // ignore storage errors
  }
}

// Backwards-compatible wrapper used in editor code: just saves the whole library.
function saveSequenceToStorage() {
  saveLibraryToStorage(sequenceLibrary);
}

// --- Global sequence library ---

let sequenceLibrary = loadLibraryFromStorage();
let currentSequenceIndex = 0;
let puzzleSequence = sequenceLibrary[currentSequenceIndex];
let musicAudio = null;
let currentMusicTrack = null;
let musicEnabled = true;
let sfxFailAudio = null;
let sfxRewardAudio = null;

// --- Lightweight Markdown renderer (bold, italics, line breaks) ---

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function markdownToHtml(text) {
  if (!text) return "";
  let out = escapeHtml(String(text));
  // bold **text**
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // italic *text*
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // line breaks
  out = out.replace(/\r\n|\r|\n/g, "<br>");
  return out;
}

function setMarkdown(el, text) {
  el.innerHTML = markdownToHtml(text);
}

function splitIntoSentences(text) {
  if (!text) return [];
  const normalized = String(text).replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const sentences = [];

  normalized.split(/\n{2,}/).forEach((para) => {
    let acc = "";
    const parts = para.split(/([.!?])/);
    for (let i = 0; i < parts.length; i++) {
      const chunk = parts[i];
      if (!chunk) continue;
      acc += chunk;
      if (/[.!?]/.test(chunk)) {
        const s = acc.trim();
        if (s) sentences.push(s);
        acc = "";
      }
    }
    const tail = acc.trim();
    if (tail) sentences.push(tail);
  });

  return sentences;
}

// Pharaoh / speaker avatar helper
function getAvatarOptionsForCurrentSequence(baseOpts) {
  const opts = baseOpts ? { ...baseOpts } : {};
  // Alternate: half the sequences use the default pharaoh, half use Socrates.
  if (typeof currentSequenceIndex === "number" && currentSequenceIndex % 2 === 1) {
    opts.avatarVariant = "socrates";
  }
  return opts;
}

// Pharaoh question helper
function createPharaohQuestionContainer(markdownText, optsArg) {
  const opts = optsArg || {};
  const row = document.createElement("div");
  row.className = "pharaoh-row" + (opts.mode === "prelude" ? " pharaoh-row-prelude" : "");

  const avatar = document.createElement("div");
  avatar.className = "pharaoh-avatar";
  const icon = document.createElement("div");
  function addOrbit(variant) {
    const orbit = document.createElement("div");
    orbit.className = `${variant}-orbit`;
    const ring = document.createElement("div");
    ring.className = `${variant}-star-ring`;
    orbit.appendChild(ring);
    avatar.appendChild(orbit);
  }

  if (opts.avatarVariant === "athena") {
    avatar.classList.add("athena-avatar");
    icon.className = "pharaoh-icon athena-icon";
    addOrbit("athena");
  } else if (opts.avatarVariant === "socrates") {
    avatar.classList.add("socrates-avatar");
    icon.className = "pharaoh-icon socrates-icon";
    addOrbit("socrates");
  } else if (opts.avatarVariant === "torch") {
    avatar.classList.add("torch-avatar");
    icon.className = "pharaoh-icon torch-icon";
    addOrbit("torch");
  } else if (opts.avatarVariant === "alchemist") {
    avatar.classList.add("alchemist-avatar");
    icon.className = "pharaoh-icon alchemist-icon";
    addOrbit("alchemist");
  } else if (opts.avatarVariant === "indiana") {
    avatar.classList.add("indiana-avatar");
    icon.className = "pharaoh-icon indiana-icon";
    addOrbit("indiana");
  } else {
    icon.className = "pharaoh-icon";
  }
  avatar.appendChild(icon);

  const column = document.createElement("div");
  column.className = "pharaoh-column";

  const bubble = document.createElement("div");
  bubble.className = "pharaoh-bubble";

  const textEl = document.createElement("div");
  textEl.className = "question-text pharaoh-text";
  bubble.appendChild(textEl);

  const nav = document.createElement("div");
  nav.className = "bubble-nav";

  const prevBtn = document.createElement("button");
  prevBtn.type = "button";
  prevBtn.className = "bubble-arrow";
  prevBtn.textContent = "‹";

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "bubble-arrow";
  nextBtn.textContent = "›";

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);

  column.appendChild(bubble);
  column.appendChild(nav);

  const list = (() => {
    const s = splitIntoSentences(markdownText);
    return s.length ? s : [markdownText];
  })();

  let currentIndex = 0;
  let timerId = null;

  function renderSentence() {
    setMarkdown(textEl, list[currentIndex]);
    bubble.classList.remove("bubble-fx");
    // force reflow
    void bubble.offsetWidth;
    bubble.classList.add("bubble-fx");
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === list.length - 1;
  }

  function clearTimer() {
    if (timerId != null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function startAutoAdvance() {
    clearTimer();
    if (list.length <= 1) {
      // Single bubble – immediately signal completion for prelude use
      if (opts.onSequenceDone) {
        opts.onSequenceDone();
      }
      return;
    }
    timerId = setInterval(() => {
      if (currentIndex < list.length - 1) {
        currentIndex += 1;
        renderSentence();
      } else {
        clearTimer();
        if (opts.onSequenceDone) {
          opts.onSequenceDone();
        }
      }
    }, 5000);
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderSentence();
      startAutoAdvance();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < list.length - 1) {
      currentIndex += 1;
      renderSentence();
      startAutoAdvance();
    }
  });

  renderSentence();
  startAutoAdvance();

  row.appendChild(avatar);
  row.appendChild(column);

  return { container: row };
}

// Thinker / Hypatia context helper
function getContextAvatarOptionsForCurrentSequence() {
  // Alternate context reader between sequences: even index → original thinker, odd index → Hypatia.
  if (typeof currentSequenceIndex !== "number") return {};
  return currentSequenceIndex % 2 === 1 ? { avatarVariant: "hypatia" } : {};
}

function createThinkerContextContainer(markdownText, optsArg) {
  const opts = optsArg || {};
  const row = document.createElement("div");
  row.className = "thinker-row";

  const avatar = document.createElement("div");
  avatar.className = "thinker-avatar";
  const icon = document.createElement("div");
  icon.className = "thinker-icon";
  if (opts.avatarVariant === "hypatia") {
    avatar.classList.add("hypatia-avatar");
    icon.classList.add("hypatia-icon");
  }
  avatar.appendChild(icon);

  const bubble = document.createElement("div");
  bubble.className = "thinker-bubble";

  const textEl = document.createElement("div");
  textEl.className = "explanation-text thinker-text";
  setMarkdown(textEl, markdownText);

  bubble.appendChild(textEl);
  row.appendChild(avatar);
  row.appendChild(bubble);

  return { container: row, textEl };
}

function hasContext(step) {
  if (!step || !step.context) return false;
  const ctx = step.context;
  const text = (ctx.text || "").trim();
  const title = (ctx.title || "").trim();
  return text.length > 0 || title.length > 0;
}

function showScoreFlash(delta, customText) {
  if (typeof document === "undefined") return;
  const overlay = document.createElement("div");
  overlay.className = "score-flash " + (delta >= 0 ? "gain" : "loss");
  if (customText) {
    overlay.textContent = customText;
  } else {
    const sign = delta > 0 ? "+" : delta < 0 ? "-" : "";
    overlay.textContent = `${sign}${Math.abs(delta)} pts`;
  }
  document.body.appendChild(overlay);
  setTimeout(() => {
    if (overlay.parentElement) {
      overlay.parentElement.removeChild(overlay);
    }
  }, 2000);
}

function getMaxBasePointsForStep(step) {
  if (!step || !step.main) return 15;
  const p = step.main;
  switch (p.puzzleKind) {
    case "closedQuestion":
      return 8;
    case "basketQuestion":
      return 20;
    case "chainBuilder":
      return 30;
    default:
      return 15;
  }
}

function getStepSummaryText() {
  const step = puzzleSequence.steps[state.stepIndex];
  const maxPerStep = getMaxBasePointsForStep(step);
  const earned = state.lastStepScore || 0;
  const sign = earned > 0 ? "+" : earned < 0 ? "-" : "";
  return `This riddle: ${sign}${Math.abs(earned)} / ${maxPerStep} points. Total score: ${state.score} points.`;
}

function showSequenceCountdown(onDone) {
  if (typeof document === "undefined") {
    if (onDone) onDone();
    return;
  }
  const overlay = document.createElement("div");
  overlay.className = "sequence-countdown";

  const numEl = document.createElement("div");
  numEl.className = "sequence-countdown-number";
  overlay.appendChild(numEl);

  document.body.appendChild(overlay);

  const values = ["3", "2", "1"];
  let idx = 0;

  function step() {
    numEl.textContent = values[idx];
    idx += 1;
    if (idx < values.length) {
      setTimeout(step, 1000);
    } else {
      setTimeout(() => {
        if (overlay.parentElement) {
          overlay.parentElement.removeChild(overlay);
        }
        if (onDone) onDone();
      }, 400);
    }
  }

  step();
}

// --- Music helpers ---

function ensureMusicUI() {
  if (typeof document === "undefined") return;
  if (musicAudio) return;

  musicAudio = document.createElement("audio");
  musicAudio.loop = true;
  musicAudio.volume = 0.4;
  musicAudio.style.display = "none";
  document.body.appendChild(musicAudio);

  const btn = document.createElement("button");
  btn.className = "music-toggle";
  btn.type = "button";
  btn.textContent = "Music: on";
  btn.addEventListener("click", () => {
    musicEnabled = !musicEnabled;
    btn.textContent = musicEnabled ? "Music: on" : "Music: off";
    if (musicEnabled) {
      updateMusicForState(true);
    } else if (musicAudio) {
      musicAudio.pause();
    }
  });
  document.body.appendChild(btn);

  // Try to satisfy autoplay policies: once the user interacts anywhere,
  // attempt to start the appropriate background track.
  document.addEventListener(
    "click",
    () => {
      updateMusicForState(true);
    },
    { once: true }
  );
}

function ensureSfxAudio() {
  if (typeof document === "undefined") return;
  if (!sfxFailAudio) {
    sfxFailAudio = new Audio(SFX_FAIL);
    sfxFailAudio.preload = "auto";
    sfxFailAudio.volume = 0.7;
  }
  if (!sfxRewardAudio) {
    sfxRewardAudio = new Audio(SFX_REWARD);
    sfxRewardAudio.preload = "auto";
    sfxRewardAudio.volume = 0.8;
  }
}

function playAnswerSound(isCorrect) {
  ensureSfxAudio();
  const audio = isCorrect ? sfxRewardAudio : sfxFailAudio;
  if (!audio) return;
  try {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch {
    // ignore
  }
}

function desiredTrackForState() {
  if (state.screen === "library") return MUSIC_SPARTANS;
  if (state.screen === "sequence") {
    if (puzzleSequence && MUSIC_BY_SEQUENCE_TITLE[puzzleSequence.title]) {
      return MUSIC_BY_SEQUENCE_TITLE[puzzleSequence.title];
    }
    // Fallback if for some reason a sequence has no explicit mapping yet
    return MUSIC_FOREST;
  }
  return null;
}

function updateMusicForState(forcePlay) {
  if (!musicAudio) return;
  const track = desiredTrackForState();
  if (!track || !musicEnabled) {
    musicAudio.pause();
    currentMusicTrack = null;
    return;
  }
  if (currentMusicTrack !== track) {
    currentMusicTrack = track;
    musicAudio.src = track;
    // Try to play; browsers may block until user interaction
    musicAudio
      .play()
      .catch(() => {
        // ignore autoplay errors
      });
  } else if (forcePlay) {
    musicAudio
      .play()
      .catch(() => {
        // ignore
      });
  }
}

// --- Engine state ---

const state = {
  screen: "library", // "library" | "sequence"
  mode: "play", // "play" | "edit"
  phase: "intro", // "intro" | "main" | "secondChance" | "explanation" | "context" | "done"
  introIndex: 0,
  stepIndex: 0,
  lastAnswerCorrect: null,
  score: 0,
  currentStepScore: 0,
  lastStepScore: 0, // total score earned in the last completed riddle
  mainCorrectStreak: 0, // consecutive correct main riddles
  sequenceStatsRecorded: false, // to avoid double-counting stats
};

const appEl = document.getElementById("app");

function applyThemeForCurrentSequence() {
  if (typeof document === "undefined") return;
  const body = document.body;
  if (!body) return;

  // Remove any previous theme classes
  const toRemove = [];
  body.classList.forEach((cls) => {
    if (cls.startsWith("theme-")) toRemove.push(cls);
  });
  toRemove.forEach((cls) => body.classList.remove(cls));

  // Apply theme only while playing a sequence
  if (state.screen === "sequence" && puzzleSequence && THEME_BY_TITLE[puzzleSequence.title]) {
    body.classList.add(THEME_BY_TITLE[puzzleSequence.title]);
  }
}

function render() {
  if (!appEl) return;
  appEl.innerHTML = "";

  let card;
  if (state.screen === "library") {
    card = renderLibrary();
  } else {
    switch (state.phase) {
      case "intro":
        card = renderIntroSlide();
        break;
      case "main":
        card = renderCurrentStep("main");
        break;
      case "secondChance":
        card = renderCurrentStep("secondChance");
        break;
      case "explanation":
        card = renderExplanation();
        break;
      case "context":
        card = renderContext();
        break;
      case "done":
        card = renderEndScreen();
        break;
      default:
        card = document.createElement("div");
        card.textContent = "Unknown phase.";
    }
  }

  applyThemeForCurrentSequence();
  appEl.appendChild(card);
  ensureMusicUI();
  updateMusicForState();
}

// --- Intro slides ---

function renderIntroSlide() {
  const slide = puzzleSequence.introSlides[state.introIndex];
  const totalSlides = puzzleSequence.introSlides.length;
  const stepInfo = `Intro ${state.introIndex + 1} of ${totalSlides}`;

  const card = createCardShell({
    badgeText: "Sequence intro",
    badgeSecondary: `${state.stepIndex + 1}/${puzzleSequence.steps.length} riddles ahead`,
    title: slide.title || puzzleSequence.title,
    subtitle: puzzleSequence.title,
    progressText: stepInfo,
  });

  const content = card.querySelector(".content");

  const pharaoh = createPharaohQuestionContainer(slide.text, getAvatarOptionsForCurrentSequence());
  content.appendChild(pharaoh.container);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent = "Read the story, then continue.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const backBtn = document.createElement("button");
  backBtn.className = "btn-ghost";
  backBtn.textContent = "Back";
  backBtn.disabled = state.introIndex === 0;
  backBtn.addEventListener("click", () => {
    if (state.introIndex > 0) {
      state.introIndex -= 1;
      render();
    }
  });

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn-primary";
  nextBtn.textContent = state.introIndex === totalSlides - 1 ? "Begin first riddle" : "Next intro";
  nextBtn.addEventListener("click", () => {
    if (state.introIndex < totalSlides - 1) {
      state.introIndex += 1;
      render();
    } else {
      // move into first main riddle
      state.phase = "main";
      state.stepIndex = 0;
      state.lastAnswerCorrect = null;
      state.currentStepScore = 0;
      render();
    }
  });

  right.appendChild(backBtn);
  right.appendChild(nextBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- Steps (main + second chance) ---

function renderCurrentStep(kind) {
  const step = puzzleSequence.steps[state.stepIndex];
  const puzzle = kind === "main" ? step.main : step.secondChance;

  const isSecondChance = kind === "secondChance";

  const badgeText = isSecondChance ? "Second chance riddle" : "Main riddle";
  const card = createCardShell({
    badgeText,
    badgeSecondary: step.name,
    title: step.name,
    subtitle: puzzleSequence.title,
    progressText: `Step ${state.stepIndex + 1} of ${puzzleSequence.steps.length}`,
  });

  const content = card.querySelector(".content");

  // Puzzle renderer returns an object with root element and getResult function
  const puzzleResult = renderPuzzle(puzzle);
  content.appendChild(puzzleResult.root);

  const feedbackEl = document.createElement("div");
  feedbackEl.className = "feedback";
  content.appendChild(feedbackEl);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent = isSecondChance
    ? "If you miss again, the temple will reveal its secret."
    : "You have one attempt. Think carefully.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const checkBtn = document.createElement("button");
  checkBtn.className = "btn-primary";
  checkBtn.textContent = "Check answer";

  const skipBtn = document.createElement("button");
  skipBtn.className = "btn-secondary";
  skipBtn.textContent = isSecondChance ? "Skip to explanation" : "Skip to next";

  checkBtn.addEventListener("click", () => {
    const { valid, correct, message } = puzzleResult.getResult();
    if (!valid) {
      feedbackEl.textContent = message || "Please answer the riddle first.";
      feedbackEl.className = "feedback incorrect";
      return;
    }
    state.lastAnswerCorrect = !!correct;
    playAnswerSound(!!correct);

    // streak tracking for main riddles
    let usedDouble = false;
    if (!isSecondChance) {
      if (correct) {
        state.mainCorrectStreak = (state.mainCorrectStreak || 0) + 1;
        if (state.mainCorrectStreak === 3) {
          usedDouble = true;
          state.mainCorrectStreak = 0; // reset after granting double points
        }
      } else {
        state.mainCorrectStreak = 0;
      }
    }

    // base scoring (with possible double points on main riddles)
    let delta = 0;
    if (isSecondChance) {
      // second chance: unchanged
      delta = correct ? 5 : -5;
    } else {
      // main riddle: scoring depends on puzzle type
      let baseGain = 15;
      let baseLoss = -10;
      switch (puzzle.puzzleKind) {
        case "closedQuestion":
          baseGain = 8;
          baseLoss = -8;
          break;
        case "basketQuestion":
          baseGain = 20;
          baseLoss = -15;
          break;
        case "chainBuilder":
          baseGain = 30;
          baseLoss = -10;
          break;
        default:
          baseGain = 15;
          baseLoss = -10;
      }

      if (correct) {
        delta = usedDouble ? baseGain * 2 : baseGain;
      } else {
        delta = baseLoss;
      }
    }

    state.score += delta;
    state.currentStepScore = (state.currentStepScore || 0) + delta;
    state.lastStepScore = state.currentStepScore;

    const flashMessage =
      !isSecondChance && correct && usedDouble ? `Double Points! +${delta}` : undefined;
    showScoreFlash(delta, flashMessage);

    feedbackEl.textContent = correct ? "Correct! The gate opens onward." : "Not quite. The stones remain still.";
    feedbackEl.className = "feedback " + (correct ? "correct" : "incorrect");

    // Advance after short delay so player can read feedback
    setTimeout(() => {
      if (correct) {
        goToNextMainStep();
      } else {
        if (isSecondChance) {
          // Go to explanation
          state.phase = "explanation";
          render();
        } else {
          // Go to second chance
          state.phase = "secondChance";
          render();
        }
      }
    }, 700);
  });

  skipBtn.addEventListener("click", () => {
    if (isSecondChance) {
      state.phase = "explanation";
    } else {
      // Skipping main goes straight to second chance as an easier variant
      state.phase = "secondChance";
    }
    state.lastAnswerCorrect = null;
    render();
  });

  right.appendChild(skipBtn);
  right.appendChild(checkBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

function goToNextMainStep() {
  if (state.stepIndex < puzzleSequence.steps.length - 1) {
    const step = puzzleSequence.steps[state.stepIndex];
    if (hasContext(step)) {
      // show scientific context before moving to next main riddle
      state.phase = "context";
    } else {
      state.stepIndex += 1;
      state.phase = "main";
      state.lastAnswerCorrect = null;
      state.currentStepScore = 0;
    }
  } else {
    state.phase = "done";
  }
  render();
}

// --- Explanation phase ---

function renderExplanation() {
  const step = puzzleSequence.steps[state.stepIndex];
  const expl = step.explanation;

  const card = createCardShell({
    badgeText: "Explanation",
    badgeSecondary: step.name,
    title: expl.title || "The Temple Speaks",
    subtitle: puzzleSequence.title,
    progressText: `Step ${state.stepIndex + 1} of ${puzzleSequence.steps.length}`,
  });

  const content = card.querySelector(".content");

  const pharaoh = createPharaohQuestionContainer(expl.text, getAvatarOptionsForCurrentSequence());
  content.appendChild(pharaoh.container);

  const summary = document.createElement("div");
  summary.className = "score-summary";
  summary.textContent = getStepSummaryText();
  content.appendChild(summary);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent = "You may start the journey again or continue deeper into the temple.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const restartBtn = document.createElement("button");
  restartBtn.className = "btn-secondary";
  restartBtn.textContent = "Restart from beginning";
  restartBtn.addEventListener("click", () => {
    state.phase = "intro";
    state.introIndex = 0;
    state.stepIndex = 0;
    state.lastAnswerCorrect = null;
    state.score = 0;
    state.currentStepScore = 0;
    state.lastStepScore = 0;
    state.mainCorrectStreak = 0;
    state.sequenceStatsRecorded = false;
    render();
  });

  const continueBtn = document.createElement("button");
  continueBtn.className = "btn-primary";
  continueBtn.textContent =
    state.stepIndex < puzzleSequence.steps.length - 1 ? "Continue to next riddle" : "Finish sequence";
  continueBtn.addEventListener("click", () => {
    if (state.stepIndex < puzzleSequence.steps.length - 1) {
      const currentStep = puzzleSequence.steps[state.stepIndex];
      if (hasContext(currentStep)) {
        state.phase = "context";
      } else {
        state.stepIndex += 1;
        state.phase = "main";
        state.currentStepScore = 0;
      }
    } else {
      state.phase = "done";
    }
    state.lastAnswerCorrect = null;
    render();
  });

  right.appendChild(restartBtn);
  right.appendChild(continueBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- End screen ---

function renderEndScreen() {
  const end = puzzleSequence.endScreen || defaultPuzzleSequence.endScreen;

  const card = createCardShell({
    badgeText: "Sequence finished",
    badgeSecondary: `${puzzleSequence.steps.length} riddles completed`,
    title: (end && end.title) || "You have passed the temple",
    subtitle: puzzleSequence.title,
    progressText: "End of chain",
  });

  const content = card.querySelector(".content");

  const p = document.createElement("p");
  p.className = "intro-text";
  setMarkdown(p, (end && end.text) || defaultPuzzleSequence.endScreen.text);
  content.appendChild(p);

  const summary = document.createElement("div");
  summary.className = "score-summary";
  const stepsArr = Array.isArray(puzzleSequence.steps) ? puzzleSequence.steps : [];
  const maxTotal = stepsArr.reduce((sum, step) => sum + getMaxBasePointsForStep(step), 0);
  const sign = state.score > 0 ? "+" : state.score < 0 ? "-" : "";
  summary.textContent = `Final score: ${sign}${Math.abs(state.score)} / ${maxTotal} points.`;
  content.appendChild(summary);

  // Record stats once per run
  if (!state.sequenceStatsRecorded && Array.isArray(sequenceLibrary) && puzzleSequence) {
    state.sequenceStatsRecorded = true;
    const seq = sequenceLibrary[currentSequenceIndex];
    if (seq) {
      const stepsCount = Array.isArray(puzzleSequence.steps) ? puzzleSequence.steps.length : 0;
      const rawPoints = state.score || 0;
      seq.statsRuns = (seq.statsRuns || 0) + 1;
      seq.statsPointsAccum = (seq.statsPointsAccum || 0) + rawPoints;
      seq.statsRiddlesAccum = (seq.statsRiddlesAccum || 0) + stepsCount;
      saveLibraryToStorage(sequenceLibrary);
    }
  }
  const rawPoints = state.score || 0;

  const divisionBox = document.createElement("div");
  divisionBox.className = "division-box";

  const line1 = document.createElement("div");
  line1.className = "division-line division-line-1";
  line1.textContent = `You scored ${rawPoints} points in this sequence.`;

  divisionBox.appendChild(line1);
  content.appendChild(divisionBox);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const backBtn = document.createElement("button");
  backBtn.className = "btn-primary";
  backBtn.textContent = "Back to menu";
  backBtn.addEventListener("click", () => {
    state.screen = "library";
    state.mode = "play";
    state.phase = "intro";
    state.introIndex = 0;
    state.stepIndex = 0;
    state.lastAnswerCorrect = null;
    state.currentStepScore = 0;
    state.lastStepScore = 0;
    state.mainCorrectStreak = 0;
    state.sequenceStatsRecorded = false;
    render();
  });

  const feedbackBtn = document.createElement("button");
  feedbackBtn.className = "btn-secondary";
  feedbackBtn.textContent = "Give us feedback";
  feedbackBtn.addEventListener("click", () => {
    try {
      window.open(
        "https://silicon-polonium-5e1.notion.site/2c2c99e043b1805a815ccc14829a3e2c?pvs=105",
        "_blank",
        "noopener"
      );
    } catch {
      // ignore window.open errors (e.g. popup blockers)
    }
  });

  right.appendChild(feedbackBtn);
  right.appendChild(backBtn);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- Context slide between main riddles ---

function renderContext() {
  const step = puzzleSequence.steps[state.stepIndex];
  const ctx = step.context || {};

  const card = createCardShell({
    badgeText: "Scientific context",
    badgeSecondary: step.name,
    title: ctx.title || "Context",
    subtitle: puzzleSequence.title,
    progressText:
      state.stepIndex < puzzleSequence.steps.length - 1
        ? `Between step ${state.stepIndex + 1} and ${state.stepIndex + 2}`
        : `After final step`,
  });

  const content = card.querySelector(".content");
  const thinker = createThinkerContextContainer(ctx.text || "", getContextAvatarOptionsForCurrentSequence());
  content.appendChild(thinker.container);

  const summary = document.createElement("div");
  summary.className = "score-summary";
  summary.textContent = getStepSummaryText();
  content.appendChild(summary);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent =
    state.stepIndex < puzzleSequence.steps.length - 1
      ? "When you are ready, continue to the next main riddle."
      : "Continue to the end of the sequence.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn-primary";
  nextBtn.textContent =
    state.stepIndex < puzzleSequence.steps.length - 1 ? "Go to next riddle" : "Finish sequence";
  nextBtn.addEventListener("click", () => {
    if (state.stepIndex < puzzleSequence.steps.length - 1) {
      state.stepIndex += 1;
      state.phase = "main";
      state.lastAnswerCorrect = null;
      render();
    } else {
      state.phase = "done";
      render();
    }
  });

  right.appendChild(nextBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- Editor mode helpers ---

function createEmptyPuzzleOfKind(kind) {
  switch (kind) {
    case "closedQuestion":
      return {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question: "Your question here?",
        options: ["Answer A", "Answer B"],
        correctIndex: 0,
      };
    case "basketQuestion":
      return {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt: "Sort the items into the correct baskets.",
        baskets: ["Basket A", "Basket B"],
        items: [
          { label: "Item 1", correctBasketIndex: 0 },
          { label: "Item 2", correctBasketIndex: 0 },
          { label: "Item 3", correctBasketIndex: 0 },
          { label: "Item 4", correctBasketIndex: 0 },
          { label: "Item 5", correctBasketIndex: 0 },
        ],
      };
    case "chainBuilder":
      return {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt: "Place the events in the correct order.",
        elements: ["First element", "Second element", "Third element"],
      };
    case "pairMatching":
      return {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt: "Match each item on the left with one on the right.",
        left: ["Left 1", "Left 2", "Left 3", "Left 4"],
        right: ["Right 1", "Right 2", "Right 3", "Right 4"],
        mapping: [0, 1, 2, 3],
      };
    case "logicMinefield":
      return {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt: "Only one of these statements is true.",
        statements: ["Statement 1", "Statement 2", "Statement 3", "Statement 4"],
        correctIndex: 0,
      };
    default:
      return {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question: "Your question here?",
        options: ["Answer A", "Answer B"],
        correctIndex: 0,
      };
  }
}

function ensureMainPuzzle(step, kind) {
  if (!step.main || step.main.puzzleKind !== kind) {
    step.main = createEmptyPuzzleOfKind(kind);
  }
}

function ensureSecondChance(step) {
  if (!step.secondChance || step.secondChance.puzzleKind !== "closedQuestion") {
    step.secondChance = createEmptyPuzzleOfKind("closedQuestion");
  }
}

// --- Editor mode ---

function renderEditor() {
  const card = createCardShell({
    badgeText: "Creator mode",
    badgeSecondary: "Edit puzzle sequence",
    title: "Puzzle Sequence Editor",
    subtitle: puzzleSequence.title,
    progressText: "Editor",
  });

  const content = card.querySelector(".content");

  const info = document.createElement("p");
  info.className = "muted";
  info.textContent =
    "Fill in the fields below to change the riddles. These changes are saved only in this browser.";
  content.appendChild(info);

  // Sequence title
  const seqGroup = document.createElement("div");
  seqGroup.className = "field-group";
  const seqLabel = document.createElement("label");
  seqLabel.className = "field-label";
  seqLabel.textContent = "Sequence title";
  const seqInput = document.createElement("input");
  seqInput.className = "input";
  seqInput.type = "text";
  seqInput.value = puzzleSequence.title || "";
  seqInput.addEventListener("input", (e) => {
    puzzleSequence.title = e.target.value;
  });
  seqGroup.appendChild(seqLabel);
  seqGroup.appendChild(seqInput);
  content.appendChild(seqGroup);

  // Intro slides editor
  const introSection = document.createElement("div");
  introSection.className = "editor-section";
  const introHeader = document.createElement("div");
  introHeader.className = "editor-section-header";
  introHeader.textContent = "Intro slides (shown before the first riddle)";
  introSection.appendChild(introHeader);

  if (!Array.isArray(puzzleSequence.introSlides)) {
    puzzleSequence.introSlides = [];
  }

  puzzleSequence.introSlides.forEach((slide, idx) => {
    if (!slide || typeof slide !== "object") {
      puzzleSequence.introSlides[idx] = { type: "intro", title: "", text: "" };
    }
    const box = document.createElement("div");
    box.className = "field-group";

    const label = document.createElement("div");
    label.className = "field-label";
    label.textContent = `Intro slide ${idx + 1}`;

    const titleInput = document.createElement("input");
    titleInput.className = "input";
    titleInput.type = "text";
    titleInput.placeholder = "Title (optional)";
    titleInput.value = slide.title || "";
    titleInput.addEventListener("input", (e) => {
      puzzleSequence.introSlides[idx].title = e.target.value;
      puzzleSequence.introSlides[idx].type = "intro";
    });

    const textArea = document.createElement("textarea");
    textArea.className = "editor-textarea";
    textArea.placeholder = "Intro text...";
    textArea.value = slide.text || "";
    textArea.addEventListener("input", (e) => {
      puzzleSequence.introSlides[idx].text = e.target.value;
      puzzleSequence.introSlides[idx].type = "intro";
    });

    box.appendChild(label);
    box.appendChild(titleInput);
    box.appendChild(textArea);
    introSection.appendChild(box);
  });

  const introButtonsWrapper = document.createElement("div");
  introButtonsWrapper.className = "field-group inline";
  const introHint = document.createElement("div");
  introHint.className = "muted";
  introHint.textContent = "You can add or remove intro slides.";

  const introButtons = document.createElement("div");
  introButtons.className = "buttons-right";

  const addIntroBtn = document.createElement("button");
  addIntroBtn.className = "btn-ghost";
  addIntroBtn.type = "button";
  addIntroBtn.textContent = "Add intro slide";
  addIntroBtn.addEventListener("click", () => {
    puzzleSequence.introSlides.push({
      type: "intro",
      title: "New intro slide",
      text: "",
    });
    render();
  });

  const removeIntroBtn = document.createElement("button");
  removeIntroBtn.className = "btn-ghost";
  removeIntroBtn.type = "button";
  removeIntroBtn.textContent = "Remove last intro";
  removeIntroBtn.disabled = puzzleSequence.introSlides.length === 0;
  removeIntroBtn.addEventListener("click", () => {
    if (puzzleSequence.introSlides.length > 0) {
      puzzleSequence.introSlides.pop();
      if (state.introIndex >= puzzleSequence.introSlides.length) {
        state.introIndex = Math.max(0, puzzleSequence.introSlides.length - 1);
      }
      render();
    }
  });

  introButtons.appendChild(addIntroBtn);
  introButtons.appendChild(removeIntroBtn);
  introButtonsWrapper.appendChild(introHint);
  introButtonsWrapper.appendChild(introButtons);
  introSection.appendChild(introButtonsWrapper);
  content.appendChild(introSection);

  // Step navigation
  const stepNav = document.createElement("div");
  stepNav.className = "step-nav";
  const stepInfo = document.createElement("span");
  stepInfo.textContent = `Editing step ${state.stepIndex + 1} of ${puzzleSequence.steps.length}`;
  const stepButtons = document.createElement("div");
  stepButtons.className = "buttons-right";
  const prevBtn = document.createElement("button");
  prevBtn.className = "btn-ghost";
  prevBtn.textContent = "Previous step";
  prevBtn.disabled = state.stepIndex === 0;
  prevBtn.addEventListener("click", () => {
    if (state.stepIndex > 0) {
      state.stepIndex -= 1;
      render();
    }
  });
  const nextBtn = document.createElement("button");
  nextBtn.className = "btn-ghost";
  nextBtn.textContent = "Next step";
  nextBtn.disabled = state.stepIndex >= puzzleSequence.steps.length - 1;
  nextBtn.addEventListener("click", () => {
    if (state.stepIndex < puzzleSequence.steps.length - 1) {
      state.stepIndex += 1;
      render();
    }
  });

  const addStepBtn = document.createElement("button");
  addStepBtn.className = "btn-secondary";
  addStepBtn.textContent = "Add step";
  addStepBtn.addEventListener("click", () => {
    const idx = puzzleSequence.steps.length;
    const newStep = {
      name: `Main riddle ${idx + 1}`,
      main: createEmptyPuzzleOfKind("closedQuestion"),
      secondChance: createEmptyPuzzleOfKind("closedQuestion"),
      explanation: { title: "Explanation", text: "" },
      context: { title: "Scientific context", text: "" },
    };
    puzzleSequence.steps.push(newStep);
    state.stepIndex = idx;
    saveSequenceToStorage(puzzleSequence);
    render();
  });

  stepButtons.appendChild(prevBtn);
  stepButtons.appendChild(nextBtn);
  stepButtons.appendChild(addStepBtn);
  stepNav.appendChild(stepInfo);
  stepNav.appendChild(stepButtons);
  content.appendChild(stepNav);

  const step = puzzleSequence.steps[state.stepIndex];
  ensureSecondChance(step);

  // Step name
  const nameGroup = document.createElement("div");
  nameGroup.className = "field-group";
  const nameLabel = document.createElement("label");
  nameLabel.className = "field-label";
  nameLabel.textContent = "Step name (shown to player)";
  const nameInput = document.createElement("input");
  nameInput.className = "input";
  nameInput.type = "text";
  nameInput.value = step.name || "";
  nameInput.addEventListener("input", (e) => {
    step.name = e.target.value;
  });
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  content.appendChild(nameGroup);

  // Main riddle section
  const mainSection = document.createElement("div");
  mainSection.className = "editor-section";
  const mainHeader = document.createElement("div");
  mainHeader.className = "editor-section-header";
  mainHeader.textContent = "Main riddle";
  mainSection.appendChild(mainHeader);

  const kindGroup = document.createElement("div");
  kindGroup.className = "field-group inline";
  const kindLabel = document.createElement("label");
  kindLabel.className = "field-label";
  kindLabel.textContent = "Puzzle type";
  const kindSelect = document.createElement("select");
  kindSelect.className = "select";
  const kinds = [
    { value: "closedQuestion", label: "Closed question (2 answers)" },
    { value: "basketQuestion", label: "Basket question (2 baskets, 5 items)" },
    { value: "chainBuilder", label: "Chain builder (3 elements)" },
    { value: "pairMatching", label: "Pair matching (4 pairs)" },
    { value: "logicMinefield", label: "Logic minefield (4 statements)" },
  ];
  const currentKind = (step.main && step.main.puzzleKind) || "closedQuestion";
  kinds.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k.value;
    opt.textContent = k.label;
    if (k.value === currentKind) opt.selected = true;
    kindSelect.appendChild(opt);
  });
  kindSelect.addEventListener("change", (e) => {
    ensureMainPuzzle(step, e.target.value);
    render();
  });
  kindGroup.appendChild(kindLabel);
  kindGroup.appendChild(kindSelect);
  mainSection.appendChild(kindGroup);

  ensureMainPuzzle(step, currentKind);
  const mainFields = document.createElement("div");
  buildPuzzleEditorFields(step.main, mainFields, "main");
  mainSection.appendChild(mainFields);
  content.appendChild(mainSection);

  // Second chance section (always closed question)
  const scSection = document.createElement("div");
  scSection.className = "editor-section";
  const scHeader = document.createElement("div");
  scHeader.className = "editor-section-header";
  scHeader.textContent = "Second Chance riddle (always closed question)";
  scSection.appendChild(scHeader);

  const scFields = document.createElement("div");
  buildClosedQuestionEditor(step.secondChance, scFields, "Second chance");
  scSection.appendChild(scFields);
  content.appendChild(scSection);

  // Explanation
  const exSection = document.createElement("div");
  exSection.className = "editor-section";
  const exHeader = document.createElement("div");
  exHeader.className = "editor-section-header";
  exHeader.textContent = "Explanation shown after two wrong answers";
  exSection.appendChild(exHeader);

  if (!step.explanation) {
    step.explanation = { title: "Explanation", text: "" };
  }

  const exTitleGroup = document.createElement("div");
  exTitleGroup.className = "field-group";
  const exTitleLabel = document.createElement("label");
  exTitleLabel.className = "field-label";
  exTitleLabel.textContent = "Explanation title";
  const exTitleInput = document.createElement("input");
  exTitleInput.className = "input";
  exTitleInput.type = "text";
  exTitleInput.value = step.explanation.title || "";
  exTitleInput.addEventListener("input", (e) => {
    step.explanation.title = e.target.value;
  });
  exTitleGroup.appendChild(exTitleLabel);
  exTitleGroup.appendChild(exTitleInput);

  const exTextGroup = document.createElement("div");
  exTextGroup.className = "field-group";
  const exTextLabel = document.createElement("label");
  exTextLabel.className = "field-label";
  exTextLabel.textContent = "Explanation text";
  const exTextArea = document.createElement("textarea");
  exTextArea.className = "editor-textarea";
  exTextArea.value = step.explanation.text || "";
  exTextArea.addEventListener("input", (e) => {
    step.explanation.text = e.target.value;
  });
  exTextGroup.appendChild(exTextLabel);
  exTextGroup.appendChild(exTextArea);

  exSection.appendChild(exTitleGroup);
  exSection.appendChild(exTextGroup);
  content.appendChild(exSection);

  // Context between this step and the next main riddle
  const ctxSection = document.createElement("div");
  ctxSection.className = "editor-section";
  const ctxHeader = document.createElement("div");
  ctxHeader.className = "editor-section-header";
  ctxHeader.textContent = "Scientific context (shown between this riddle and the next one)";
  ctxSection.appendChild(ctxHeader);

  if (!step.context) {
    step.context = { title: "Scientific context", text: "" };
  }

  const ctxTitleGroup = document.createElement("div");
  ctxTitleGroup.className = "field-group";
  const ctxTitleLabel = document.createElement("label");
  ctxTitleLabel.className = "field-label";
  ctxTitleLabel.textContent = "Context title";
  const ctxTitleInput = document.createElement("input");
  ctxTitleInput.className = "input";
  ctxTitleInput.type = "text";
  ctxTitleInput.value = step.context.title || "";
  ctxTitleInput.addEventListener("input", (e) => {
    step.context.title = e.target.value;
  });
  ctxTitleGroup.appendChild(ctxTitleLabel);
  ctxTitleGroup.appendChild(ctxTitleInput);

  const ctxTextGroup = document.createElement("div");
  ctxTextGroup.className = "field-group";
  const ctxTextLabel = document.createElement("label");
  ctxTextLabel.className = "field-label";
  ctxTextLabel.textContent =
    state.stepIndex < puzzleSequence.steps.length - 1
      ? "Context text (this will appear before the next main riddle)"
      : "Context text (not shown after the last riddle)";
  const ctxTextArea = document.createElement("textarea");
  ctxTextArea.className = "editor-textarea";
  ctxTextArea.value = step.context.text || "";
  ctxTextArea.addEventListener("input", (e) => {
    step.context.text = e.target.value;
  });
  ctxTextGroup.appendChild(ctxTextLabel);
  ctxTextGroup.appendChild(ctxTextArea);

  ctxSection.appendChild(ctxTitleGroup);
  ctxSection.appendChild(ctxTextGroup);
  content.appendChild(ctxSection);

  // Final slide editor
  const endSection = document.createElement("div");
  endSection.className = "editor-section";
  const endHeader = document.createElement("div");
  endHeader.className = "editor-section-header";
  endHeader.textContent = "Final slide (shown after the last riddle)";
  endSection.appendChild(endHeader);

  if (!puzzleSequence.endScreen) {
    puzzleSequence.endScreen = deepClone(defaultPuzzleSequence.endScreen);
  }

  const endTitleGroup = document.createElement("div");
  endTitleGroup.className = "field-group";
  const endTitleLabel = document.createElement("label");
  endTitleLabel.className = "field-label";
  endTitleLabel.textContent = "Final slide title";
  const endTitleInput = document.createElement("input");
  endTitleInput.className = "input";
  endTitleInput.type = "text";
  endTitleInput.value = puzzleSequence.endScreen.title || "";
  endTitleInput.addEventListener("input", (e) => {
    puzzleSequence.endScreen.title = e.target.value;
  });
  endTitleGroup.appendChild(endTitleLabel);
  endTitleGroup.appendChild(endTitleInput);

  const endTextGroup = document.createElement("div");
  endTextGroup.className = "field-group";
  const endTextLabel = document.createElement("label");
  endTextLabel.className = "field-label";
  endTextLabel.textContent = "Final slide text";
  const endTextArea = document.createElement("textarea");
  endTextArea.className = "editor-textarea";
  endTextArea.value = puzzleSequence.endScreen.text || "";
  endTextArea.addEventListener("input", (e) => {
    puzzleSequence.endScreen.text = e.target.value;
  });
  endTextGroup.appendChild(endTextLabel);
  endTextGroup.appendChild(endTextArea);

  endSection.appendChild(endTitleGroup);
  endSection.appendChild(endTextGroup);
  content.appendChild(endSection);

  // Feedback + buttons
  const feedback = document.createElement("div");
  feedback.className = "feedback";
  content.appendChild(feedback);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent = "When you're ready, save and return to player mode.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn-secondary";
  cancelBtn.textContent = "Back to player";
  cancelBtn.addEventListener("click", () => {
    state.mode = "play";
    render();
  });

  const saveBtn = document.createElement("button");
  saveBtn.className = "btn-primary";
  saveBtn.textContent = "Save & play";
  saveBtn.addEventListener("click", () => {
    saveSequenceToStorage();
    state.mode = "play";
    state.phase = "intro";
    state.introIndex = 0;
    state.stepIndex = 0;
    state.lastAnswerCorrect = null;
    state.score = 0;
    state.currentStepScore = 0;
    state.lastStepScore = 0;
    feedback.textContent = "Saved. Returning to player…";
    feedback.className = "feedback correct";
    setTimeout(() => render(), 500);
  });

  right.appendChild(cancelBtn);
  right.appendChild(saveBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- Library / landing page ---

function renderModeSelect() {
  const card = createCardShell({
    badgeText: "Choose version",
    badgeSecondary: "Same riddles, two layouts",
    title: "Ancient Riddles",
    subtitle: "Pick the layout that fits your device.",
    progressText: "Version selection",
  });

  // Deprecated mode select card; keep stub so old calls don't break if any remain.
  // For now just fall through to the library view.
  return renderLibrary();
}

function renderLibrary() {
  const total = sequenceLibrary.length;
  const card = createCardShell({
    badgeText: "Sequence library",
    badgeSecondary: `${total} sequence${total === 1 ? "" : "s"}`,
    title: "Neuron's Riddles",
    subtitle: "Start the neuron riddle journey.",
    progressText: "Library",
  });

  const content = card.querySelector(".content");

  const layout = document.createElement("div");
  layout.className = "library-layout";

  const minerva = document.createElement("div");
  minerva.className = "minerva-column";

  const minervaArt = document.createElement("div");
  minervaArt.className = "minerva-art";
  minerva.appendChild(minervaArt);

  layout.appendChild(minerva);

  // Overall stats across all sequences
  let overallPoints = 0;
  sequenceLibrary.forEach((seq) => {
    overallPoints += seq.statsPointsAccum || 0;
  });

  const overall = document.createElement("div");
  overall.className = "overall-stats";
  overall.textContent =
    overallPoints > 0
      ? `Overall: ${overallPoints} points collected across all sequences.`
      : "Overall: no results yet – play a sequence to start collecting points.";
  const rightColumn = document.createElement("div");
  rightColumn.className = "library-main";
  rightColumn.appendChild(overall);

  const list = document.createElement("div");
  list.className = "sequence-list";

  sequenceLibrary.forEach((seq, idx) => {
    const item = document.createElement("div");
    item.className = "sequence-item";

    const themeClass = THEME_BY_TITLE[seq.title];
    if (themeClass) {
      item.classList.add(themeClass);
    }

    const left = document.createElement("div");
    left.className = "sequence-item-main";
    const title = document.createElement("div");
    title.className = "sequence-title";
    title.textContent = seq.title || `Sequence ${idx + 1}`;

    const meta = document.createElement("div");
    meta.className = "sequence-meta";
    const steps = Array.isArray(seq.steps) ? seq.steps.length : 0;
    const intros = Array.isArray(seq.introSlides) ? seq.introSlides.length : 0;

    const runs = seq.statsRuns || 0;
    const totalPts = seq.statsPointsAccum || 0;

    const statsText =
      runs > 0
        ? ` • Played ${runs} time${runs === 1 ? "" : "s"} • ${totalPts} pts total`
        : "";

    meta.textContent = `${steps} riddles • ${intros} intro slide${intros === 1 ? "" : "s"}${statsText}`;

    left.appendChild(title);
    left.appendChild(meta);

    const right = document.createElement("div");
    right.className = "buttons-right";

    const playBtn = document.createElement("button");
    playBtn.className = "btn-primary";
    playBtn.textContent = "Play";
    playBtn.addEventListener("click", () => {
      currentSequenceIndex = idx;
      puzzleSequence = sequenceLibrary[currentSequenceIndex];
      state.screen = "sequence";
      state.mode = "play";
      state.phase = "intro";
      state.introIndex = 0;
      state.stepIndex = 0;
      state.lastAnswerCorrect = null;
      state.score = 0;
      state.currentStepScore = 0;
      state.lastStepScore = 0;
      state.mainCorrectStreak = 0;
      state.sequenceStatsRecorded = false;
      render();
      showSequenceCountdown(() => {
        // After countdown, intro slides are already prepared; nothing else needed
      });
    });

    right.appendChild(playBtn);

    item.appendChild(left);
    item.appendChild(right);
    list.appendChild(item);
  });

  rightColumn.appendChild(list);
  layout.appendChild(rightColumn);
  content.appendChild(layout);

  return card;
}

function buildPuzzleEditorFields(puzzle, container, prefix) {
  switch (puzzle.puzzleKind) {
    case "closedQuestion":
      buildClosedQuestionEditor(puzzle, container, prefix);
      break;
    case "basketQuestion":
      buildBasketEditor(puzzle, container);
      break;
    case "chainBuilder":
      buildChainEditor(puzzle, container);
      break;
    case "pairMatching":
      buildPairMatchingEditor(puzzle, container);
      break;
    case "logicMinefield":
      buildLogicMinefieldEditor(puzzle, container);
      break;
    default:
      buildClosedQuestionEditor(puzzle, container, prefix);
  }
}

function buildClosedQuestionEditor(puzzle, container, labelPrefix) {
  if (!puzzle.options || puzzle.options.length < 2) {
    puzzle.options = ["Answer A", "Answer B"];
    puzzle.correctIndex = 0;
  }
  const qGroup = document.createElement("div");
  qGroup.className = "field-group";
  const qLabel = document.createElement("label");
  qLabel.className = "field-label";
  qLabel.textContent = labelPrefix ? `${labelPrefix} question` : "Question";
  const qInput = document.createElement("input");
  qInput.className = "input";
  qInput.type = "text";
  qInput.value = puzzle.question || "";
  qInput.addEventListener("input", (e) => {
    puzzle.question = e.target.value;
  });
  qGroup.appendChild(qLabel);
  qGroup.appendChild(qInput);
  container.appendChild(qGroup);

  const answersGroup = document.createElement("div");
  answersGroup.className = "field-group";
  const answersLabel = document.createElement("div");
  answersLabel.className = "field-label";
  answersLabel.textContent = "Answers (choose which one is correct)";
  answersGroup.appendChild(answersLabel);

  const answersList = document.createElement("div");
  answersList.className = "answers-list";

  puzzle.options.forEach((opt, idx) => {
    const row = document.createElement("div");
    row.className = "answer-row";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `${labelPrefix || "cq"}-correct`;
    radio.checked = puzzle.correctIndex === idx;
    radio.addEventListener("change", () => {
      puzzle.correctIndex = idx;
    });

    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = opt || "";
    input.addEventListener("input", (e) => {
      puzzle.options[idx] = e.target.value;
    });

    row.appendChild(radio);
    row.appendChild(input);
    answersList.appendChild(row);
  });

  answersGroup.appendChild(answersList);
  container.appendChild(answersGroup);
}

function buildBasketEditor(puzzle, container) {
  if (!Array.isArray(puzzle.baskets) || puzzle.baskets.length < 2) {
    puzzle.baskets = ["Basket A", "Basket B"];
  }
  if (!Array.isArray(puzzle.items) || puzzle.items.length < 5) {
    puzzle.items = Array.from({ length: 5 }, (_, i) => ({
      label: `Item ${i + 1}`,
      correctBasketIndex: 0,
    }));
  }

  const promptGroup = document.createElement("div");
  promptGroup.className = "field-group";
  const pLabel = document.createElement("label");
  pLabel.className = "field-label";
  pLabel.textContent = "Prompt (what should the player do?)";
  const pInput = document.createElement("input");
  pInput.className = "input";
  pInput.type = "text";
  pInput.value = puzzle.prompt || "";
  pInput.addEventListener("input", (e) => {
    puzzle.prompt = e.target.value;
  });
  promptGroup.appendChild(pLabel);
  promptGroup.appendChild(pInput);
  container.appendChild(promptGroup);

  const basketsGroup = document.createElement("div");
  basketsGroup.className = "field-group";
  const bLabel = document.createElement("div");
  bLabel.className = "field-label";
  bLabel.textContent = "Basket names";
  basketsGroup.appendChild(bLabel);

  const basketsRow = document.createElement("div");
  basketsRow.className = "answers-list";

  puzzle.baskets.forEach((bName, idx) => {
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = bName || "";
    input.addEventListener("input", (e) => {
      puzzle.baskets[idx] = e.target.value;
    });
    basketsRow.appendChild(input);
  });

  basketsGroup.appendChild(basketsRow);
  container.appendChild(basketsGroup);

  const itemsGroup = document.createElement("div");
  itemsGroup.className = "field-group";
  const itemsLabel = document.createElement("div");
  itemsLabel.className = "field-label";
  itemsLabel.textContent = "Items (and which basket they belong to)";
  itemsGroup.appendChild(itemsLabel);

  const itemsList = document.createElement("div");
  itemsList.className = "answers-list";

  puzzle.items.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "answer-row";

    const itemInput = document.createElement("input");
    itemInput.className = "input";
    itemInput.type = "text";
    itemInput.value = item.label || "";
    itemInput.addEventListener("input", (e) => {
      puzzle.items[idx].label = e.target.value;
    });

    const select = document.createElement("select");
    select.className = "select";
    puzzle.baskets.forEach((bName, bIdx) => {
      const opt = document.createElement("option");
      opt.value = String(bIdx);
      opt.textContent = bName || `Basket ${bIdx + 1}`;
      if (bIdx === item.correctBasketIndex) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener("change", (e) => {
      puzzle.items[idx].correctBasketIndex = Number(e.target.value);
    });

    row.appendChild(itemInput);
    row.appendChild(select);
    itemsList.appendChild(row);
  });

  itemsGroup.appendChild(itemsList);
  container.appendChild(itemsGroup);
}

function buildChainEditor(puzzle, container) {
  if (!Array.isArray(puzzle.elements) || puzzle.elements.length < 3) {
    puzzle.elements = ["First element", "Second element", "Third element"];
  }

  const promptGroup = document.createElement("div");
  promptGroup.className = "field-group";
  const pLabel = document.createElement("label");
  pLabel.className = "field-label";
  pLabel.textContent = "Prompt (what should the player do?)";
  const pInput = document.createElement("input");
  pInput.className = "input";
  pInput.type = "text";
  pInput.value = puzzle.prompt || "";
  pInput.addEventListener("input", (e) => {
    puzzle.prompt = e.target.value;
  });
  promptGroup.appendChild(pLabel);
  promptGroup.appendChild(pInput);
  container.appendChild(promptGroup);

  const elementsGroup = document.createElement("div");
  elementsGroup.className = "field-group";
  const eLabel = document.createElement("div");
  eLabel.className = "field-label";
  eLabel.textContent = "Correct order of elements";
  elementsGroup.appendChild(eLabel);

  const list = document.createElement("div");
  list.className = "answers-list";

  puzzle.elements.forEach((el, idx) => {
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = el || "";
    input.addEventListener("input", (e) => {
      puzzle.elements[idx] = e.target.value;
    });
    list.appendChild(input);
  });

  elementsGroup.appendChild(list);
  container.appendChild(elementsGroup);
}

function buildPairMatchingEditor(puzzle, container) {
  if (!Array.isArray(puzzle.left) || puzzle.left.length < 4) {
    puzzle.left = ["Left 1", "Left 2", "Left 3", "Left 4"];
  }
  if (!Array.isArray(puzzle.right) || puzzle.right.length < 4) {
    puzzle.right = ["Right 1", "Right 2", "Right 3", "Right 4"];
  }
  if (!Array.isArray(puzzle.mapping) || puzzle.mapping.length < 4) {
    puzzle.mapping = [0, 1, 2, 3];
  }

  const promptGroup = document.createElement("div");
  promptGroup.className = "field-group";
  const pLabel = document.createElement("label");
  pLabel.className = "field-label";
  pLabel.textContent = "Prompt (what should the player do?)";
  const pInput = document.createElement("input");
  pInput.className = "input";
  pInput.type = "text";
  pInput.value = puzzle.prompt || "";
  pInput.addEventListener("input", (e) => {
    puzzle.prompt = e.target.value;
  });
  promptGroup.appendChild(pLabel);
  promptGroup.appendChild(pInput);
  container.appendChild(promptGroup);

  const leftGroup = document.createElement("div");
  leftGroup.className = "field-group";
  const leftLabel = document.createElement("div");
  leftLabel.className = "field-label";
  leftLabel.textContent = "Left side items";
  leftGroup.appendChild(leftLabel);

  const leftList = document.createElement("div");
  leftList.className = "answers-list";
  puzzle.left.forEach((val, idx) => {
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = val || "";
    input.addEventListener("input", (e) => {
      puzzle.left[idx] = e.target.value;
    });
    leftList.appendChild(input);
  });
  leftGroup.appendChild(leftList);
  container.appendChild(leftGroup);

  const rightGroup = document.createElement("div");
  rightGroup.className = "field-group";
  const rightLabel = document.createElement("div");
  rightLabel.className = "field-label";
  rightLabel.textContent = "Right side items";
  rightGroup.appendChild(rightLabel);

  const rightList = document.createElement("div");
  rightList.className = "answers-list";
  puzzle.right.forEach((val, idx) => {
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = val || "";
    input.addEventListener("input", (e) => {
      puzzle.right[idx] = e.target.value;
    });
    rightList.appendChild(input);
  });
  rightGroup.appendChild(rightList);
  container.appendChild(rightGroup);

  const mappingGroup = document.createElement("div");
  mappingGroup.className = "field-group";
  const mapLabel = document.createElement("div");
  mapLabel.className = "field-label";
  mapLabel.textContent = "Which right-side item is the correct match for each left-side item?";
  mappingGroup.appendChild(mapLabel);

  const mapList = document.createElement("div");
  mapList.className = "answers-list";
  puzzle.left.forEach((leftItem, idx) => {
    const row = document.createElement("div");
    row.className = "answer-row";
    const label = document.createElement("span");
    label.textContent = leftItem || `Left ${idx + 1}`;
    const select = document.createElement("select");
    select.className = "select";
    puzzle.right.forEach((rItem, rIdx) => {
      const opt = document.createElement("option");
      opt.value = String(rIdx);
      opt.textContent = rItem || `Right ${rIdx + 1}`;
      if (rIdx === puzzle.mapping[idx]) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener("change", (e) => {
      puzzle.mapping[idx] = Number(e.target.value);
    });
    row.appendChild(label);
    row.appendChild(select);
    mapList.appendChild(row);
  });

  mappingGroup.appendChild(mapList);
  container.appendChild(mappingGroup);
}

function buildLogicMinefieldEditor(puzzle, container) {
  if (!Array.isArray(puzzle.statements) || puzzle.statements.length < 4) {
    puzzle.statements = ["Statement 1", "Statement 2", "Statement 3", "Statement 4"];
  }

  const promptGroup = document.createElement("div");
  promptGroup.className = "field-group";
  const pLabel = document.createElement("label");
  pLabel.className = "field-label";
  pLabel.textContent = "Prompt (explain the logic puzzle)";
  const pInput = document.createElement("input");
  pInput.className = "input";
  pInput.type = "text";
  pInput.value = puzzle.prompt || "";
  pInput.addEventListener("input", (e) => {
    puzzle.prompt = e.target.value;
  });
  promptGroup.appendChild(pLabel);
  promptGroup.appendChild(pInput);
  container.appendChild(promptGroup);

  const statementsGroup = document.createElement("div");
  statementsGroup.className = "field-group";
  const sLabel = document.createElement("div");
  sLabel.className = "field-label";
  sLabel.textContent = "Statements (choose which one is true)";
  statementsGroup.appendChild(sLabel);

  const list = document.createElement("div");
  list.className = "answers-list";

  puzzle.statements.forEach((st, idx) => {
    const row = document.createElement("div");
    row.className = "answer-row";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "logic-correct";
    radio.checked = puzzle.correctIndex === idx;
    radio.addEventListener("change", () => {
      puzzle.correctIndex = idx;
    });
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = st || "";
    input.addEventListener("input", (e) => {
      puzzle.statements[idx] = e.target.value;
    });
    row.appendChild(radio);
    row.appendChild(input);
    list.appendChild(row);
  });

  statementsGroup.appendChild(list);
  container.appendChild(statementsGroup);
}

// --- Puzzle renderers ---

function renderPuzzle(puzzle) {
  switch (puzzle.puzzleKind) {
    case "closedQuestion":
      return renderClosedQuestion(puzzle);
    case "basketQuestion":
      return renderBasketQuestion(puzzle);
    case "chainBuilder":
      return renderChainBuilder(puzzle);
    case "pairMatching":
      return renderPairMatching(puzzle);
    case "logicMinefield":
      return renderLogicMinefield(puzzle);
    default: {
      const root = document.createElement("div");
      root.textContent = "Unknown puzzle type.";
      return {
        root,
        getResult: () => ({ valid: false, correct: false, message: "Unknown puzzle type." }),
      };
    }
  }
}

function renderClosedQuestion(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(
    puzzle.question,
    getAvatarOptionsForCurrentSequence()
  );
  root.appendChild(container);

  const options = document.createElement("div");
  options.className = "options";

  const name = `cq-${Math.random().toString(36).slice(2)}`;

  puzzle.options.forEach((optText, idx) => {
    const row = document.createElement("label");
    row.className = "option-row";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = String(idx);

    const span = document.createElement("span");
    span.className = "option-label";
    setMarkdown(span, optText);

    row.appendChild(input);
    row.appendChild(span);
    options.appendChild(row);
  });

  root.appendChild(options);

  return {
    root,
    getResult: () => {
      const checked = root.querySelector(`input[name="${name}"]:checked`);
      if (!checked) {
        return { valid: false, correct: false, message: "Choose one of the two answers." };
      }
      const idx = Number(checked.value);
      const correct = idx === puzzle.correctIndex;
      return { valid: true, correct };
    },
  };
}

function renderBasketQuestion(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(
    puzzle.prompt,
    getAvatarOptionsForCurrentSequence()
  );
  root.appendChild(container);

  const hint = document.createElement("div");
  hint.className = "muted";
  hint.textContent = "Drag each item into the correct basket.";
  root.appendChild(hint);

  const dndWrapper = document.createElement("div");
  dndWrapper.className = "basket-dnd";

  const pool = document.createElement("div");
  pool.className = "basket-pool";
  const poolLabel = document.createElement("div");
  poolLabel.className = "field-label";
  poolLabel.textContent = "Items to sort";
  pool.appendChild(poolLabel);

  const poolArea = document.createElement("div");
  poolArea.className = "basket-drop";
  pool.appendChild(poolArea);

  const columns = document.createElement("div");
  columns.className = "basket-columns";

  const assignments = Array(puzzle.items.length).fill(null); // basket index or null
  const itemEls = [];

  function makeItemChip(idx) {
    const chip = document.createElement("div");
    chip.className = "item-chip";
    chip.draggable = true;
    chip.dataset.index = String(idx);
    chip.textContent = puzzle.items[idx].label;

    chip.addEventListener("dragstart", (e) => {
      chip.classList.add("dragging");
      e.dataTransfer?.setData("text/plain", String(idx));
    });
    chip.addEventListener("dragend", () => {
      chip.classList.remove("dragging");
    });
    return chip;
  }

  function handleDrop(targetBasketIndex, dropZone, event) {
    event.preventDefault();
    dropZone.classList.remove("hover");
    const data = event.dataTransfer?.getData("text/plain");
    const idx = data != null && data !== "" ? Number(data) : null;
    if (idx == null || Number.isNaN(idx)) return;
    const chip = itemEls[idx];
    if (!chip) return;

    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }

    dropZone.appendChild(chip);
    assignments[idx] = targetBasketIndex;
  }

  // Pool for "no basket yet"
  poolArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    poolArea.classList.add("hover");
  });
  poolArea.addEventListener("dragleave", () => {
    poolArea.classList.remove("hover");
  });
  poolArea.addEventListener("drop", (e) => {
    handleDrop(null, poolArea, e);
  });

  // Stationary baskets
  puzzle.baskets.forEach((basketLabel, bIdx) => {
    const col = document.createElement("div");
    col.className = "basket";

    const title = document.createElement("div");
    title.className = "basket-title";
    title.textContent = basketLabel;
    col.appendChild(title);

    const drop = document.createElement("div");
    drop.className = "basket-drop";
    drop.dataset.basketIndex = String(bIdx);

    drop.addEventListener("dragover", (e) => {
      e.preventDefault();
      drop.classList.add("hover");
    });
    drop.addEventListener("dragleave", () => {
      drop.classList.remove("hover");
    });
    drop.addEventListener("drop", (e) => handleDrop(bIdx, drop, e));

    col.appendChild(drop);
    columns.appendChild(col);
  });

  // Create items in pool
  puzzle.items.forEach((_, idx) => {
    const chip = makeItemChip(idx);
    itemEls[idx] = chip;
    poolArea.appendChild(chip);
  });

  dndWrapper.appendChild(pool);
  dndWrapper.appendChild(columns);
  root.appendChild(dndWrapper);

  return {
    root,
    getResult: () => {
      // Ensure every item assigned
      for (let i = 0; i < assignments.length; i++) {
        if (assignments[i] === null || assignments[i] === undefined) {
          return {
            valid: false,
            correct: false,
            message: "Place every item into one of the baskets.",
          };
        }
      }
      // Check correctness
      let correct = true;
      for (let i = 0; i < puzzle.items.length; i++) {
        if (assignments[i] !== puzzle.items[i].correctBasketIndex) {
          correct = false;
          break;
        }
      }
      return { valid: true, correct };
    },
  };
}

function renderChainBuilder(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(
    puzzle.prompt,
    getAvatarOptionsForCurrentSequence()
  );
  root.appendChild(container);

  const hint = document.createElement("div");
  hint.className = "muted";
  hint.textContent = "Drag the tiles into the correct order.";
  root.appendChild(hint);

  const layout = document.createElement("div");
  layout.className = "chain-layout";

  const slotsRow = document.createElement("div");
  slotsRow.className = "chain-slots-row";

  const pool = document.createElement("div");
  pool.className = "chain-pool basket-drop";

  const assignments = [null, null, null]; // slot -> element index
  const usedBy = Array(puzzle.elements.length).fill(null); // element -> slot index
  const chips = [];

  function makeChip(idx) {
    const chip = document.createElement("div");
    chip.className = "item-chip";
    chip.draggable = true;
    chip.dataset.index = String(idx);
    chip.textContent = puzzle.elements[idx];

    chip.addEventListener("dragstart", (e) => {
      chip.classList.add("dragging");
      e.dataTransfer?.setData("text/plain", String(idx));
    });
    chip.addEventListener("dragend", () => {
      chip.classList.remove("dragging");
    });

    return chip;
  }

  function clearAssignmentForElement(elementIdx) {
    const slotIdx = usedBy[elementIdx];
    if (slotIdx == null) return;
    usedBy[elementIdx] = null;
    assignments[slotIdx] = null;
  }

  function handleDropOnSlot(slotIdx, slotEl, event) {
    event.preventDefault();
    slotEl.classList.remove("hover");
    const data = event.dataTransfer?.getData("text/plain");
    const elementIdx = data != null && data !== "" ? Number(data) : null;
    if (elementIdx == null || Number.isNaN(elementIdx)) return;
    const chip = chips[elementIdx];
    if (!chip) return;

    // free chip from previous usage
    clearAssignmentForElement(elementIdx);

    // if slot already had element, move it back to pool
    if (assignments[slotIdx] != null) {
      const oldElementIdx = assignments[slotIdx];
      usedBy[oldElementIdx] = null;
      const oldChip = chips[oldElementIdx];
      if (oldChip && oldChip.parentElement) {
        oldChip.parentElement.removeChild(oldChip);
        pool.appendChild(oldChip);
      }
    }

    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }
    slotEl.appendChild(chip);

    assignments[slotIdx] = elementIdx;
    usedBy[elementIdx] = slotIdx;
  }

  // Create three slots with arrows between
  for (let i = 0; i < 3; i++) {
    const slotWrapper = document.createElement("div");
    slotWrapper.className = "chain-slot-wrapper";

    const slot = document.createElement("div");
    slot.className = "basket-drop chain-slot";
    slot.dataset.slotIndex = String(i);

    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      slot.classList.add("hover");
    });
    slot.addEventListener("dragleave", () => {
      slot.classList.remove("hover");
    });
    slot.addEventListener("drop", (e) => handleDropOnSlot(i, slot, e));

    const label = document.createElement("div");
    label.className = "muted chain-slot-label";
    label.textContent = ["First", "Second", "Third"][i];

    slotWrapper.appendChild(slot);
    slotWrapper.appendChild(label);
    slotsRow.appendChild(slotWrapper);

    if (i < 2) {
      const arrow = document.createElement("div");
      arrow.className = "chain-arrow";
      arrow.textContent = "➜";
      slotsRow.appendChild(arrow);
    }
  }

  // Pool with tiles underneath
  puzzle.elements.forEach((_, idx) => {
    const chip = makeChip(idx);
    chips[idx] = chip;
    pool.appendChild(chip);
  });

  // dropping back to pool
  pool.addEventListener("dragover", (e) => {
    e.preventDefault();
    pool.classList.add("hover");
  });
  pool.addEventListener("dragleave", () => {
    pool.classList.remove("hover");
  });
  pool.addEventListener("drop", (e) => {
    e.preventDefault();
    pool.classList.remove("hover");
    const data = e.dataTransfer?.getData("text/plain");
    const elementIdx = data != null && data !== "" ? Number(data) : null;
    if (elementIdx == null || Number.isNaN(elementIdx)) return;
    const chip = chips[elementIdx];
    if (!chip) return;

    clearAssignmentForElement(elementIdx);
    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }
    pool.appendChild(chip);
  });

  layout.appendChild(slotsRow);
  layout.appendChild(pool);
  root.appendChild(layout);

  return {
    root,
    getResult: () => {
      if (assignments.some((a) => a == null)) {
        return { valid: false, correct: false, message: "Fill all three positions in the chain." };
      }
      // correct order is the original array order
      let correct = true;
      for (let i = 0; i < 3; i++) {
        if (assignments[i] !== i) {
          correct = false;
          break;
        }
      }
      return { valid: true, correct };
    },
  };
}

function renderPairMatching(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(
    puzzle.prompt,
    getAvatarOptionsForCurrentSequence()
  );
  root.appendChild(container);

  const hint = document.createElement("div");
  hint.className = "muted";
  hint.textContent = "Drag each item from the right onto its matching item on the left.";
  root.appendChild(hint);

  const layout = document.createElement("div");
  layout.className = "match-layout";

  const leftCol = document.createElement("div");
  leftCol.className = "match-column";

  const rightCol = document.createElement("div");
  rightCol.className = "match-column match-right-pool";

  const rightTitle = document.createElement("div");
  rightTitle.className = "field-label";
  rightTitle.textContent = "Right side items";
  rightCol.appendChild(rightTitle);

  const rightPool = document.createElement("div");
  rightPool.className = "basket-drop";
  rightCol.appendChild(rightPool);

  const matches = Array(puzzle.left.length).fill(null); // right index or null
  const usedBy = Array(puzzle.right.length).fill(null); // left index or null
  const rightChips = [];

  function makeRightChip(idx) {
    const chip = document.createElement("div");
    chip.className = "item-chip";
    chip.draggable = true;
    chip.dataset.index = String(idx);
    chip.textContent = puzzle.right[idx];

    chip.addEventListener("dragstart", (e) => {
      chip.classList.add("dragging");
      e.dataTransfer?.setData("text/plain", String(idx));
    });
    chip.addEventListener("dragend", () => {
      chip.classList.remove("dragging");
    });

    return chip;
  }

  function removeAssignmentForRight(rightIdx) {
    const leftIdx = usedBy[rightIdx];
    if (leftIdx == null) return;
    usedBy[rightIdx] = null;
    matches[leftIdx] = null;
  }

  function handleDropOnLeft(leftIdx, dropZone, event) {
    event.preventDefault();
    dropZone.classList.remove("hover");
    const data = event.dataTransfer?.getData("text/plain");
    const rightIdx = data != null && data !== "" ? Number(data) : null;
    if (rightIdx == null || Number.isNaN(rightIdx)) return;
    const chip = rightChips[rightIdx];
    if (!chip) return;

    // clear previous assignment of this right item
    removeAssignmentForRight(rightIdx);

    // clear any previous right item attached to this left
    if (matches[leftIdx] != null) {
      const oldRightIdx = matches[leftIdx];
      usedBy[oldRightIdx] = null;
      const oldChip = rightChips[oldRightIdx];
      if (oldChip && oldChip.parentElement) {
        oldChip.parentElement.removeChild(oldChip);
        rightPool.appendChild(oldChip);
      }
    }

    // move chip into this left row
    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }
    dropZone.appendChild(chip);

    matches[leftIdx] = rightIdx;
    usedBy[rightIdx] = leftIdx;
  }

  // Left side items with drop targets
  puzzle.left.forEach((leftLabel, idx) => {
    const row = document.createElement("div");
    row.className = "match-left-row";

    const label = document.createElement("div");
    label.className = "item-label";
    setMarkdown(label, leftLabel);

    const target = document.createElement("div");
    target.className = "basket-drop match-target";
    target.dataset.leftIndex = String(idx);

    target.addEventListener("dragover", (e) => {
      e.preventDefault();
      target.classList.add("hover");
    });
    target.addEventListener("dragleave", () => {
      target.classList.remove("hover");
    });
    target.addEventListener("drop", (e) => handleDropOnLeft(idx, target, e));

    row.appendChild(label);
    row.appendChild(target);
    leftCol.appendChild(row);
  });

  // Right side chips
  puzzle.right.forEach((rightLabel, idx) => {
    const chip = makeRightChip(idx);
    rightChips[idx] = chip;
    rightPool.appendChild(chip);
  });

  // Allow dropping back to right pool to unassign
  rightPool.addEventListener("dragover", (e) => {
    e.preventDefault();
    rightPool.classList.add("hover");
  });
  rightPool.addEventListener("dragleave", () => {
    rightPool.classList.remove("hover");
  });
  rightPool.addEventListener("drop", (e) => {
    e.preventDefault();
    rightPool.classList.remove("hover");
    const data = e.dataTransfer?.getData("text/plain");
    const rightIdx = data != null && data !== "" ? Number(data) : null;
    if (rightIdx == null || Number.isNaN(rightIdx)) return;
    const chip = rightChips[rightIdx];
    if (!chip) return;
    // remove from left if assigned
    removeAssignmentForRight(rightIdx);
    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }
    rightPool.appendChild(chip);
  });

  layout.appendChild(leftCol);
  layout.appendChild(rightCol);
  root.appendChild(layout);

  return {
    root,
    getResult: () => {
      if (matches.some((m) => m == null)) {
        return { valid: false, correct: false, message: "Create all four pairs before checking." };
      }

      let correct = true;
      for (let i = 0; i < puzzle.left.length; i++) {
        if (matches[i] !== puzzle.mapping[i]) {
          correct = false;
          break;
        }
      }
      return { valid: true, correct };
    },
  };
}

function renderLogicMinefield(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(
    puzzle.prompt,
    getAvatarOptionsForCurrentSequence()
  );
  root.appendChild(container);

  const hint = document.createElement("div");
  hint.className = "muted";
  hint.textContent = "Only one inscription can be true. Choose carefully.";
  root.appendChild(hint);

  const options = document.createElement("div");
  options.className = "options";

  const name = `lm-${Math.random().toString(36).slice(2)}`;

  puzzle.statements.forEach((text, idx) => {
    const row = document.createElement("label");
    row.className = "option-row";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = String(idx);

    const span = document.createElement("span");
    span.className = "option-label";
    setMarkdown(span, text);

    row.appendChild(input);
    row.appendChild(span);
    options.appendChild(row);
  });

  root.appendChild(options);

  return {
    root,
    getResult: () => {
      const checked = root.querySelector(`input[name="${name}"]:checked`);
      if (!checked) {
        return { valid: false, correct: false, message: "Choose exactly one inscription." };
      }
      const idx = Number(checked.value);
      const correct = idx === puzzle.correctIndex;
      return { valid: true, correct };
    },
  };
}

// --- UI helpers ---

function createCardShell({ badgeText, badgeSecondary, title, subtitle, progressText }) {
  const card = document.createElement("div");
  card.className = "card";

  const header = document.createElement("div");
  header.className = "card-header";

  const left = document.createElement("div");

  const badgeRow = document.createElement("div");
  badgeRow.style.display = "flex";
  badgeRow.style.gap = "8px";
  badgeRow.style.alignItems = "center";

  const badge = document.createElement("div");
  badge.className = "badge";
  badge.textContent = badgeText;

  const badge2 = document.createElement("div");
  badge2.className = "badge badge-secondary";
  badge2.textContent = badgeSecondary;

  badgeRow.appendChild(badge);
  badgeRow.appendChild(badge2);

  const titleEl = document.createElement("h2");
  titleEl.className = "title";
  titleEl.textContent = title;

  const subtitleEl = document.createElement("p");
  subtitleEl.className = "subtitle";
  subtitleEl.textContent = subtitle;

  left.appendChild(badgeRow);
  left.appendChild(titleEl);
  left.appendChild(subtitleEl);

  const right = document.createElement("div");
  right.className = "progress";

  const progressSpan = document.createElement("span");
  progressSpan.textContent = progressText;
  right.appendChild(progressSpan);

  if (state.screen === "sequence") {
    const scoreWrap = document.createElement("div");
    scoreWrap.className = "score-thermo";

    const labelSpan = document.createElement("span");
    labelSpan.className = "score-thermo-label";
    labelSpan.textContent = "Score";

    const bar = document.createElement("div");
    bar.className = "score-bar";

    const fill = document.createElement("div");
    const isGain = state.score >= 0;
    fill.className = "score-bar-fill " + (isGain ? "gain" : "loss");

    const stepsArr = puzzleSequence && Array.isArray(puzzleSequence.steps) ? puzzleSequence.steps : [];
    const maxAbs =
      stepsArr.length > 0
        ? stepsArr.reduce((sum, step) => sum + getMaxBasePointsForStep(step), 0)
        : 15;
    const absScore = Math.min(maxAbs, Math.abs(state.score));
    const pct = (absScore / maxAbs) * 100;
    fill.style.width = `${Math.max(6, pct)}%`;

    bar.appendChild(fill);

    const valueSpan = document.createElement("span");
    valueSpan.className = "score-thermo-value";
    const sign = state.score > 0 ? "+" : state.score < 0 ? "-" : "";
    valueSpan.textContent = `${sign}${Math.abs(state.score)} pts`;

    scoreWrap.appendChild(labelSpan);
    scoreWrap.appendChild(bar);
    scoreWrap.appendChild(valueSpan);
    right.appendChild(scoreWrap);

  }

  if (state.screen === "sequence") {
    const libraryBtn = document.createElement("button");
    libraryBtn.className = "btn-ghost btn-compact";
    libraryBtn.type = "button";
    libraryBtn.textContent = "All sequences";
    libraryBtn.addEventListener("click", () => {
      state.screen = "library";
      state.mode = "play";
      render();
    });

    right.appendChild(libraryBtn);
  }

  header.appendChild(left);
  header.appendChild(right);
  card.appendChild(header);

  const divider = document.createElement("div");
  divider.className = "divider";
  card.appendChild(divider);

  const content = document.createElement("div");
  content.className = "content";
  card.appendChild(content);

  return card;
}

// --- Start ---

(function bootstrap() {
  render();
})();



