import { workshops } from "./data.js";

const list = document.querySelector("#workshop-list");
const filters = document.querySelector("#filters");
const stats = document.querySelector("#stats");
const empty = document.querySelector("#empty");

const total = workshops.length;
const demoCount = workshops.filter((w) => w.demo).length;

stats.innerHTML = `<span><strong>${String(total).padStart(2, "0")}</strong> opdrachten</span><span><strong>${String(demoCount).padStart(2, "0")}</strong> live demo's</span>`;

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

const createLink = (href, label, { external = false, className = "" } = {}) => {
  const link = el("a", className, label + " ");
  link.href = href;
  const arrow = el("span", "", "↗");
  arrow.setAttribute("aria-hidden", "true");
  link.append(arrow);

  if (external) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }

  return link;
};

const render = (filter) => {
  list.replaceChildren();

  const visible = workshops
    .map((workshop, i) => ({ workshop, number: total - i }))
    .filter(({ workshop }) => filter === "Alle" || workshop.technologies.includes(filter));

  visible.forEach(({ workshop, number }, i) => {
    const item = el("li", "workshop");
    item.style.setProperty("--i", i);

    const index = el("span", "workshop__index", String(number).padStart(2, "0"));
    index.setAttribute("aria-hidden", "true");

    const body = el("div", "workshop__body");
    body.append(
      el("h3", "workshop__title", workshop.title),
      el("p", "workshop__description", workshop.description),
    );

    const tags = el("div", "tags");
    tags.setAttribute("aria-label", "Technologieën");
    if (workshop.technologies.length > 0) {
      workshop.technologies.forEach((t) => tags.append(el("span", "tag", t)));
    } else {
      tags.append(el("span", "tag tag--empty", "leeg"));
    }
    body.append(tags);

    const links = el("div", "links");
    if (workshop.demo) {
      links.append(createLink(workshop.demo, "Demo", { className: "link--demo" }));
    }
    links.append(createLink(workshop.source, "Code", { external: true }));

    item.append(index, body, links);
    list.append(item);
  });

  empty.hidden = visible.length > 0;
};

const counts = new Map();
workshops.forEach((w) => w.technologies.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
const options = ["Alle", ...[...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([t]) => t)];

options.forEach((option) => {
  const button = el("button", "filter", option);
  button.type = "button";
  button.setAttribute("aria-pressed", String(option === "Alle"));
  button.addEventListener("click", () => {
    filters.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    render(option);
  });
  filters.append(button);
});

render("Alle");
