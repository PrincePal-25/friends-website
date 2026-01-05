const container = document.getElementById("friends");
const search = document.getElementById("search");

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

fetch("friends.json")
  .then(res => res.json())
  .then(data => {
    window.friends = data;
    render(data);
  });

function render(list) {
  container.innerHTML = "";
  list.forEach((f, i) => {
    const c = document.createElement("div");
    c.className = "card";
    c.innerHTML = `
      <div class="badge">#${i + 1}</div>
      <img src="${f.photo || 'avatar.png'}">
      <h3>${f.name}</h3>
      ${f.category.map(t => `<span class="tag">${t}</span>`).join("")}
    `;
    c.onclick = () => openModal(f);
    container.appendChild(c);
  });
}

search.oninput = () => {
  const v = search.value.toLowerCase();
  render(friends.filter(f => f.name.toLowerCase().includes(v)));
};

function filterCat(cat) {
  if (cat === "All") render(friends);
  else render(friends.filter(f => f.category.includes(cat)));
}

function openModal(f) {
  modal.style.display = "block";
  document.getElementById("m-img").src = f.photo || "avatar.png";
  document.getElementById("m-name").innerText = f.name;
  document.getElementById("m-bio").innerText = f.bio || "";
  document.getElementById("m-tags").innerHTML =
    f.category.map(t => `<span class="tag">${t}</span>`).join("");

  let links = "";
  if (f.github) links += `<a href="${f.github}" target="_blank"><i class="fab fa-github"></i></a>`;
  if (f.instagram) links += `<a href="${f.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`;
  if (f.youtube) links += `<a href="${f.youtube}" target="_blank"><i class="fab fa-youtube"></i></a>`;
  if (f.discord) links += `<a href="${f.discord}" target="_blank"><i class="fab fa-discord"></i></a>`;

  document.getElementById("m-links").innerHTML = links;
}

closeBtn.onclick = () => modal.style.display = "none";
