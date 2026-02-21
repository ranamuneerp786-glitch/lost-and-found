import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("itemForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "items"), {
      type: type.value,
      item: item.value,
      place: place.value,
      date: date.value,
      contact: contact.value
    });

    alert("Item added!");
    form.reset();
  });
}

const list = document.getElementById("itemList");

if (list) {
  const data = await getDocs(collection(db, "items"));
  data.forEach((doc) => {
    const d = doc.data();
    list.innerHTML += `
      <p>
        <b>${d.type}</b> - ${d.item}<br>
        ${d.place} | ${d.date}<br>
        Contact: ${d.contact}
      </p>
      <hr>
    `;
  });
}
