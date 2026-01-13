let z = 10;


function openWindow(id) {
  const w = document.getElementById(id);

  w.style.display = "block";
  w.style.zIndex = ++z;

 
  const rect = w.getBoundingClientRect();
  w.style.left = (window.innerWidth - rect.width) / 2 + "px";
  w.style.top  = (window.innerHeight - rect.height) / 2 + "px";
}



document.querySelectorAll(".desktop-icon").forEach(icon => {
  icon.onclick = () => openWindow(icon.dataset.window);
});


document.querySelectorAll(".title-bar-controls button").forEach(btn => {
  btn.onclick = e => e.target.closest(".window").style.display = "none";
});


document.querySelectorAll(".window").forEach(win => {
  const bar = win.querySelector(".title-bar");
  let x=0,y=0;
  bar.onmousedown = e => {
    x=e.clientX; y=e.clientY;
    document.onmousemove = m => {
      win.style.left = win.offsetLeft + (m.clientX-x) + "px";
      win.style.top  = win.offsetTop  + (m.clientY-y) + "px";
      x=m.clientX; y=m.clientY;
    };
    document.onmouseup = () => document.onmousemove=null;
  };
});


const input = document.getElementById("cmd-input");
const output = document.getElementById("cmd-output");

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.toLowerCase();
    output.innerHTML += cmd + "\n";
    run(cmd);
    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});

function run(cmd) {
  const map = {
    help: "memories  music  game  email  explorer  clear",
    memories: () => openWindow("memoriesWindow"),
    music: () => openWindow("musicWindow"),
    game: () => openWindow("gameWindow"),
    email: () => openWindow("emailWindow"),
    explorer: () => openWindow("explorerWindow"),
    clear: () => output.innerHTML = "C:\\Users\\Sparkquest>\n"
  };

  if (map[cmd]) {
    typeof map[cmd] === "function" ? map[cmd]() : output.innerHTML += map[cmd] + "\n";
  } else {
    output.innerHTML += `'${cmd}' not recognized\n`;
  }
  output.innerHTML += "C:\\Users\\Sparkquest>\n";
}


setInterval(() => {
  document.getElementById("clock").textContent =
    new Date().toLocaleTimeString();
}, 1000);

const emailViewer = document.createElement('div');
emailViewer.className = 'window';
emailViewer.id = 'emailViewer';
emailViewer.innerHTML = `
  <div class="title-bar">
    <div class="title-bar-text" id="emailTitle">Email</div>
    <div class="title-bar-controls"><button aria-label="Close"></button></div>
  </div>
  <div class="window-body" id="emailBody"></div>
`;
document.body.appendChild(emailViewer);

emailViewer.querySelector('button').onclick = () => emailViewer.style.display = 'none';


document.querySelectorAll('#emailWindow .email').forEach(mail => {
  mail.onclick = () => {
    document.getElementById('emailTitle').textContent = mail.dataset.subject;
    document.getElementById('emailBody').textContent = mail.dataset.body;
    openWindow('emailViewer');
  };
});

document.querySelector("#emailViewer .title-bar-controls button").onclick = () => {
  document.getElementById("emailViewer").style.display = "none";
};


document.querySelectorAll("#emailWindow .email").forEach(mail => {
  mail.onclick = () => {
    document.getElementById("emailTitle").textContent = mail.dataset.subject;
    document.getElementById("emailBody").innerHTML = mail.dataset.body; 
    openWindow("emailViewer"); 
  };
});
document.querySelector("#emailViewer .title-bar-controls button").onclick = () => {
  document.getElementById("emailViewer").style.display = "none";
};


document.querySelectorAll("#emailWindow .email").forEach(mail => {
  mail.onclick = () => {
    const title = mail.dataset.subject;
    const from = mail.dataset.from;
    const date = mail.dataset.date;
    const body = mail.dataset.body;

    document.getElementById("emailTitle").textContent = title;
    
   
    document.getElementById("emailBody").innerHTML = `
      <div class="email-header">
        <div><b>From:</b> ${from}</div>
        <div><b>Subject:</b> ${title}</div>
        <div><b>Date:</b> ${date}</div>
        <hr>
      </div>
      <div class="email-content">
        ${body}
      </div>
    `;

    openWindow("emailViewer");
  };
});

const imageViewer = document.getElementById("imageViewer");
const imageViewerImg = document.getElementById("imageViewerImg");
const imageViewerTitle = document.getElementById("imageViewerTitle");


function openImage(src, title = "Image") {
  imageViewerImg.src = src;
  imageViewerTitle.textContent = title;

  openWindow("imageViewer");
}


imageViewer.querySelector(".title-bar-controls button").onclick = () => {
  imageViewer.style.display = "none";
  imageViewerImg.src = "";
};


document.addEventListener("click", e => {
  const img = e.target;

  if (
    img.tagName === "IMG" &&
    (img.closest(".gallery") || img.closest(".post-images"))
  ) {
    openImage(img.src, img.alt || "Image");
  }
});
const player = document.getElementById("player");


const playBtn  = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn  = document.getElementById("stopBtn");


playBtn.onclick = () => {
  if (player.src) {
    player.play();
  }
};


pauseBtn.onclick = () => {
  player.pause();
};


stopBtn.onclick = () => {
  player.pause();
  player.currentTime = 0;
};


document.querySelectorAll(".playlist li").forEach(track => {
  track.onclick = () => {
    player.src = track.dataset.src;
    player.play();
  };
});

document.querySelectorAll(".playlist li").forEach(track => {
  track.onclick = () => {
    player.src = track.dataset.src;
    player.play();
  };
});
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);


document.querySelector('.window-bar button').onclick = () => {
    location.reload();
};
const loginScreen = document.getElementById("loginScreen");
const loginInput  = document.getElementById("loginInput");
const loginBtn    = document.getElementById("loginBtn");

function enterOS() {
  console.log("Clicked! Value:", loginInput.value);
  console.log("loginScreen element:", loginScreen);
  if (loginInput.value.trim() !== "") {
    loginScreen.style.display = "none";
    console.log("Login screen hidden!");
  } else {
    console.log("Input empty!");
  }
}


loginBtn.addEventListener("click", enterOS);



