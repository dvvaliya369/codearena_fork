// Trash Talk Generator - Funny insults and disses for AI opponents

export interface TrashTalkOptions {
  opponent: string;
  context?: 'coding' | 'general' | 'tech' | 'debugging';
  intensity?: 'mild' | 'medium' | 'savage';
}

const codingInsults = [
  "writes code like they're debugging with console.log statements from 2003",
  "thinks semicolons are optional because they learned JavaScript from a cereal box",
  "probably uses Comic Sans in their IDE and thinks it's 'quirky'",
  "writes functions longer than a CVS receipt and twice as confusing",
  "names variables like 'x1', 'temp2', and 'finalFinalVersion3'",
  "uses 47 different npm packages to center a div",
  "still thinks jQuery is modern and Internet Explorer is 'just quirky'",
  "writes code comments like 'this does the thing' and calls it documentation",
  "copies from Stack Overflow without reading and wonders why their app crashes",
  "probably thinks TypeScript is just JavaScript with a fancy hat",
  "uses tabs and spaces randomly like they're playing code roulette",
  "writes CSS that only works on their specific browser window size",
  "thinks git commit messages like 'fixed stuff' are perfectly fine",
  "debugs by commenting out random lines until something works",
  "uses nested callbacks deeper than Inception and twice as confusing"
];

const techInsults = [
  "probably thinks the cloud is just someone else's weather",
  "calls tech support to ask how to restart their computer",
  "thinks RAM is what you do to open a door aggressively",
  "believes 'turning it off and on again' is advanced troubleshooting",
  "probably uses 'password123' and thinks adding the exclamation mark makes it secure",
  "thinks blockchain is a new type of building material",
  "calls WiFi 'the internet machine' unironically",
  "believes more RGB lights makes their computer faster",
  "thinks a firewall is something you build in Minecraft",
  "probably downloads RAM from sketchy websites"
];

const generalInsults = [
  "brings a printed MapQuest direction to a Tesla convention",
  "probably asks Siri why she can't see them waving",
  "thinks 'going viral' means they need to see a doctor",
  "uses Internet Explorer by choice and calls it 'retro'",
  "probably types with two fingers and looks at the keyboard for each letter",
  "thinks airplane mode helps them fly on vacation",
  "believes deleting browser history makes their computer faster",
  "probably saves files on the desktop and calls it 'organization'",
  "thinks the space bar is for astronauts",
  "probably clicks 'download now' on every pop-up thinking it's a game"
];

const debuggingInsults = [
  "debugs with print statements like it's 1985 and computers cost more than cars",
  "thinks stepping through code means literally walking around their desk",
  "probably blames the compiler when their logic is broken",
  "fixes bugs by changing random things until the error messages change color",
  "thinks a race condition is something that happens at NASCAR",
  "debugs production code at 3 AM and calls it 'living dangerously'",
  "probably thinks a memory leak is when you forget where you put your keys",
  "believes error messages are just suggestions, not requirements",
  "fixes one bug and creates three more like they're breeding digital gremlins",
  "thinks breakpoints are where you stop for coffee while coding"
];

export function generateTrashTalk({ opponent, context = 'coding', intensity = 'medium' }: TrashTalkOptions): string {
  let insultPool: string[] = [];
  
  switch (context) {
    case 'coding':
      insultPool = codingInsults;
      break;
    case 'tech':
      insultPool = techInsults;
      break;
    case 'debugging':
      insultPool = debuggingInsults;
      break;
    case 'general':
    default:
      insultPool = generalInsults;
      break;
  }

  const randomInsult = insultPool[Math.floor(Math.random() * insultPool.length)];
  
  const intensityPrefixes = {
    mild: [
      `Hey ${opponent}, I bet you`,
      `Listen ${opponent}, you probably`,
      `${opponent}, you likely`,
    ],
    medium: [
      `Oh ${opponent}, you definitely`,
      `${opponent}, I guarantee you`,
      `Let me guess ${opponent}, you`,
    ],
    savage: [
      `${opponent}, you absolutely`,
      `I'm calling it now - ${opponent}`,
      `Breaking news: ${opponent}`,
    ]
  };

  const intensitySuffixes = {
    mild: [
      ` 😅`,
      ` (just kidding!)`,
      ` - but we're still friends, right?`,
    ],
    medium: [
      ` 🔥`,
      ` (mic drop)`,
      ` - roasted!`,
    ],
    savage: [
      ` 💀`,
      ` (emotional damage!)`,
      ` - absolutely demolished!`,
    ]
  };

  const prefix = intensityPrefixes[intensity][Math.floor(Math.random() * intensityPrefixes[intensity].length)];
  const suffix = intensitySuffixes[intensity][Math.floor(Math.random() * intensitySuffixes[intensity].length)];

  return `${prefix} ${randomInsult}${suffix}`;
}

export function generateTrashTalkPrompt(originalPrompt: string, opponent: string): string {
  const trashTalk = generateTrashTalk({ 
    opponent, 
    context: 'coding', 
    intensity: 'medium' 
  });
  
  return `${originalPrompt}

🔥 TRASH TALK MODE ACTIVATED 🔥
Your opponent is: ${opponent}
Trash talk: ${trashTalk}

While generating your response, occasionally throw in some playful, humorous jabs at ${opponent}. Keep it funny and lighthearted - we're here for entertainment, not actual insults! Be creative with your roasts while still delivering a great solution to the prompt.`;
}

// Pre-built example trash talks for demonstration
export const exampleTrashTalks = [
  "Dave, you probably copy-paste code from Stack Overflow without reading it and wonder why your app crashes every Tuesday 🔥",
  "Sarah, I bet you name your variables like 'thing1' and 'stuff2' and call it 'self-documenting code' 😅",
  "Mike, you definitely use 73 npm packages to center a div and think it's efficient (mic drop)",
  "Jenny, you absolutely debug with alert() statements like it's 1999 and browsers had feelings 💀"
];
